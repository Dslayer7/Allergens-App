import type { LucideProps } from "lucide-react";
import * as React from "react";

const SquidIcon = (props: LucideProps) => (
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
    <path d="M12,2C8,2,4,5.3,4,10c0,4,2.2,7,5,8.5V22h6v-3.5c2.8-1.5,5-4.5,5-8.5C20,5.3,16,2,12,2z" />
    <path d="M8,9a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v2a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V9z" />
  </svg>
);

export default SquidIcon;
