import type { LucideProps } from "lucide-react";
import * as React from "react";

const PorkIcon = (props: LucideProps) => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="10" cy="10" r="1" />
    <circle cx="14" cy="10" r="1" />
    <path d="M12 16c-2 0-3-1-3-2s1-2 3-2 3 1 3 2-1 2-3 2z" />
  </svg>
);

export default PorkIcon;
