import type { LucideProps } from "lucide-react";
import * as React from "react";

const PeanutIcon = (props: LucideProps) => (
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
    <path d="M15.3 12.3c.8-1.5.8-3.3 0-4.6-1.5-2.5-4-3.5-6.3-2.3-2.3 1.2-3.3 3.8-2.3 6.3.8 1.5 2.5 2.5 4.3 2.5 1.3 0 2.5-.5 3.5-1.4.8 1.4 2.3 2.4 4.3 2.4 1 0 1.8-.4 2.5-1-.7.6-1.5 1-2.5 1-2 0-3.5-1.3-4.3-2.9Z"/>
    <path d="M13.5 10.5c0-1.7-1.3-3-3-3s-3 1.3-3 3"/>
  </svg>
);

export default PeanutIcon;
