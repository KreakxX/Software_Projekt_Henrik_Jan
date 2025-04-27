"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  FileCode,
  FileUp,
  GitBranch,
  Lightbulb,
  Upload,
  User,
  XCircle,
  Sparkles,
  BarChart3,
  Zap,
  Shield,
  Cpu,
  Layers,
  Clipboard,
  Star,
  TriangleAlert,
  Bookmark,
  CircleXIcon,
  Cross,
  X,
  Wand,
  WandSparkles,
  ArrowDown,
  Bolt,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import JSZip from "jszip";
import { AnimatePresence, motion } from "framer-motion";
import { fixWrongCode, testDataUpload } from "../api";
import { div, h1 } from "framer-motion/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectAnalyzer: React.FC = () => {
  const [offen, setoffen] = useState<boolean>(false);
  const [file_titleFolder, setFile_titleFolder] = useState<string>("");
  const [file_titleCriteria, setFile_titleCriteria] = useState<string>("");
  const [notenpunkte, setNotenPunkte] = useState<number>(0);
  const [Quality, setQuality] = useState<number>(0);
  const [BestPractices, setBestPractices] = useState<number>(0);
  const [Performance, setPerformance] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [Analysed, setAnalysed] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedIndex, setsSlectedIndex] = useState<number | null>(null);
  const [detailedFeedback, setDetailedFeedback] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState<number>(0);
  const [selectedGoodCode, setSelectedGoodCode] = useState<number>(0);
  const [goodCode, setGoodCode] = useState<string>("");
  const [readability, setReadabilty] = useState<number>(0);
  const [Structure, setStructure] = useState<number>(0);
  const [Documentation, setDocumentation] = useState<number>(0);
  const [DesignPatters, setDesignPatterns] = useState<number>(0);
  const [Standards, setStandards] = useState<number>(0);
  const [Errorhandling, setErrorhandling] = useState<number>(0);
  const [Effiency, setEffiency] = useState<number>(0);
  const [Optimization, setOptimization] = useState<number>(0);
  const [ResourceUsage, setRessourceUsage] = useState<number>(0);
  const [formDataFolder, setFormdataFolder] = useState<File>();
  const [formDataCriteria, setFormdataCriteria] = useState<File>();
  const [studentName, setStudentName] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("");

  const tips = [
    "Use the 'Quick Fix' feature to automatically apply suggested fixes to your code.",
    "Compare historical analyses to track your code quality improvements over time.",
    "Enable 'Auto-Fix' in settings to automatically apply non-destructive fixes.",
    "Export your analysis results to share with your team or include in documentation.",
    "Use the AI Instructions field to focus the analysis on specific aspects of your code.",
  ];

  const handleFileUploadFolder = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const files = event.target.files;
      if (!files) return;

      const file = files[0];

      setFile_titleFolder(file.name);
      setFormdataFolder(file);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleFileUploadCriteria = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const files = event.target.files;
      if (!files) return;
      const file = files[0];

      setFile_titleCriteria(file.name);
      setFormdataCriteria(file);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleAnalyze = () => {
    if (!file_titleFolder || !file_titleCriteria) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysed(true);
      setShowResults(true);
    }, 24000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  const handleCodeReview = async () => {
    try {
      if (!formDataFolder || !formDataCriteria) {
        return;
      }

      const response = await testDataUpload(
        projectTitle,
        studentName,
        formDataFolder,
        formDataCriteria
      );
      setNotenPunkte(response["Grade_Points_from_0-15"]);
      setQuality(response["Code_Quality_Points_from_0-100"]);
      setBestPractices(response["Best_Practices_Points_from_0-100"]);
      setPerformance(response["Performance_Points_from_0-100"]);
      setReadabilty(response["Code_Quality_Points_Readability_from_0-100"]);
      setStructure(response["Code_Quality_Points_Structure_from_0-100"]);
      setDesignPatterns(
        response["Best_Practices_Points_Design_Patterns_from_0-100"]
      );
      setStandards(response["Best_Practices_Points_Standards_from_0-100"]);
      setErrorhandling(
        response["Best_Practices_Points_Error_Handling_from_0-100"]
      );
      setEffiency(response["Performance_Points_Efficiency_from_0-100"]);
      setOptimization(response["Performance_Points_Optimization_from_0-100"]);
      setRessourceUsage(
        response["Performance_Points_from_Resource_Usage_0-100"]
      );

      setDocumentation(
        response["Code_Quality_Points_Documentation_from_0-100"]
      );
      console.log(
        response[
          "detailed_feedback_short_sentence_whit_bad_good_or_warn_before_and_full_wrong_code_to_see_if_bad_and_Recommendation_seperated"
        ]
      );
      setDetailedFeedback(
        response[
          "detailed_feedback_short_sentence_whit_bad_good_or_warn_before_and_full_wrong_code_to_see_if_bad_and_Recommendation_seperated"
        ]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const FixWrongCode = async (
    wrongCode: string,
    suggestion: string,
    index: number
  ) => {
    try {
      const response = await fixWrongCode(wrongCode, suggestion);
      setSelectedGoodCode(index);
      setGoodCode(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-indigo-500 font-bold text-5xl "
          >
            Quick IO
          </motion.h1>

          <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-full absolute right-0 top-10 hover:cursor-pointer hover:bg-slate-700/50">
            <User className="text-indigo-400 w-6 h-6 " />
            <span className="text-indigo-200 font-medium mr-3">User</span>
          </div>
        </div>
        <div className="flex justify-center mb-15 mt-5  ">
          <div className="flex items-center gap-3 rounded-lg bg-indigo-900/20 border border-indigo-500/30 w-[800px]  p-4 ">
            <div className={`p-2 rounded-full `}>
              <Lightbulb className={`h-5 w-5 `} />
            </div>

            <div>
              <h3 className={`font-medium`}>Pro Tip</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {tips[currentTip]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3 gap-1">
          {tips.map((_, index) => (
            <div key={index} className={`h-1.5 w-1.5 rounded-full`}></div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-indigo-300 flex items-center justify-center gap-2 mb-5">
            AI Code Reviewer
          </h2>
          <p className="text-indigo-200 mt-2 max-w-2xl mx-auto">
            Upload your project files and criteria document to get an AI-powered
            code review with detailed feedback and suggestions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-indigo-900/20 border border-indigo-500/20 shadow-xl shadow-indigo-900/20 backdrop-blur-sm ">
            <CardHeader className="border-b border-indigo-500/20 pb-4">
              <CardTitle className="text-center text-indigo-300 font-bold text-2xl flex items-center justify-center gap-2">
                <FileCode className="h-6 w-6 text-indigo-400" />
                Project Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-indigo-300 font-semibold text-lg flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-400" />
                    Project Folder
                  </h3>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-400/50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-950/30 hover:border-indigo-400 group">
                    <div className="flex flex-col items-center justify-center p-5 text-center">
                      <Upload className="h-8 w-8 mb-3 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110" />
                      {file_titleFolder ? (
                        <div className="space-y-1">
                          <p className="text-indigo-200 font-medium">
                            {file_titleFolder}
                          </p>
                          <p className="text-xs text-indigo-400">
                            File uploaded successfully
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-indigo-300 font-medium">
                            <span className="font-bold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-indigo-400">
                            ZIP files (Max: 20MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      onChange={(event) => handleFileUploadFolder(event)}
                      type="file"
                      className="hidden"
                      accept=".zip"
                      data-webkitdirectory="true"
                      multiple
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <h3 className="text-indigo-300 font-semibold text-lg flex items-center gap-2">
                    <Clipboard className="h-5 w-5 text-indigo-400" />
                    Criteria Document
                  </h3>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-400/50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-950/30 hover:border-indigo-400 group">
                    <div className="flex flex-col items-center justify-center p-5 text-center">
                      <FileUp className="h-8 w-8 mb-3 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110" />
                      {file_titleCriteria ? (
                        <div className="space-y-1">
                          <p className="text-indigo-200 font-medium">
                            {file_titleCriteria}
                          </p>
                          <p className="text-xs text-indigo-400">
                            File uploaded successfully
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-indigo-300 font-medium">
                            <span className="font-bold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-indigo-400">
                            PDF (Max: 20MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      onChange={(event) => handleFileUploadCriteria(event)}
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      multiple
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="text-indigo-300 font-semibold text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-indigo-400" />
                  AI Instructions (Optional)
                </h3>
                <div className="flex gap-4">
                  <div className="flex-row w-full ">
                    <Input
                      placeholder="Enter specific instructions for the AI reviewer..."
                      className="flex-1 bg-slate-800/50 border-indigo-500/30 focus:border-indigo-400 text-indigo-100 placeholder:text-indigo-300/50 mb-5"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex justify-between gap-5">
                      <Input
                        placeholder="Enter the name of the Student"
                        className="flex-1 bg-slate-800/50 border-indigo-500/30 focus:border-indigo-400 text-indigo-100 placeholder:text-indigo-300/50 mb-5"
                        onChange={(e) => setStudentName(e.target.value)}
                      />
                      <Input
                        placeholder="Enter the name of the Project"
                        className="flex-1 bg-slate-800/50 border-indigo-500/30 focus:border-indigo-400 text-indigo-100 placeholder:text-indigo-300/50 mb-5"
                        onChange={(e) => setProjectTitle(e.target.value)}
                      />
                    </div>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-600/20 w-full "
                      onClick={() => {
                        handleAnalyze();
                        handleCodeReview();
                      }}
                      disabled={
                        isAnalyzing ||
                        !file_titleFolder ||
                        !file_titleCriteria ||
                        Analysed
                      }
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="mr-2">Analyzing</span>
                          <span className="animate-pulse">...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Analyze Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500"></div>
                <h2 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-indigo-400" />
                  Analysis Results
                </h2>

                <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500"></div>
              </div>
              <Button
                onClick={() => {
                  handleAnalyze();
                  handleCodeReview();
                }}
                className="bg-indigo-600 hover:bg-indigo-600 "
              >
                <Zap></Zap>
                New Analyis
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 shadow-lg col-span-1 md:col-span-3">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-6 mb-6 md:mb-0">
                      <div className="relative w-28 h-28">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {notenpunkte >= 13 ? (
                            <span className="text-4xl font-bold text-green-500">
                              {notenpunkte}
                            </span>
                          ) : notenpunkte > 9 ? (
                            <span className="text-4xl font-bold text-yellow-500">
                              {notenpunkte}
                            </span>
                          ) : notenpunkte > 5 ? (
                            <span className="text-4xl font-bold text-orange-500">
                              {notenpunkte}
                            </span>
                          ) : (
                            <span className="text-4xl font-bold text-red-500">
                              {notenpunkte}
                            </span>
                          )}
                        </div>
                        <svg
                          className="w-28 h-28 transform -rotate-90"
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
                          {notenpunkte >= 13 ? (
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="transparent"
                              stroke="#10B981"
                              strokeWidth="8"
                              strokeDasharray="282.6 113.04"
                              strokeLinecap="round"
                            />
                          ) : notenpunkte > 9 ? (
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="transparent"
                              stroke="#F59E0B"
                              strokeWidth="8"
                              strokeDasharray="282.6 113.04"
                              strokeLinecap="round"
                            />
                          ) : notenpunkte > 5 ? (
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="transparent"
                              stroke="#F97316"
                              strokeWidth="8"
                              strokeDasharray="282.6 113.04"
                              strokeLinecap="round"
                            />
                          ) : (
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="transparent"
                              stroke="#EF4444"
                              strokeWidth="8"
                              strokeDasharray="282.6 113.04"
                              strokeLinecap="round"
                            />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-indigo-300 mb-1">
                          {notenpunkte >= 13
                            ? "Excellent"
                            : notenpunkte > 9
                            ? "Good"
                            : notenpunkte > 5
                            ? "Average"
                            : "Bad"}
                        </h3>
                        {notenpunkte >= 13 ? (
                          <p className="text-indigo-400">
                            Your code meets high quality standards
                          </p>
                        ) : notenpunkte > 9 ? (
                          <p className="text-indigo-400">
                            Your code meets good quality standards
                          </p>
                        ) : notenpunkte > 5 ? (
                          <p className="text-indigo-400">
                            Your code meets average quality standards
                          </p>
                        ) : (
                          <p className="text-indigo-400">
                            Your code meets bad quality standards
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                      <div className="flex flex-col items-center p-3 bg-indigo-900/20  rounded-lg">
                        <span className="text-xl font-bold text-yellow-500">
                          {Math.round(
                            (Quality + BestPractices + Performance) / 3
                          ) >= 70 ? (
                            <span className="text-green-500">
                              {Math.round(
                                (Quality + BestPractices + Performance) / 3
                              )}{" "}
                              %
                            </span>
                          ) : Math.round(
                              (Quality + BestPractices + Performance) / 3
                            ) > 40 ? (
                            <span className="text-yellow-500">
                              {Math.round(
                                (Quality + BestPractices + Performance) / 3
                              )}{" "}
                              %
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {Math.round(
                                (Quality + BestPractices + Performance) / 3
                              )}{" "}
                              %
                            </span>
                          )}
                        </span>
                        <span className="text-indigo-300 text-sm">Overall</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-indigo-900/20  rounded-lg">
                        {Quality > 70 ? (
                          <span className="text-xl font-bold text-green-500">
                            {Math.round(Quality)}%
                          </span>
                        ) : Quality > 40 ? (
                          <span className="text-xl font-bold text-yellow-500">
                            {Math.round(Quality)}%
                          </span>
                        ) : (
                          <span className="text-xl font-bold text-red-500">
                            {Math.round(Quality)}%
                          </span>
                        )}
                        <span className="text-indigo-300 text-sm">Quality</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-indigo-900/20  rounded-lg">
                        {BestPractices > 70 ? (
                          <span className="text-xl font-bold text-green-500">
                            {Math.round(BestPractices)}%
                          </span>
                        ) : BestPractices > 40 ? (
                          <span className="text-xl font-bold text-yellow-500">
                            {Math.round(BestPractices)}%
                          </span>
                        ) : (
                          <span className="text-xl font-bold text-red-500">
                            {Math.round(BestPractices)}%
                          </span>
                        )}
                        <span className="text-indigo-300 text-sm">
                          Best Practices
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-indigo-900/20  rounded-lg">
                        {Performance > 70 ? (
                          <span className="text-xl font-bold text-green-500">
                            {Math.round(Performance)}%
                          </span>
                        ) : Performance > 40 ? (
                          <span className="text-xl font-bold text-yellow-500">
                            {Math.round(Performance)}%
                          </span>
                        ) : (
                          <span className="text-xl font-bold text-red-500">
                            {Math.round(Performance)}%
                          </span>
                        )}
                        <span className="text-indigo-300 text-sm">
                          Performance
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 shadow-lg hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-indigo-200 font-semibold text-lg flex items-center gap-2">
                        <Code className="h-5 w-5 text-indigo-400" />
                        Code Quality
                      </span>
                      {Quality > 70 ? (
                        <span className=" font-bold text-green-500">
                          {Math.round(Quality)}%
                        </span>
                      ) : Quality > 40 ? (
                        <span className=" font-bold text-yellow-500">
                          {Math.round(Quality)}%
                        </span>
                      ) : (
                        <span className="font-bold text-red-500">
                          {Math.round(Quality)}%
                        </span>
                      )}
                    </div>
                    <Progress value={Quality} className="h-2 mb-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Readability</span>
                        {readability >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(readability)}%
                          </span>
                        ) : readability > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(readability)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(readability)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Structure</span>
                        {Structure >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Structure)}%
                          </span>
                        ) : Structure > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Structure)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Structure)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Documentation</span>
                        {Documentation >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Documentation)}%
                          </span>
                        ) : Documentation > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Documentation)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Documentation)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 shadow-lg hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-indigo-200 font-semibold text-lg flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-indigo-400" />
                        Best Practices
                      </span>
                      {BestPractices >= 70 ? (
                        <span className=" font-bold text-green-500">
                          {Math.round(BestPractices)}%
                        </span>
                      ) : BestPractices > 40 ? (
                        <span className=" font-bold text-yellow-500">
                          {Math.round(BestPractices)}%
                        </span>
                      ) : (
                        <span className="font-bold text-red-500">
                          {Math.round(BestPractices)}%
                        </span>
                      )}
                    </div>
                    <Progress value={BestPractices} className="h-2 mb-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Design Patterns</span>
                        {DesignPatters >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(DesignPatters)}%
                          </span>
                        ) : DesignPatters > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(DesignPatters)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(DesignPatters)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Standards</span>
                        {Standards >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Standards)}%
                          </span>
                        ) : Standards > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Standards)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Standards)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Error Handling</span>
                        {Errorhandling >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Errorhandling)}%
                          </span>
                        ) : Errorhandling > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Errorhandling)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Errorhandling)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 shadow-lg hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-indigo-200 font-semibold text-lg flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-indigo-400" />
                        Performance
                      </span>
                      {Performance > 70 ? (
                        <span className=" font-bold text-green-500">
                          {Math.round(Performance)}%
                        </span>
                      ) : Performance > 40 ? (
                        <span className=" font-bold text-yellow-500">
                          {Math.round(Performance)}%
                        </span>
                      ) : (
                        <span className="font-bold text-red-500">
                          {Math.round(Performance)}%
                        </span>
                      )}
                    </div>
                    <Progress value={Performance} className="h-2 mb-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Efficiency</span>
                        {Effiency >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Effiency)}%
                          </span>
                        ) : Effiency > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Effiency)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Effiency)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Optimization</span>
                        {Optimization >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(Optimization)}%
                          </span>
                        ) : Optimization > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(Optimization)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(Optimization)}%
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-300">Resource Usage</span>
                        {ResourceUsage >= 70 ? (
                          <span className=" text-green-500">
                            {Math.round(ResourceUsage)}%
                          </span>
                        ) : ResourceUsage > 40 ? (
                          <span className=" text-yellow-500">
                            {Math.round(ResourceUsage)}%
                          </span>
                        ) : (
                          <span className=" text-red-500">
                            {Math.round(ResourceUsage)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                className="border-indigo-500/30 text-indigo-300 bg-indigo-950/50 hover:bg-indigo-950/50 hover:text-indigo-200 transition-all duration-300"
                onClick={() => setoffen(!offen)}
              >
                {offen ? (
                  <div className="flex items-center gap-2">
                    <span>Hide Detailed Feedback</span>
                    <ChevronUp className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Show Detailed Feedback</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>

            {offen && (
              <div>
                <Tabs defaultValue="detailed-feedback" className="w-full ">
                  <TabsList className="grid w-full grid-cols-2 mb-6 gap-5 bg-indigo-900/40 ">
                    <TabsTrigger
                      value="detailed-feedback"
                      className="flex items-center gap-2 text-indigo-400 "
                    >
                      <FileCode className="h-4 w-4" />
                      Detailed Feedback
                    </TabsTrigger>
                    <TabsTrigger
                      value="fix-issues"
                      className="flex items-center gap-2 text-indigo-400"
                    >
                      <CircleXIcon className="h-4 w-4" />
                      Fix your Errors
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="detailed-feedback">
                    <Card className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/20 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-indigo-300 flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-indigo-400" />
                          Detailed Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {detailedFeedback.map((feedback, index) => (
                          <div
                            className="flex items-center mb-7 w-full font-semibold gap-10 text-indigo-400 text-md border-slate-700/50 border p-3 rounded-lg bg-indigo-900/20 hover:bg-indigo-900/30"
                            key={index}
                          >
                            {feedback.includes("good") && (
                              <CheckCircle className="text-green-500 " />
                            )}
                            {feedback.includes("bad") && (
                              <XCircle className="text-red-500  " />
                            )}
                            {feedback.includes("warn") && (
                              <TriangleAlert className="text-yellow-500  " />
                            )}
                            <h1 className="">
                              {feedback.includes(" - ")
                                ? feedback
                                    .split(" - ")[1]
                                    ?.split("Recommendation")[0]
                                    ?.trim()
                                    .replace("good", "")
                                    .replace(":", "")
                                    .replace("bad", "")
                                    .replace("warn", "")
                                    .replace(/`/g, "")
                                : feedback
                                    .replace("good", "")
                                    .replace(":", "")
                                    .replace("bad", "")
                                    .replace("warn", "")
                                    .replace(/`/g, "")}
                            </h1>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="fix-issues">
                    <Card className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 shadow-lg">
                      <CardHeader className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CircleXIcon className="h-5 w-5 text-red-500" />
                          <h3 className="font-bold text-md text-indigo-400">
                            Fix your Errors
                          </h3>
                        </div>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-5 gap-6 ">
                        <div className="md:col-span-2 space-y-4">
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-slate-800 mt-2">
                            <Badge className="bg-indigo-900/50 text-indigo-300">
                              {
                                detailedFeedback.filter((f) =>
                                  f.includes("bad")
                                ).length
                              }{" "}
                              issues
                            </Badge>
                            <ScrollArea>
                              {detailedFeedback
                                .filter((feedback) => feedback.includes("bad"))
                                .map((feedback, index) => (
                                  <div
                                    className="p-3 rounded-lg bg-indigo-900/20 border-slate-700/50 border cursor-pointer transition-all duration-200 hover:bg-slate-700/50 mb-3"
                                    key={index}
                                    onClick={() => setsSlectedIndex(index)}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start gap-2">
                                        <div>
                                          <p className="font-medium text-indigo-200 text-sm">
                                            {feedback.includes(" - ")
                                              ? feedback
                                                  .split(" - ")[1]
                                                  ?.split("Recommendation")[0]
                                                  ?.trim()
                                                  .replace("good", "")
                                                  .replace(":", "")
                                                  .replace("bad", "")
                                                  .replace("warn", "")
                                                  .replace(/`/g, "")
                                              : feedback
                                                  .replace("good", "")
                                                  .replace(":", "")
                                                  .replace("bad", "")
                                                  .replace("warn", "")
                                                  .replace(/`/g, "")}
                                          </p>
                                          <p className="text-xs text-indigo-400"></p>
                                        </div>
                                      </div>
                                      <Badge className="bg-red-500/20 text-red-500 pb-1">
                                        error
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                            </ScrollArea>
                          </div>
                        </div>

                        <div className="md:col-span-3 ">
                          {selectedIndex !== null ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-indigo-300">
                                  Issue Details
                                </h3>
                              </div>

                              <div className="p-4 rounded-lg bg-indigo-900/20 border border-slate-700">
                                <div className="mb-4">
                                  <h4 className="font-medium text-indigo-300 mb-6">
                                    {detailedFeedback
                                      .filter((feedback) =>
                                        feedback.includes("bad")
                                      )
                                      .map((feedback, index) => (
                                        <div key={index}>
                                          {index == selectedIndex ? (
                                            <h4>
                                              {feedback.includes(" - ")
                                                ? feedback
                                                    .split(" - ")[1]
                                                    ?.split("Recommendation")[0]
                                                    ?.trim()
                                                    .replace("good", "")
                                                    .replace(":", "")
                                                    .replace("bad", "")
                                                    .replace("warn", "")
                                                    .replace(/`/g, "")
                                                : feedback
                                                    .replace("good", "")
                                                    .replace(":", "")
                                                    .replace("bad", "")
                                                    .replace("warn", "")
                                                    .replace(/`/g, "")}
                                            </h4>
                                          ) : null}
                                        </div>
                                      ))}
                                  </h4>
                                  <p className="text-sm text-indigo-200"></p>
                                </div>

                                <div className="mb-8">
                                  <h4 className="font-medium text-indigo-300 mb-1">
                                    Code
                                  </h4>
                                  <pre className="text-xs p-3  bg-indigo-900/20 rounded-lg text-indigo-200 overflow-x-auto">
                                    {detailedFeedback
                                      .filter((feedback) =>
                                        feedback.includes("bad")
                                      )
                                      .map((feedback, index) => (
                                        <div key={index}>
                                          {index == selectedIndex ? (
                                            <h4>
                                              {feedback.includes(" - ") ? (
                                                feedback
                                                  .split(" - ")[0]
                                                  ?.split("Recommendation")[0]
                                                  ?.trim()
                                                  .replace("good", "")
                                                  .replace(":", "")
                                                  .replace("bad", "")
                                                  .replace("warn", "")
                                                  .replace(/`/g, "")
                                              ) : (
                                                <h1> None</h1>
                                              )}
                                            </h4>
                                          ) : null}
                                        </div>
                                      ))}
                                  </pre>
                                </div>
                                {goodCode &&
                                selectedGoodCode == selectedIndex ? (
                                  <div className="flex justify-center animate-bounce text-indigo-400 ">
                                    <ArrowDown></ArrowDown>
                                  </div>
                                ) : null}
                                {goodCode &&
                                selectedGoodCode === selectedIndex ? (
                                  <div className="mb-8">
                                    <h4 className="font-medium text-indigo-300 mb-1">
                                      Corrected Code
                                    </h4>
                                    <pre className="text-xs p-3  bg-indigo-900/20 rounded-lg text-indigo-200 overflow-x-auto">
                                      {detailedFeedback
                                        .filter((feedback) =>
                                          feedback.includes("bad")
                                        )
                                        .map((feedback, index) => (
                                          <div key={index}>
                                            {selectedGoodCode ==
                                              selectedIndex &&
                                            selectedIndex == index ? (
                                              <div>
                                                <h4>
                                                  {goodCode
                                                    .trim()
                                                    .replace(/`/g, "")
                                                    .replace("java", "")}
                                                </h4>
                                                <h1> </h1>
                                              </div>
                                            ) : null}
                                          </div>
                                        ))}
                                    </pre>
                                  </div>
                                ) : null}

                                <div>
                                  <h4 className="font-medium text-indigo-300 mb-1 ">
                                    Suggestion
                                  </h4>
                                  <div className="text-sm text-indigo-200">
                                    {detailedFeedback
                                      .filter((feedback) =>
                                        feedback.includes("bad")
                                      )
                                      .map((feedback, index) => (
                                        <div key={index}>
                                          {index == selectedIndex ? (
                                            <div>
                                              {feedback
                                                .split("Recommendation")[1]
                                                ?.trim()
                                                .replace("good", "")
                                                .replace(":", "")
                                                .replace("bad", "")
                                                .replace("warn", "")
                                                .replace(/`/g, "")}
                                            </div>
                                          ) : null}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                                  onClick={() => {
                                    const wrongCode = detailedFeedback
                                      .filter((feedback) =>
                                        feedback.includes("bad")
                                      )
                                      .map((feedback, index) => {
                                        console.log(
                                          `Feedback at index ${index}:`,
                                          feedback
                                        );
                                        if (index == selectedIndex) {
                                          return feedback.includes(" - ")
                                            ? feedback
                                                .split(" - ")[0]
                                                ?.split("Recommendation")[0]
                                                ?.trim()
                                                .replace("good", "")
                                                .replace(":", "")
                                                .replace("bad", "")
                                                .replace("warn", "")
                                                .replace(/`/g, "")
                                            : "None";
                                        }
                                        return null;
                                      })
                                      .filter(Boolean)[0];
                                    let index1 = 0;

                                    const suggestion = detailedFeedback
                                      .filter((feedback) =>
                                        feedback.includes("bad")
                                      )
                                      .map((feedback, index) => {
                                        if (index === selectedIndex) {
                                          index1 = index;
                                          return feedback
                                            .split("Recommendation")[1]
                                            ?.trim()
                                            .replace("good", "")
                                            .replace(":", "")
                                            .replace("bad", "")
                                            .replace("warn", "")
                                            .replace(/`/g, "");
                                        }
                                        return null;
                                      })
                                      .filter(Boolean)[0];
                                    if (wrongCode && suggestion) {
                                      FixWrongCode(
                                        wrongCode,
                                        suggestion,
                                        index1
                                      );
                                    }
                                  }}
                                >
                                  Quick fix
                                  <WandSparkles className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center p-10 border border-dashed rounded-lg border-indigo-500/20 text-indigo-400">
                              <div className="text-center">
                                <CircleXIcon className="h-10 w-10 mx-auto mb-4 opacity-50" />
                                <p>Select an issue to view details</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
