export function PreReleaseSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 mr-1 fill-current text-teal-400"
    >
      <circle cx="5" cy="12" r="2" className="animate-bounce" />
      <circle cx="12" cy="12" r="2" className="animate-bounce delay-200" />
      <circle cx="19" cy="12" r="2" className="animate-bounce delay-400" />
    </svg>
  );
}

export function RunningSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 mr-1 fill-current text-teal-400 animate-spin"
    >
      <path
        fillRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
        clipRule="evenodd"
      />
      <path d="M11 0a1 1 0 012 0v10a1 1 0 01-2 0V0z" />
    </svg>
  );
}

export function FinishedSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 mr-1 fill-current text-teal-400"
    >
      <path
        fillRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.707-14.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 00-1.414 1.414l3 3a3 3 0 004.242 0l6-6z"
        clipRule="evenodd"
      />
    </svg>
  );
}
