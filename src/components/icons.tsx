export function LinkedIn({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3V9Zm6 0h3.84v1.64h.05c.534-1.01 1.84-2.08 3.79-2.08C20.4 8.56 22 10.66 22 14.1V21h-4v-6.1c0-1.45-.026-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9V9Z" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 8h10m-4-4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
