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
    GoodCode = """

/*
Datenbanken:

a)
Entitätstyp: Eine Entität beschriebt ein Objekt. Eintitäten mit den gleichen Eigenschaften werden zu einem Entitätstyp zusammengefasst, Entitäten haben Attribute können Beziehungen eingehen und spiegeln Tabellen einer Datenbank wieder.
Beziehungstyp: Ist ein Typ der eine beziehung darstellt, also das z.B. eine Pflanze frisst eine Fliege ist der Beziehungstyp. Dazu kommen noch die Kardinalitäten die dieses noch übersichtlicher machen wie viel von wem gehört zu wie viel von dem anderen.
Attribut: Ist einfach z.B. der Name von der Entität Guido, Entitäten haben Eigenschaften sogennante Attribute.

b) 1 zu n weil Ein Verbreitungsgebiert beherbergt mehrere Pflanzen aber eine Pflanze kann nicht in zwei Verbreitungsgebieten gleichzeitig leben. heißt eine Pflanze hat ein Gebiet aber ein Gebiet hat mehrere Pflanzen

c) Naja es kann ja sein das mehrere Individuum den gleichen Spitznamen haben, und dann wäre es nicht eindeutig, da wäre eine Id zuverlässiger.

d)
Mit Vererbung also man erstellt eine ober Entität Pflanze und alle anderen also Klappfallen etc kann man dann mit is_a machen, das wäre aufwendig stattdessen könnte man auch
einfach der Pflanze ein Attribut Fangmechanik geben und da dann halt immer hin schreiben klappfallen oder was für eine Mechanik diese halt hat.

e)
Naja man guckt hier hat man eine M zu n beziehung heißt in die Frisst komme beide Id der jeweiligen Entitäten rein und dann hat man muss halt von ERM zu dem mit geschweiften Klammern und eckigen
also dann  frisst{[bid: integer, fid: integer]} so könnte man es machen aber man müsste noch primärschlüssel unterstreichen und ein Pfeil nach oben für Fremdschlüssel also bei einem den Pfeil nach oben und das andere unterstrichen und ist der primärschlüssel.

 f)
 create table fleischfressende_pflanze(bid integer primary key, deutscher_name text, lateinischer_name text); Fürs Protokoll Sie meinten keine Fremdschlüssel


 g)
  Select iid, spitzname from individuum where groesse_in_m >= 0,05 and groesse_in_m <= 0,1;

  Select individuum.spitzname, fleischfressende_pflanze.deutscher_name from individuum, fleischfressende_pflanze where individuum.fid = fleischfressende_pflanze.fid;  // Cool das Sie Join mit reingenommen haben

  Select lateinischer_name from individuum where spitzname like 'S%';


 */

import java.util.Random;

public class Fly {
    public int row = 0;
    public int column;
    public String symbol = ">o<";
    public Random r;


    public Fly(){
        r = new Random();
        this.column = r.nextInt(7)+2;
    }

    public int move(){
        int randomInt = r.nextInt(2);
        int a = column;
        if(randomInt == 0){
             a++;
        }else{
            a--;
        }
        return a;
    }

}
public class FlyTrap {
    public int column=5;
    public String[][] symbol =new String[7][5];

    FlyTrap(){
        symbol[0][0]="x";
        symbol[0][4]="x";
        symbol[1][0]="x";
        symbol[1][1]="x";
        symbol[1][3]="x";
        symbol[1][4]="x";
        symbol[2][0]="x";
        symbol[2][1]="x";
        symbol[2][2]="x";
        symbol[2][3]="x";
        symbol[2][4]="x";
        symbol[3][1]="x";
        symbol[3][2]="x";
        symbol[3][3]="x";
        symbol[4][2]="x";
        symbol[5][1]="x";
        symbol[5][2]="x";
        symbol[5][3]="x";
        symbol[6][2]="x";
    }

    public int move_right() {
        int direction = this.column+1;
        return direction;
    }

    public int move_left() {
        int direction = this.column-1;
        return direction;
    }

}
import java.util.Random;
import java.util.Scanner;

public class Game {
    public static void main(String[] args) {
        Fly f = new Fly();
        FlyTrap ft = new FlyTrap();
        World w = new World();
        w.placeFly(f);
        w.placeFlyTrap(ft);
        Scanner sc = new Scanner(System.in);
        String direction;
        int count = 0;
        boolean victory=false;
        boolean gehtweiter = true;

        while(f.row<9 && gehtweiter ) {
            System.out.println();
            System.out.println("+---------+");
            System.out.println("| FLYTRAP |");
            System.out.println("| TERROR |");
            w.printWorld();
            System.out.println("|(L)(N)(R)|");
            System.out.println("+---------+");

            direction = sc.next();
            if(direction.equalsIgnoreCase("L")) {
                w.moveFlyTrap(ft.move_left(), ft);
            }

            if(direction.equalsIgnoreCase("N")) {
            }

            if(direction.equalsIgnoreCase("R")) {
                w.moveFlyTrap(ft.move_right(), ft);
            }

            w.moveFly(f.move(), f);

            /*
            a)
            Hier wird gecheckt ob die Fliege in der untersten Spalte ist, und ob die Spalte der Fliege größer kleiner oder gleich der Flytrap ist, wenn ja wird victory auf true gesetzt, heißt die Fliege wurde gefangen und aufgegessen und durch meine Programmier Kenntnisse spawn magischer Weise immer wieder Fliegen bis die Pflanze keine mehr bekommt = unlimited Essens glitch.
             */
            if(f.row==9 && (f.column==(ft.column+1) || f.column==ft.column
                    || f.column==(ft.column-1))) {
                victory=true;
                count ++;
                Random random = new Random();
                int randomColum = random.nextInt(7)+1;
                f.row = 0;
                f.column = randomColum;
            }
            // sie ist vorbei gekommen
            if(f.row > 9){
                gehtweiter = false;
            }

        }

        if(victory==true) {     // kleiner Tipp man muss nur victory reinmachen das geht auch, und ja wenn halt victory true ist wird halt ausgegebn das das Spiel gewonnen ist und wenn nicht dann halt nicht
            System.out.println("Spiel gewonnen!");
            System.out.println("Immerhin hast du " + count + " Fliegen gefangen");
        }else {
            System.out.println("Spiel verloren!");
        }

    }

    /*

    g)
    Im MVC Modell würde man in der Model Klasse alles von Fly.java nutzen ohne die Methode also nur den Konstruktor in View würde man der Fliege eine ´Grafik z.B. bekommen oder der Char da etc und in Control würde man die Bewegungsmethoden bauen, sodass es alles verteilt ist und somit würde es übersichtlicher sein und unabhäniger von einander.
     */
}public class World {
    public String[][] world = new String[16][11];

    // Das ist der Konstruktor, um Die Karte (Spielfeld) zu erstellen also die Balken um das Spiel Feld begrenzen und weiteres.
    World() {
        int row=1;
        int column=1;
        while(row<world.length-1) {
            while(column<world[0].length-1) {
                world[row][column]=" ";
                column++;
            }
            System.out.println();
            column=0;
            row++;
        }

        int i=1;
        while(i<world[0].length-1) {
            world[0][i]="-";
            world[15][i]="-";
            i++;
        }

        int j=1;
        while(j<world.length-1) {
            world[j][0]="|";
            world[j][10]="|";
            j++;
        }

        world[0][0]="+";
        world[0][10]="+";
        world[15][0]="+";
        world[15][10]="+";

    }

    // Damit wird die Karte ausgeben also die Karte bzw. das Spielfeld und wenn die Fliege oder so da ist wird das auch angezeigt.
    public void printWorld() {
        int row=0;
        int column=0;
        while(row<world.length) {
            while(column<world[0].length) {
                System.out.print(world[row][column]);
                column++;
            }
            System.out.println();
            column=0;
            row++;
        }
    }


    // Methode um die Fliege auf das Spielfeld zu placen.
    public void placeFly(Fly f) {
        world[f.row][f.column]=f.symbol;
    }


    // Methode um die Flytrap zu placen, halt so das sie wie im Beispiel Bild aussieht also möglichts unnatürlich (spapß) sieht eher aus wie ein Fisch.
    public void placeFlyTrap(FlyTrap ft) {
        world[world.length-8][ft.column-2]=ft.symbol[0][0];
        world[world.length-8][ft.column+2]=ft.symbol[0][4];
        world[world.length-7][ft.column-1]=ft.symbol[1][0];
        world[world.length-7][ft.column+1]=ft.symbol[1][1];
        world[world.length-7][ft.column-2]=ft.symbol[1][3];
        world[world.length-7][ft.column+2]=ft.symbol[1][4];
        world[world.length-6][ft.column]=ft.symbol[2][0];
        world[world.length-6][ft.column-1]=ft.symbol[2][1];
        world[world.length-6][ft.column+1]=ft.symbol[2][2];
        world[world.length-6][ft.column-2]=ft.symbol[2][3];
        world[world.length-6][ft.column+2]=ft.symbol[2][4];
        world[world.length-5][ft.column]=ft.symbol[3][1];
        world[world.length-5][ft.column-1]=ft.symbol[3][2];
        world[world.length-5][ft.column+1]=ft.symbol[3][3];
        world[world.length-4][ft.column]=ft.symbol[4][2];
        world[world.length-3][ft.column]=ft.symbol[5][1];
        world[world.length-3][ft.column-1]=ft.symbol[5][2];
        world[world.length-3][ft.column+1]=ft.symbol[5][3];
        world[world.length-2][ft.column]=ft.symbol[6][2];

    }

    // Methode um die Fliege zu bewegen dabei wir die vorherige Stelle wieder leer gemacht die Reihe erhöht und die Column kriegt den neuen wert vom parameter wenn es größer gleich 2 ist aber auch kleiner gleich 8 weil sonst wäre es außerhalb des Spielfeldes.
    public void moveFly(int neu, Fly f) {
        world[f.row][f.column]=" ";
        f.row++;
        if(neu>=2 && neu<=8) {
            f.column = neu;
        }

        world[f.row][f.column]=f.symbol;
    }

    //  Methode um die Flytrap zu moven also alles vorher leer machen und dann unten halt wieder die Fly Symbole machen sodass es gut aussieht.
    public void moveFlyTrap(int neu, FlyTrap ft) {
        if(neu>=3 && neu<=7) {

            world[world.length-8][ft.column-2]=" ";
            world[world.length-8][ft.column+2]=" ";
            world[world.length-7][ft.column-1]=" ";
            world[world.length-7][ft.column+1]=" ";
            world[world.length-7][ft.column-2]=" ";
            world[world.length-7][ft.column+2]=" ";
            world[world.length-6][ft.column]=" ";
            world[world.length-6][ft.column-1]=" ";
            world[world.length-6][ft.column+1]=" ";
            world[world.length-6][ft.column-2]=" ";
            world[world.length-6][ft.column+2]=" ";
            world[world.length-5][ft.column]=" ";
            world[world.length-5][ft.column-1]=" ";
            world[world.length-5][ft.column+1]=" ";
            world[world.length-4][ft.column]=" ";
            world[world.length-3][ft.column]=" ";
            world[world.length-3][ft.column-1]=" ";
            world[world.length-3][ft.column+1]=" ";
            world[world.length-2][ft.column]=" ";

            ft.column=neu;

            world[world.length-8][ft.column-2]=ft.symbol[0][0];
            world[world.length-8][ft.column+2]=ft.symbol[0][4];
            world[world.length-7][ft.column-1]=ft.symbol[1][0];
            world[world.length-7][ft.column+1]=ft.symbol[1][1];
            world[world.length-7][ft.column-2]=ft.symbol[1][3];
            world[world.length-7][ft.column+2]=ft.symbol[1][4];
            world[world.length-6][ft.column]=ft.symbol[2][0];
            world[world.length-6][ft.column-1]=ft.symbol[2][1];
            world[world.length-6][ft.column+1]=ft.symbol[2][2];
            world[world.length-6][ft.column-2]=ft.symbol[2][3];
            world[world.length-6][ft.column+2]=ft.symbol[2][4];
            world[world.length-5][ft.column]=ft.symbol[3][1];
            world[world.length-5][ft.column-1]=ft.symbol[3][2];
            world[world.length-5][ft.column+1]=ft.symbol[3][3];
            world[world.length-4][ft.column]=ft.symbol[4][2];
            world[world.length-3][ft.column]=ft.symbol[5][1];
            world[world.length-3][ft.column-1]=ft.symbol[5][2];
            world[world.length-3][ft.column+1]=ft.symbol[5][3];
            world[world.length-2][ft.column]=ft.symbol[6][2];
        }

    }

}

"""

    prompt =  f"Analyze the provided code files ({code}) and evaluate them based on the assessment criteria document ({criteria}). First, check the correctness, efficiency, readability, and " \
    f"adherence to best practices in the code. Identify any syntax errors, logical flaws, or optimization opportunities. Then, compare the provided work against the grading rubric in {CriteriaText}, assigning scores accordingly and nice and fair. Justify each score with specific feedback, " \
    f"highlighting strengths and areas for improvement. Provide clear recommendations for optimization, restructuring, or corrections where necessary. " \
    f"Summarize the evaluation in a structured report, ensuring clarity and actionable insights for improvement," \
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