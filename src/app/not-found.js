export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[var(--white)] text-[var(--text-dark)]">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-[var(--peach)] text-[var(--text-dark)] rounded-lg transition-colors duration-300 hover:text-[var(--text-hover)]"
      >
        Go Home
      </a>
    </div>
  );
}
