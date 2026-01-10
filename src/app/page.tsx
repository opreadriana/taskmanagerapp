"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import AITool from "../features/ai/components/AITool";
import { Button } from "../shared/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex-shrink-0 p-4 text-center shadow-md transition-colors duration-300">
        <h1 className="text-3xl font-bold">The Productivity App</h1>
      </header>

      <main className="flex-1 p-8 flex transition-colors duration-300 min-h-0">
        {/* Left side - Main content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-6">
              Welcome to the Productivity App!
            </h2>

            <div className="mb-8 space-y-4 italic text-gray-700 dark:text-gray-300">
              <p className="border-l-4 border-blue-400 pl-4 py-2">
                "You may delay, but time will not." 
                <span className="block text-sm font-semibold mt-1 not-italic">— Benjamin Franklin</span>
              </p>
              <p className="border-l-4 border-blue-400 pl-4 py-2">
                "The way to get started is to quit talking and begin doing." 
                <span className="block text-sm font-semibold mt-1 not-italic">— Walt Disney</span>
              </p>
            </div>

            <div className="mb-10 flex justify-start">
              <Image
                src="/notebook-writing.jpg"
                alt="Person writing in notebook"
                width={256}
                height={192}
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
            </div>

            <p className="mb-6">
              Manage your tasks efficiently and stay organised.
            </p>

            <Link href="/todo">
              <Button className="bg-blue-200 text-blue-900 hover:bg-blue-300 transition-colors">
                Go to To-Do List page
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - AI Chat */}
        <div className="w-96 ml-8 pl-8 border-l-2 border-blue-300 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>

          <div className="flex-1">
            <AITool />
          </div>
        </div>
      </main>

      <footer className="flex-shrink-0 text-center p-4 transition-colors duration-300">
        <p>
          Thank you for choosing The Productivity App. Please provide feedback
          at the email address below: example@gmail.com
        </p>
      </footer>
    </div>
  );
}

