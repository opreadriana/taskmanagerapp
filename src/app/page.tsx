"use client";
import Link from "next/link";
import Image from "next/image";
import AITool from "../features/ai/components/AITool";
import { Button } from "../shared/components/ui/button";

export default function Home() {
  return (
<<<<<<< HEAD
    <>
      <header className="bg-white p-4 text-blue-900  text-center shadow-md dark:bg-blue-900 dark:text-white">
        <h1 className="text-3xl font-bold">The Productivity App</h1>
      </header>

      <main className="flex-1 bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            Welcome to the Productivity App!
          </h2>
          <p className="mb-6">
            Manage your tasks efficiently and stay organised.
          </p>

          <Link href="/todo">
            <button className="text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
              Go to To-Do List page
            </button>
          </Link>

          <p className="mt-96 text-lg">Do you want to try our new AI Tool?</p>
          <p className="text-sm">
            *Try our new feature and ask the AI about your Tasks from the To-Do
            List Page.
          </p>
          <AITool />
        </div>
      </main>

      <footer className="bg-white text-blue-900 text-center p-4 dark:bg-blue-900 dark:text-white">
=======
    <div className="h-screen flex flex-col">
      <header className="flex-shrink-0 p-4 text-center shadow-md transition-colors duration-300">
        <h1 className="text-3xl font-bold">The Productivity App</h1>
      </header>

      <main className="flex-1 p-8 flex transition-colors duration-300 min-h-0">
        {/* Left side - Main content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">
              {" "}
              Welcome to the Productivity App!
            </h2>

            <div className="mb-6 flex justify-start">
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
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
        <p>
          Thank you for choosing The Productivity App. Please provide feedback
          at the email address below: example@gmail.com
        </p>
      </footer>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
  );
}
