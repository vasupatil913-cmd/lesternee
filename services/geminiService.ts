import { GoogleGenAI, Type, Schema, FunctionDeclaration } from "@google/genai";
import { SYSTEM_CONTEXT_STRING } from "../constants";
import { LearningMode, GeneratedContent, QuizQuestion, Flashcard } from "../types";

// Safety check for API Key - in a real app this would be handled by an onboarding UI if missing
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const CEH_SYSTEM_INSTRUCTION = `
You are a CEH (Certified Ethical Hacking) Coach and Training Assistant.
Your primary knowledge base is the following 12-module course index.
STRICTLY ADHERE TO THIS SCOPE.

${SYSTEM_CONTEXT_STRING}

RULES:
1. Use ONLY the information context provided above to determine valid topics.
2. If the user asks about a topic NOT in this index, reply: "Please upload the relevant CEH content to proceed."
3. Do NOT provide real hacking instructions for illegal activities.
4. Always provide a safety reminder: "For authorized ethical hacking only."
5. Output tone: Friendly instructor, Beginner to Intermediate cybersecurity level.
6. When explaining, you may use your general knowledge to define the terms listed in the syllabus (e.g., explaining what "Nmap" is), but do not drift into topics not listed (e.g., do not teach how to hack a satellite if it's not in the modules).
`;

const quizSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: { type: Type.ARRAY, items: { type: Type.STRING } },
      correctAnswerIndex: { type: Type.INTEGER },
      explanation: { type: Type.STRING },
    },
    required: ["question", "options", "correctAnswerIndex", "explanation"],
  }
};

const flashcardSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      term: { type: Type.STRING },
      definition: { type: Type.STRING },
    },
    required: ["term", "definition"],
  }
};

export const generateContent = async (
  mode: LearningMode,
  moduleTitle: string,
  subtopicTitle: string
): Promise<GeneratedContent> => {
  if (!apiKey) {
    return { type: 'text', content: "API Key is missing. Please configure process.env.API_KEY." };
  }

  const modelId = "gemini-2.5-flash"; // Using Flash for speed and efficiency for this task

  try {
    if (mode === LearningMode.QUIZ) {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Generate 5 multiple choice questions for the CEH topic: Module: "${moduleTitle}", Subtopic: "${subtopicTitle}". Focus on the technical details mentioned in the syllabus.`,
        config: {
          systemInstruction: CEH_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: quizSchema,
        }
      });
      
      const jsonText = response.text || "[]";
      const quizData = JSON.parse(jsonText) as QuizQuestion[];
      return { type: 'quiz', content: quizData };
    }

    if (mode === LearningMode.FLASHCARDS) {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Generate 8 flashcards (Term and Definition) for the CEH topic: Module: "${moduleTitle}", Subtopic: "${subtopicTitle}".`,
        config: {
          systemInstruction: CEH_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: flashcardSchema,
        }
      });

      const jsonText = response.text || "[]";
      const flashcardData = JSON.parse(jsonText) as Flashcard[];
      return { type: 'flashcards', content: flashcardData };
    }

    // Default: LESSON or SUMMARY (Text based)
    const prompt = mode === LearningMode.SUMMARY 
      ? `Provide a concise summary of "${subtopicTitle}" from "${moduleTitle}". Bullet points, key takeaways.`
      : `Teach me about "${subtopicTitle}" from "${moduleTitle}".
         Structure:
         1. Definition
         2. Key Concepts
         3. Tools (if applicable based on syllabus)
         4. Techniques (if applicable)
         5. Example
         6. Step-by-step breakdown (theoretical)
         End with the safety reminder.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: CEH_SYSTEM_INSTRUCTION,
      }
    });

    return { type: 'text', content: response.text || "No content generated." };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { type: 'text', content: "Error communicating with the CEH Coach. Please try again." };
  }
};

export const askQuestion = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  const modelId = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `User Question: "${query}"\n\nProvide a clear, concise answer based strictly on the CEH syllabus context provided. If the answer involves tools or techniques, mention them only if they are in the syllabus. If the answer is not in the context, say so.`,
      config: {
        systemInstruction: CEH_SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the CEH Coach. Please try again.";
  }
};