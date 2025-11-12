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
                            liga: { type: Type.NUMBER, nullable: true },
                            desliga: { type: Type.NUMBER, nullable: true },
                            superior: { type: Type.NUMBER, nullable: true },
                            inferior: { type: Type.NUMBER, nullable: true },
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
        The 'em_bateria' field (boolean) indicates if a station is running on backup battery power.

        Data:
        ${JSON.stringify(data, null, 2)}

        Tasks:
        1.  **Integrity Check**: Verify the logical consistency of the data for each station.
            - Is 'liga' > 'desliga'?
            - Is 'superior' > 'liga'?
            - Is 'desliga' > 'inferior'?
            - Are there any other potential configuration errors?
        2.  **Operational Analysis**: Based on the current 'nivel', 'bombas' status, and 'em_bateria' status, identify any immediate operational risks or suggest optimizations.
            - Example: If 'nivel' is above 'liga' but all pumps are off, that's a risk. Suggest turning on an available pump.
            - Example: If 'nivel' is below 'desliga' but some pumps are on, that's inefficient. Suggest turning them off.
            - Example: If a station is on battery power, this is a heightened alert state. Suggest monitoring closely. If the level is critical and it's on battery, this is a major issue.
        3.  **Provide Suggestions**: For each issue found, provide a clear explanation and a suggested JSON object with the corrected values.

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