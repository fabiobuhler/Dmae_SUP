import { GoogleGenAI, Type } from "@google/genai";
import type { Station, GeminiAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        analysisSummary: {
            type: Type.STRING,
            description: "A brief, one-sentence summary of the findings.",
        },
        issues: {
            type: Type.ARRAY,
            description: "A list of issues found in the data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    stationId: { type: Type.NUMBER, description: "The ID of the station with the issue." },
                    stationName: { type: Type.STRING, description: "The name of the station with the issue." },
                    issueType: { type: Type.STRING, description: "The type of issue: 'Integrity' or 'Operational'." },
                    description: { type: Type.STRING, description: "A clear description of the problem." },
                    suggestion: {
                        type: Type.OBJECT,
                        description: "A JSON object with the suggested corrected values. Only include fields that need changing.",
                        properties: {
                            nivel: { type: Type.NUMBER, nullable: true },
                            bombas: { type: Type.ARRAY, items: { type: Type.NUMBER, nullable: true }, nullable: true },
                            bombas_manutencao: { type: Type.ARRAY, items: { type: Type.BOOLEAN }, nullable: true },
                            liga: { type: Type.NUMBER, nullable: true },
                            desliga: { type: Type.NUMBER, nullable: true },
                            em_bateria: { type: Type.BOOLEAN, nullable: true },
                        }
                    }
                },
                required: ["stationId", "stationName", "issueType", "description", "suggestion"]
            }
        }
    },
    required: ["analysisSummary", "issues"]
};


export const analyzeStationDataWithGemini = async (data: Station[]): Promise<GeminiAnalysisResult> => {
    if (!ai) {
        throw new Error("Gemini API key not configured. Please set the API_KEY environment variable.");
    }

    const prompt = `
        You are an expert in water pump station management systems.
        Analyze the following JSON data representing multiple pumping stations.
        - 'em_bateria' (boolean) indicates if a station is on backup battery power.
        - 'bombas_manutencao' (boolean[]) indicates if a specific pump is under maintenance. The index corresponds to the 'bombas' array.
        - NOTE: 'superior' and 'inferior' levels are calculated automatically from 'liga' and 'desliga'. The rule is: superior = liga + 0.5 * (liga - desliga) and inferior = desliga - 0.5 * (liga - desliga).

        Data:
        ${JSON.stringify(data, null, 2)}

        Tasks:
        1.  **Integrity Check**: Verify the logical consistency of the data for each station.
            - The most important rule is 'liga' > 'desliga'. If this is not true, it's a critical integrity issue.
            - The 'superior' and 'inferior' values are derived automatically, so you don't need to validate them directly, just the 'liga'/'desliga' relationship.
        2.  **Operational Analysis**: Identify immediate operational risks or suggest optimizations.
            - IMPORTANT: If a pump's corresponding 'bombas_manutencao' is true, do NOT flag operational risks for that specific pump.
            - If 'nivel' is above 'liga' but all OPERATIONAL pumps (where bombas_manutencao is false) are off, that's a risk. Suggest turning on an operational pump.
            - If 'nivel' is below 'desliga' but some OPERATIONAL pumps are on, that's inefficient. Suggest turning them off.
            - If a station is on battery power, this is a heightened alert state. Suggest monitoring closely.
        3.  **Provide Suggestions**: For each issue found, provide a clear explanation and a suggested JSON object with the corrected values. Do not suggest changes for 'superior' or 'inferior'.

        Respond ONLY with a single JSON object in the specified schema. Do not include any text before or after the JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as GeminiAnalysisResult;
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini. Please check the console for details.");
    }
};
