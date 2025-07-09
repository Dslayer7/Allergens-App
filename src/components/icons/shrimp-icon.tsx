import type { LucideProps } from "lucide-react";
import * as React from "react";

const ShrimpIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s2-2 2-6 2-4 6-4 6 2 6 6-2 6-2 6" />
    <path d="M6 12s-2 2-2 6 2 4 6 4 6-2 6-6" />
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M12 12v10" />
  </svg>
);
