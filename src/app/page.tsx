"use client";
import Link from "next/link";
import AITool from "./AITool";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
   <>
    <header className="bg-blue-100 p-4 text-blue-900 text-center shadow-md dark:bg-blue-800 dark:text-blue-100"><h1 className="text-3xl font-bold">The Productivity App</h1></header>

    <main className="flex-1 bg-blue-50 text-blue-900 p-8 min-h-[60vh] dark:bg-blue-900 dark:text-blue-100 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4"> Welcome to the Productivity App!</h2>
        <p className="mb-6">Manage your tasks efficiently and stay organised.</p>

        <Link href='/todo'>
          <Button className="text-blue-900 bg-blue-200 hover:bg-blue-300 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
            Go to To-Do List page
          </Button>
        </Link>

        <p className="mt-96 text-lg">Do you want to try our new AI Tool?</p>
        <p className='text-sm'>*Try our new feature and ask the AI about your Tasks from the To-Do List Page.</p>
        <AITool/>
      </div>
    </main>

    <footer className="bg-blue-100 text-blue-900 text-center p-4 dark:bg-blue-800 dark:text-blue-100">
      <p>Thank you for choosing The Productivity App. Please provide feedback at the email address below: example@gmail.com</p>
    </footer>
   </>
  );
}
