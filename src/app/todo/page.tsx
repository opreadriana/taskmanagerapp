import Link from "next/link";

export default function TodoPage() {
  return (
    <>
      <header>
        <h1>To-Do List</h1>
      </header>

      <main>
        <h2>Your To-Do List</h2>
        <p>This is where your tasks will be listed.</p>

        <Link href="/">
          <button className='navigation'>
            Go Back Home
          </button>
        </Link>
      </main>

      <footer>
        <p>Stay productive and keep track of your tasks!</p>
      </footer>
    </>
  );
}