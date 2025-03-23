from fastapi import FastAPI, File, UploadFile
import uvicorn
from pydantic import BaseModel
from typing import List
import base64
import os
from google import genai
from google.genai import types
import json




app = FastAPI()



def askGeminiAbout():
    client = genai.Client(api_key="AIzaSyCLmKUlL_KBS0VktVnxThvDCJv-lrRt3ag") 
    CodeText = """import java.util.ArrayList;

public class FehlerfreierCode {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Hallo");
        list.add("Welt");

        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }

        System.out.println("Summe: " + addiere(5, 3));
    }

    public static int addiere(int a, int b) {
        return a + b;
    }

    public void printMessage() {
        System.out.println("Dies ist eine Nachricht");
    }

    public static void printList(ArrayList<String> list) {
        for (String item : list) {
            System.out.println(item);
        }
    }

    public static void divideNumbers(int a, int b) {
        try {
            System.out.println("Ergebnis: " + (a / b));
        } catch (ArithmeticException e) {
            System.out.println("Fehler: Division durch null!");
        }
    }

    public static String getText() {
        String text = "Standardtext";
        return text;
    }

    public static void modifyList(ArrayList<String> list) {
        list.removeIf(item -> item.equals("Welt"));
    }
}
"""



    CriteriaText = "1: Der Schüler hat die Methoden vervollständigt sodass der Code sinnhaftig ist, 2: Der Schüler hat keine unnötigen Variablen, Methoden oder Statements"
    

    prompt =  f"Analyze the provided code files ({CodeText}) and evaluate them based on the assessment criteria document ({CriteriaText}). First, check the correctness, efficiency, readability, and " \
    f"adherence to best practices in the code. Identify any syntax errors, logical flaws, or optimization opportunities. Then, compare the provided work against the grading rubric in {CriteriaText}, assigning scores accordingly. Justify each score with specific feedback, " \
    f"highlighting strengths and areas for improvement. Provide clear recommendations for optimization, restructuring, or corrections where necessary. " \
    f"Summarize the evaluation in a structured report, ensuring clarity and actionable insights for improvement."
    
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
                "Best_Practices_Points_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "Performance_Points_from_0-100": genai.types.Schema(
                    type = genai.types.Type.NUMBER,
                ),
                "detailed_feedback_short_sentence": {
                    "type": "array",
                     "items": {
                         "type": "string"
                        }
                }
            },
        ),
    )

    

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config
    )
    responsetext = response.text
    data = json.loads(responsetext)
    best_practices = data["Best_Practices_Points_from_0-100"]
    code_quality = data["Code_Quality_Points_from_0-100"]
    grade_points = data["Grade_Points_from_0-15"]
    performance_points = data["Performance_Points_from_0-100"]
    feedback_sentences = data["detailed_feedback_short_sentence"]

    print(f"Best Practices Points: {best_practices}")
    print(f"Code Quality Points: {code_quality}")
    print(f"Grade Points: {grade_points}")
    print(f"Performance Points: {performance_points}")
    print("Detailed Feedback:")
    for sentence in feedback_sentences:
        print(f"{sentence}")
       


@app.post("/analyzeCodeWithCriteria")
def upload_files(pdf_file: UploadFile = File(...), files: List[UploadFile] = File(...)):
    print("Hello")


@app.get("/test")
def askAi():
    askGeminiAbout()

  



if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
