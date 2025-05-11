import Link from "next/link";

export default function Home() {
  return (
   <>
    <header><h1>Task Manager App</h1></header>

    <main>
      <h2> Welcome to the Task Manager App!</h2>
      <p>Manage your tasks efficiently and stay organised.</p>

      <Link href='/todo'>
        <button>Go to To-Do List page</button>
      </Link>
    </main>

    <footer>
      <p>Thank you for choosing Task Manager. Please provide feedback at the email address below: </p>
    </footer>
   </>
  );
}
