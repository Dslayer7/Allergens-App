import type { LucideProps } from "lucide-react";
import * as React from "react";

const SoybeanIcon = (props: LucideProps) => (
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
    <path d="M20,10c0,4.4-3.6,8-8,8s-8-3.6-8-8c0-4.4,3.6-8,8-8C16.4,2,20,5.6,20,10z"/>
    <circle cx="10" cy="10" r="1.5"/>
    <circle cx="14" cy="10" r="1.5"/>
  </svg>
);

export default SoybeanIcon;
