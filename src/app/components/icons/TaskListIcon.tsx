import type { SVGProps } from "react";

export function TaskListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.854 4.354a.5.5 0 1 0-.708-.708L3.5 5.293l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2ZM8.5 5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9Zm0 5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM8 15.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5ZM5.854 9.854a.5.5 0 1 0-.708-.708L3.5 10.793l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2Zm0 4.292a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647l1.646-1.647a.5.5 0 0 1 .708 0Z"
      ></path>
    </svg>
  );
}
