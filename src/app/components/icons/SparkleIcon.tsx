import type { SVGProps } from "react";

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M208.9 144a15.8 15.8 0 0 1-10.5 15l-52.2 19.2l-19.2 52.2a16 16 0 0 1-30 0l-19.2-52.2L25.6 159a16 16 0 0 1 0-30l52.2-19.2L97 57.6a16 16 0 0 1 30 0l19.2 52.2l52.2 19.2a15.8 15.8 0 0 1 10.5 15ZM152 48h16v16a8 8 0 0 0 16 0V48h16a8 8 0 0 0 0-16h-16V16a8 8 0 0 0-16 0v16h-16a8 8 0 0 0 0 16Zm88 32h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16Z"
      ></path>
    </svg>
  );
}
