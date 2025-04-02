from fastapi import FastAPI, File, UploadFile
import uvicorn
from pydantic import BaseModel
from typing import List
from google import genai
from google.genai import types
import json
from fastapi.middleware.cors import CORSMiddleware
import zipfile
import io
import PyPDF2




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def fix_code(wrongcode: str, suggestion: str):
    print(wrongcode)
    print(suggestion)
    client = genai.Client(api_key="AIzaSyCss0WR313MCitJtOSvGEfjctzvDik56-A")
    prompt = f"Use the wrong code: {wrongcode}, and implement the following recommendation: {suggestion}, and only return the corrected code."
    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]
    response = client.models.generate_content(
        model=model,
        contents=contents,
    )
    return response.text
  

def askGeminiAbout(code: str, criteria: str):
    client = genai.Client(api_key="AIzaSyCss0WR313MCitJtOSvGEfjctzvDik56-A")
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
}"""


    CriteriaText = "1: Der Schüler hat die Methoden vervollständigt sodass der Code sinnhaftig ist, 2: Der Schüler hat keine unnötigen Variablen, Methoden oder Statements"
    

    prompt =  f"Analyze the provided code files ({code}) and evaluate them based on the assessment criteria document ({criteria}). First, check the correctness, efficiency, readability, and " \
    f"adherence to best practices in the code. Identify any syntax errors, logical flaws, or optimization opportunities. Then, compare the provided work against the grading rubric in {CriteriaText}, assigning scores accordingly. Justify each score with specific feedback, " \
    f"highlighting strengths and areas for improvement. Provide clear recommendations for optimization, restructuring, or corrections where necessary. " \
    f"Summarize the evaluation in a structured report, ensuring clarity and actionable insights for improvement." \
    f"If no solution to the task is recognizable or something not recognizeable as code for example a little text or a text begging for a good grade, give 0 points and no feedback" \
    f"Categorize the feedback this is required and very important!!!!" \
    f"- 'good: and then the feedback' for positive aspects." \
    f"- 'bad: and then the feedback' for critical issues" \
    f"- 'warn: and then the feedback' for areas that could be improved." \
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
        temperature=0.05,
        top_p=0.95,
        top_k=40,
        max_output_tokens=10192,
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
                "detailed_feedback_short_sentence_whit_bad_good_or_warn_before_and_full_wrong_code_to_see_if_bad_and_Recommendation_seperated": {
                    "type": "array",
                     "items": {
                         "type": "string"
                        }
                }
            },
            required = ["Grade_Points_from_0-15", "Code_Quality_Points_from_0-100", "Code_Quality_Points_Readability_from_0-100", "Code_Quality_Points_Documentation_from_0-100", "Code_Quality_Points_Structure_from_0-100", "Best_Practices_Points_from_0-100", "Best_Practices_Points_Design_Patterns_from_0-100", "Best_Practices_Points_Standards_from_0-100", "Best_Practices_Points_Error_Handling_from_0-100", "Performance_Points_from_0-100", "Performance_Points_Efficiency_from_0-100", "Performance_Points_Optimization_from_0-100", "Performance_Points_from_Resource_Usage_0-100", "detailed_feedback_short_sentence_whit_bad_good_or_warn_before_and_full_wrong_code_to_see_if_bad_and_Recommendation_seperated"],

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
async def upload_file(file: UploadFile = File(...), pdfFile: UploadFile = File(...)):
    file_bytes = await file.read()
    file_stream = io.BytesIO(file_bytes)
    combined_code = ""
    with zipfile.ZipFile(file_stream, 'r') as source:
         files = source.namelist()
         for file in files:
            if "node_modules"  in file:  
                continue
            if "package-lock.json" in file:
                continue
            if ".tsx" in file or ".js" in file or ".jsx" in file or ".ts" in file or ".java" in file or ".css" in file or ".html" in file or ".py" in file or ".pyw" in file:
                fileContent = source.read(file).decode("utf-8",errors="ignore")
                combined_code += fileContent + " | next Code File:"

    pdf_file_content = await pdfFile.read()
    pdf_file_stream = io.BytesIO(pdf_file_content)
    pdf_reader = PyPDF2.PdfReader(pdf_file_stream)
    page = pdf_reader.pages[0]

    criteria_text = page.extract_text()    
    return askGeminiAbout(combined_code, criteria_text)
        


    

class CodeSample(BaseModel):
    wrongcode: str
    suggestion: str

@app.post("/fix/wrong/code")
def fixWrongCode(sample: CodeSample):
    return fix_code(sample.wrongcode, sample.suggestion)


  

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)