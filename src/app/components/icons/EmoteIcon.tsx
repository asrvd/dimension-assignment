import type { SVGProps } from "react";


export function EmoteIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88ZM80 108a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm72 0a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm24.5 48a56 56 0 0 1-97 0a8 8 0 1 1 13.8-8a40.1 40.1 0 0 0 69.4 0a8 8 0 0 1 13.8 8Z"
      ></path>
    </svg>
  );
}