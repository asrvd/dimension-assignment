"use client";

import type { Task } from "@prisma/client";
import { taskStatusData } from "../lib/constants";
import { SizeIcon } from "@radix-ui/react-icons";
import TaskView from "./Task";
import { useState } from "react";

const priorityIcons = {
  low: <span className="w-4 h-4 rounded-full bg-green-300" />,
  medium: <span className="w-4 h-4 rounded-full bg-yellow-300" />,
  high: <span className="w-4 h-4 rounded-full bg-red-300" />,
};

export default function TaskCard({ task }: { task: Task }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <div className="flex lg:flex-row flex-col gap-4 justify-between w-full p-2 bg-zinc-50 rounded-lg shaodw-sm border border-zinc-100">
      <TaskView
        showModal={showTaskModal}
        setShowModal={setShowTaskModal}
        task={task}
      />
      <div className="flex gap-1 justify-start items-center w-full lg:w-[80%]">
        <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max">
          {taskStatusData.find((status) => status.value === task.status)?.icon}
          <p className="capitalize">
            {
              taskStatusData.find((status) => status.value === task.status)
                ?.label
            }
          </p>
        </div>
        {task.priority === "" ? (
          <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max">
            <span className="w-4 h-4 rounded-full bg-zinc-300" />
            <p>No priority</p>
          </div>
        ) : (
          <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max">
            {priorityIcons[task.priority as keyof typeof priorityIcons]}
            <p className="capitalize">{task.priority}</p>
          </div>
        )}

        <p className="font-medium text-sm text-zinc-700 capitalize truncate">
          {task.title}
        </p>
      </div>
      <div className="flex gap-1 w-full lg:w-[30%] items-center justify-end">
        <span className="text-gray-500 font-medium text-sm">
          {Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(task.createdAt))}
        </span>
        <button
          className="text-center text-gray-500 hover:text-gray-600"
          onClick={() => setShowTaskModal(true)}
        >
          <SizeIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
