import Link from "next/link";

export default function Home() {
  return (
   <>
    <header className="bg-white p-4 text-blue-900  text-center shadow-md dark:bg-blue-900 dark:text-white"><h1 className="text-3xl font-bold">Task Manager App</h1></header>

    <main className="flex-1 bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-2xl font-semibold mb-4"> Welcome to the Task Manager App!</h2>
      <p className="mb-6">Manage your tasks efficiently and stay organised.</p>

      <Link href='/todo'>
        <button className="text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
          Go to To-Do List page
        </button>
      </Link>
    </main>

    <footer className="bg-white text-blue-900 text-center p-4 dark:bg-blue-900 dark:text-white">
      <p>Thank you for choosing Task Manager. Please provide feedback at the email address below: example@gmail.com</p>
    </footer>
   </>
  );
}
