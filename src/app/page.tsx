"use client";
import Link from "next/link";
import AITool from "./AITool";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
   <>
    <header className="p-4 text-center shadow-md transition-colors duration-300"><h1 className="text-3xl font-bold">The Productivity App</h1></header>

    <main className="flex-1 p-8 min-h-[60vh] flex transition-colors duration-300">
      {/* Left side - Main content */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4"> Welcome to the Productivity App!</h2>
          
          {/* HD Notebook image */}
          <div className="mb-40 flex justify-start">
            <img 
              src="/notebook-writing.jpg" 
              alt="Person writing in notebook" 
              className="w-80 h-60 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <p className="mb-6">Manage your tasks efficiently and stay organised.</p>

          <Link href='/todo'>
            <Button className="bg-blue-200 text-blue-900 hover:bg-blue-300 transition-colors">
              Go to To-Do List page
            </Button>
          </Link>
        </div>
      </div>

      {/* Right side - AI Chat */}
      <div className="w-96 ml-8 pl-8 border-l-2 border-blue-300 flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
        
        {/* Input at bottom */}
        <div className="border-t border-blue-200 pt-4">
          <AITool/>
        </div>
      </div>
    </main>

    <footer className="text-center p-4 transition-colors duration-300">
      <p>Thank you for choosing The Productivity App. Please provide feedback at the email address below: example@gmail.com</p>
    </footer>
   </>
  );
}
