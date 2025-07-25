export default function Home() {
  return (
    <div className="mx-auto p-4 min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-100">
      <div className="max-w-3xl text-center space-y-10">
        <h1 className="text-3xl font-bold">Welcome to Zentra</h1>
        <p className="my-4">
          Your intelligent AI assistant for note-taking, chat, and productivity.
        </p>
        <button className=" bg-black text-white dark:bg-neutral-200 dark:text-black px-4 py-1.5 rounded-md w-40">
          Click
        </button>
      </div>
    </div>
  );
}
