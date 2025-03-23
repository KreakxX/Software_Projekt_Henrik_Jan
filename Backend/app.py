from fastapi import FastAPI, File, UploadFile
import uvicorn
from pydantic import BaseModel
from typing import List
from google import genai
from google.genai import types
import json
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def askGeminiAbout():
    client = genai.Client(api_key="--")
    extra = ""
    CodeText = """import java.util.ArrayList;

public class FehlerhafterCode {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>;
        list.add("Hallo");
        list.add("Welt");

        for(int i = 0; i <= list.size(); i++) {
            System.out.println(list.get(i));
        }

        System.out.println("Summe: " + addiere(5, "3"));
    }

    public static int addiere(int a, int b) {
        return a + b;
    }

    public void printMessage() {
        System.out.println("Dies ist eine Nachricht");
    }

    public static void printList(ArrayList<String> list) {
        for(String item : list) {
            System.out.println(item);
        }
    }

    public static void divideNumbers(int a, int b) {
        try {
            System.out.println("Ergebnis: " + (a / b));
        } catch(ArithmeticException e) {
            System.out.println("Fehler: Division durch null!");
        }
    }

    public static String getText() {
        String text;
        return text;
    }

    public static void modifyList(ArrayList<String> list) {
        for(int i = 0; i < list.size(); i++) {
            if(list.get(i).equals("Welt")) {
                list.remove(i);
            }
        }
    }
}
"""


    CriteriaText = "1: Der Schüler hat die Methoden vervollständigt sodass der Code sinnhaftig ist, 2: Der Schüler hat keine unnötigen Variablen, Methoden oder Statements"
    

    prompt =  f"Analyze the provided code files ({CodeText}) and evaluate them based on the assessment criteria document ({CriteriaText}). First, check the correctness, efficiency, readability, and " \
    f"adherence to best practices in the code. Identify any syntax errors, logical flaws, or optimization opportunities. Then, compare the provided work against the grading rubric in {CriteriaText}, assigning scores accordingly. Justify each score with specific feedback, " \
    f"highlighting strengths and areas for improvement. Provide clear recommendations for optimization, restructuring, or corrections where necessary. " \
    f"Summarize the evaluation in a structured report, ensuring clarity and actionable insights for improvement." \
    f"If no solution to the task is recognizable, give 0 points" \
    f"Categorize feedback as follows this is required very important!!!!:" \
    f"- 'good:' for positive aspects" \
    f"- 'bad:' for critical issues" \
    f"- 'warn:' for areas that could be improved" \
    f"({extra})"
    
    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=0.5,
        top_p=0.95,
        top_k=40,
        max_output_tokens=8192,
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
            type = genai.types.Type.OBJECT,
            properties = {
                "Grade_Points_from_0-15": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Code_Quality_Points_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Code_Quality_Points_Readability_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Code_Quality_Points_Documentation_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Code_Quality_Points_Structure_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Best_Practices_Points_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Best_Practices_Points_Design_Patterns_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Best_Practices_Points_Standards_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Best_Practices_Points_Error_Handling_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Performance_Points_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Performance_Points_Efficiency_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Performance_Points_Optimization_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Performance_Points_from_Resource_Usage_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "detailed_feedback_short_sentence": {
                    "type": "array",
                     "items": {
                         "type": "string"
                        }
                }
            },
            required = ["Grade_Points_from_0-15", "Code_Quality_Points_from_0-100", "Code_Quality_Points_Readability_from_0-100", "Code_Quality_Points_Documentation_from_0-100", "Code_Quality_Points_Structure_from_0-100", "Best_Practices_Points_from_0-100", "Best_Practices_Points_Design_Patterns_from_0-100", "Best_Practices_Points_Standards_from_0-100", "Best_Practices_Points_Error_Handling_from_0-100", "Performance_Points_from_0-100", "Performance_Points_Efficiency_from_0-100", "Performance_Points_Optimization_from_0-100", "Performance_Points_from_Resource_Usage_0-100", "detailed_feedback_short_sentence"],

        ),
    )
    
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config
    )
    responsetext = response.text
    data = json.loads(responsetext)
    print(data)
    return data
       

@app.post("/analyzeCodeWithCriteria")
def upload_files(pdf_file: UploadFile = File(...), files: List[UploadFile] = File(...)):
    print("Hello")


@app.get("/test")
def askAi():
    return askGeminiAbout()

  



if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
