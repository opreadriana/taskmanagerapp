import Link from "next/link";

export default function Home() {
  return (
   <>
    <header className="bg-red-500 p-4 text-white  text-center"><h1 className="text-3xl font-bold">Task Manager App</h1></header>

    <main className="bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-2xl font-semibold mb-4"> Welcome to the Task Manager App!</h2>
      <p className="mb-6">Manage your tasks efficiently and stay organised.</p>

      <Link href='/todo'>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600">Go to To-Do List page</button>
      </Link>
    </main>

    <footer className="bg-blue-900 text-white text-center p-4 dark:bg-blue-950 dark:text-blue-300">
      <p>Thank you for choosing Task Manager. Please provide feedback at the email address below: </p>
    </footer>
   </>
  );
}
