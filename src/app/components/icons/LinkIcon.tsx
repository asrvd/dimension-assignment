import type { SVGProps } from "react";

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
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
        d="m208.6 118.1l-28.3 28.3a50.1 50.1 0 0 1-70.7 0a6 6 0 0 1 8.5-8.5a38 38 0 0 0 53.7 0l28.3-28.3a38 38 0 1 0-53.7-53.7l-19.8 19.8a6 6 0 0 1-8.5-8.5l19.8-19.8a49.9 49.9 0 0 1 70.7 0a50 50 0 0 1 0 70.7Zm-79.2 62.2l-19.8 19.8a38 38 0 0 1-53.7-53.7l28.3-28.3a38 38 0 0 1 53.7 0a6 6 0 0 0 8.5-8.5a50 50 0 0 0-70.7 0l-28.3 28.3a50 50 0 0 0 0 70.7a50.1 50.1 0 0 0 70.7 0l19.8-19.8a6 6 0 0 0-8.5-8.5Z"
      ></path>
    </svg>
  );
}
