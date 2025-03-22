"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowDown,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock,
  Code,
  CornerDownLeft,
  CornerLeftDown,
  FileCode,
  FileUp,
  GitBranch,
  Lightbulb,
  School,
  TimerIcon,
  Upload,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const ProjectAnalyzer: React.FC = () => {
  const [offen, setoffen] = useState<boolean>(false);
  return (
    <div className="flex justify-center bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 min-h-screen w-full">
      <div className="absolute right-0 top-0 ">
        <User className="absolute right-8 top-8 text-indigo-400 w-8 h-8 " />
      </div>
      <div className="flex-col justify-center text-center ">
        <h1 className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold text-5xl mt-20">
          Quick IO
        </h1>

        <h3 className="mt-13 text-indigo-400 font-bold text-3xl w-full text-center ">
          Why choose us
        </h3>
        <div className="flex justify-center ">
          <ArrowDown className="mt-5  w-10 h-10  text-indigo-400 animate-bounce animate-bounce" />
        </div>
        <div className="flex justify-between mt-5 gap-10 mb-10">
          <Card className="w-[290px] h-[100px] bg-gradient-to-r from-indigo-750 via-slate-800 to-slate-750  border-none shadow-lg shadow-black hover:-translate-y-1 transition-all duration-300">
            <CardContent className="flex justify-between text-center text-indigo-400 font-bold text-xl mt-2 gap-2">
              <Lightbulb className="mt-1"></Lightbulb>
              <h1>Fast and easy grading</h1>
            </CardContent>
          </Card>
          <Card className="w-[320px] h-[100px] bg-gradient-to-r from-indigo-750 via-slate-800 to-slate-750 border-none  shadow-lg shadow-black hover:-translate-y-1 transition-all duration-300">
            <CardContent className="flex justify-between text-center text-indigo-400 font-bold text-xl mt-2 gap-2">
              <TimerIcon className="mt-1"></TimerIcon>
              <h1>Time saving gaurenteed</h1>
            </CardContent>
          </Card>
          <Card
            className="w-[290px] h-[100px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-750  
           shadow-lg shadow-black hover:-translate-y-1 transition-all duration-300 border-none"
          >
            <CardContent className="flex justify-between text-center text-indigo-400 font-bold text-xl mt-2 ">
              <School className="mt-1"></School>
              <h1>Efficient for Teachers</h1>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mb-20">
          <Card className="mt-15 h-[600px] w-[800px] bg-gradient-to-r from-indigo-750 via-slate-800 to-slate-750 border-none border-black shadow-lg shadow-black ">
            <CardHeader className="text-center text-indigo-400 font-bold text-3xl">
              AI Code Reviewer
            </CardHeader>
            <CardContent className="w-[800px]">
              <div className="flex-col">
                <div className="flex justify-between mt-10 w-[600px] gap-10">
                  <h1 className=" pt-5 pb-6 text-indigo-400 font-bold text-xl w-[250px]">
                    Project Folder
                  </h1>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-400 rounded-md cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 mb-2 text-gray-500 animate-pulse" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or PDF (Max: 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </label>
                </div>
                <hr className="border-indigo-400 w-full mt-7 mb-7 " />
                <div className="flex justify-between mt-10 w-[600px] gap-10">
                  <h1 className=" pt-5 pb-6 text-indigo-400 font-bold text-xl w-[250px]">
                    Criteria Document
                  </h1>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-400 rounded-md cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileUp className="h-8 w-8 mb-2 text-gray-500 animate-pulse" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or PDF (Max: 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </label>
                </div>

                <div className="flex justify-between gap-5 mt-10">
                  <Input
                    placeholder="Enter AI Prompt"
                    className="w-full mt-5 border-indigo-400"
                  ></Input>
                  <Button className="mt-5 bg-indigo-400 w-[130px] hover:bg-indigo-400 ">
                    Ask Ai
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center ">
          <ArrowDown className="mt-0 mb-10  w-10 h-10  text-indigo-400 animate-bounce" />
          <h1 className="text-indigo-400 font-bold text-2xl">Results</h1>
        </div>
        <div className="flex justify-center mb-10 ">
          <div className="w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
              Code Review Ergebnisse
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-yellow-500 ">
                          78
                        </span>
                      </div>
                      <svg
                        className="w-24 h-24 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#334155"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#eab308"
                          strokeWidth="8"
                          strokeDasharray="282.6 113.04"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg">
                      Gesamtbewertung
                    </h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">
                        Code-Qualität
                      </span>
                      <span className="text-green-500">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="mt-4 flex items-center">
                      <Code className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-slate-300 text-sm">
                        Lesbarkeit & Struktur
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">
                        Best Practices
                      </span>
                      <span className="text-yellow-500">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="mt-4 flex items-center">
                      <GitBranch className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-slate-300 text-sm">
                        Patterns & Standards
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">
                        Performance
                      </span>
                      <span className="text-green-500">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <div className="mt-4 flex items-center">
                      <Clock className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-slate-300 text-sm">
                        Effizienz & Optimierung
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-between w-[130px]">
              <h1 className="text-md font-bold text-indigo-400 mt-1">
                view more
              </h1>
              <Button
                className="bg-indigo-400 mb-5 hover:bg-indigo-400 hover:-translate-y-1 transition-all duration-300"
                onClick={() => {
                  setoffen(!offen);
                }}
              >
                {offen ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
              </Button>
            </div>
            {offen ? (
              <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-none shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileCode className="mr-2 h-5 w-5" />
                    Detailliertes Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-md bg-slate-900">
                      <div className="mr-3 mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">
                          Gute Verwendung von Komponenten-Struktur
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-3 rounded-md bg-slate-900">
                      <div className="mr-3 mt-0.5">
                        <XCircle className="h-5 w-5 text-red-500 animate-ping" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">
                          Fehlende Fehlerbehandlung in API-Aufrufen
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700 "
                          >
                            api.ts
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                          >
                            Zeile 42
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start p-3 rounded-md bg-slate-900">
                      <div className="mr-3 mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">
                          Unnötige Re-Renders durch fehlende Memoization
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                          >
                            UserList.tsx
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                          >
                            Zeile 23
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Item 4 */}
                    <div className="flex items-start p-3 rounded-md bg-slate-900">
                      <div className="mr-3 mt-0.5">
                        <XCircle className="h-5 w-5 text-red-500 animate-ping" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">
                          Ungenutzte Variablen gefunden
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                          >
                            utils.ts
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-800 text-slate-300 border-slate-700"
                          >
                            Zeile 56
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Item 5 */}
                    <div className="flex items-start p-3 rounded-md bg-slate-900">
                      <div className="mr-3 mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">
                          Gute Testabdeckung für Core-Funktionen
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
