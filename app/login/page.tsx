"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/ui/login-form";
import { motion } from "framer-motion";
import { ArrowDown, Settings, Timer, Zap } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white flex justify-center items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex justify-center ">
        <div className="flex-col w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold text-white mt-10">
                Why choose us ?
              </h1>
            </div>
            <div className="flex justify-between gap-4 w-[800px] mt-10 mb-10 ">
              <Card className="h-[100px] w-[400px] bg-slate-900 border-slate-800 shadow-xl">
                <CardContent className="flex justify-between mt-1 gap-5">
                  <Zap className="text-white mt-3 fill-white  "></Zap>
                  <h1 className="text-white font-bold ">
                    Fast and easy Coding Reviews
                  </h1>
                </CardContent>
              </Card>

              <Card className="h-[100px] w-[400px] bg-slate-900 border-slate-800 shadow-xl">
                <CardContent className="flex justify-between mt-1 gap-5">
                  <Timer className="text-white mt-3   "></Timer>
                  <h1 className="text-white font-bold">
                    Time efficient for Teachers
                  </h1>
                </CardContent>
              </Card>

              <Card className="h-[100px] w-[400px] bg-slate-900 border-slate-800 shadow-xl">
                <CardContent className="flex justify-between mt-1 gap-5">
                  <Settings className="text-white mt-3   "></Settings>
                  <h1 className="text-white font-bold ">
                    Easy scallable and adjustable
                  </h1>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mb-10 ">
              <ArrowDown className="h-10 w-10 animate-bounce"></ArrowDown>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <div className="w-[500px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <LoginForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
