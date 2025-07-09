import type { LucideProps } from "lucide-react";
import * as React from "react";

const MackerelIcon = (props: LucideProps) => (
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
    <path d="M18.35 6.64a9.14 9.14 0 0 1-12.7 12.7" />
    <path d="M12.02 12.02a3 3 0 1 1-4.24-4.24 3 3 0 0 1 4.24 4.24Z" />
    <path d="M22 12a10 10 0 1 1-10-10" />
    <path d="M18.8 18.8c-1.4-1.4-3.3-2.3-5.3-2.3" />
  </svg>
);

export default MackerelIcon;
