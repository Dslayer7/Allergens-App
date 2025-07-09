import type { LucideProps } from "lucide-react";
import * as React from "react";

const CrabIcon = (props: LucideProps) => (
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
    <path d="M13.6 2.4a2 2 0 0 1 3.8-.4l1.2 2a2 2 0 0 0 3.2 1.2l2.4-1.2a2 2 0 0 1 2.8 2.8l-1.2 2.4a2 2 0 0 0 1.2 3.2l2 1.2a2 2 0 0 1-.4 3.8l-5.6 1.4" />
    <path d="M2.6 15.8a2 2 0 0 1-1-3.4l3.2-2.4a2 2 0 0 0 0-3.2L1.6 4.2a2 2 0 0 1 3.4-1l7.6 5.6" />
    <path d="M12 22a6 6 0 0 0 6-6h-6Z" />
    <path d="m5.6 2.4-1 1.6a2 2 0 0 0 0 2.8l1 1.6" />
  </svg>
);

export default CrabIcon;
