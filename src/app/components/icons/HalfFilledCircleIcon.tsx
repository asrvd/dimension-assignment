import type { SVGProps } from "react";


export function HalfFilledCircleIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24ZM40 128a88.1 88.1 0 0 1 88-88v176a88.1 88.1 0 0 1-88-88Z"
      ></path>
    </svg>
  );
}