export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh] text-[var(--text-dark)]">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-[var(--blue2)] text-[var(--text-dark)] rounded-lg text-lg transition-colors duration-300 hover:text-[var(--text-hover)]"
      >
        Go Home
      </a>
    </div>
  );
}
