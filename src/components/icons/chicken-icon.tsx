import type { LucideProps } from "lucide-react";
import * as React from "react";

const ChickenIcon = (props: LucideProps) => (
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
    <path d="M12.3 21.55a1 1 0 0 0-1.06-.02l-5.4 3.63a1 1 0 0 1-1.38-1.2l3.32-5.9-5.74-2.22a1 1 0 0 1-.3-1.68l7.55-8.36a1 1 0 0 1 1.62.43l1.8 7.84 5.3-2.12a1 1 0 0 1 1.25 1.41l-2.68 5.43 4.2 3.14a1 1 0 0 1-.4 1.76l-7.25 1.29Z" />
    <path d="m11.25 9.25 4.5-1.5" />
    <path d="M8 14.5s-2-2-2-4" />
    <circle cx="16.5" cy="6.5" r="1.5" />
  </svg>
);

export default ChickenIcon;
