"use client";

import { useState } from "react";
import Modal from "./ui/Modal";
import type { Task } from "@prisma/client";
import { Dialog } from "@headlessui/react";
import { Cross1Icon, PersonIcon } from "@radix-ui/react-icons";
import {
  taskStatusData,
  LabelData,
  ProjectData,
  AssigneeData,
  PriorityData,
} from "../lib/constants";
import { TagIcon } from "./icons/TagIcon";

export default function TaskView({
  showModal,
  setShowModal,
  task,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  task: Task;
}) {
  return (
    <Modal isOpen={showModal} setIsOpen={setShowModal}>
      <div className="flex flex-col gap-2 w-full">
        <Dialog.Title className="text-2xl flex gap-2 pb-2 justify-between items-center capitalize font-semibold text-zinc-900 border-b border-zinc-200">
          <p className="truncate">{task.title}</p>
          <button
            type="button"
            className="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 p-2 rounded-md focus:outline-none text-center flex justify-center items-center"
            onClick={() => setShowModal(false)}
          >
            <Cross1Icon className="w-4 h-4" />
          </button>
        </Dialog.Title>
        <div className="flex flex-col gap-2">
          <div
            className="task px-2 text-sm prose max-w-none text-gray-700 overflow-y-auto max-h-[300px] prose-headings:mb-2 prose-ul:my-2 prose-ol:my-2 prose-li:mb-1 prose-p:my-1 prose-pre:my-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent scrollbar-thumb-rounded-full"
            dangerouslySetInnerHTML={{ __html: task.description }}
          ></div>
        </div>
        <div className="flex flex-col gap-2 pt-2 justify-between items-center capitalize font-semibold text-zinc-900 border-t border-zinc-20 w-full">
          <div className="flex justify-between gap-2 w-full items-center">
            <div className="flex gap-2 justify-start items-center">
              <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium">
                {
                  taskStatusData.find((status) => status.value === task.status)
                    ?.icon
                }
                <p className="capitalize">
                  {
                    taskStatusData.find(
                      (status) => status.value === task.status
                    )?.label
                  }
                </p>
              </div>
              {task.priority === "" ? (
                <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium">
                  <span className="w-4 h-4 rounded-full bg-zinc-300" />
                  <p>No priority</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium">
                  {
                    PriorityData.find(
                      (priority) => priority.value === task.priority
                    )?.icon
                  }
                  <p className="capitalize">{task.priority}</p>
                </div>
              )}
              {task.project === "" ? (
                <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium">
                  <span className="w-4 h-4 rounded-full bg-zinc-300" />
                  <p>No project</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium">
                  {
                    ProjectData.find(
                      (project) => project.value === task.project
                    )?.icon
                  }
                  <p className="capitalize">{task.project}</p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Created:{" "}
              {Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(new Date(task.createdAt))}
            </p>
          </div>
          {task.labels.length > 0 && (
            <div className="flex gap-2 items-center justify-start w-full">
              <p className="text-xs text-gray-700 font-medium">
                <TagIcon className="w-4 h-4 inline-block mr-1" />
                Tags
              </p>
              <div className="flex gap-1">
                {task.labels.map((label) => (
                  <div
                    key={label}
                    className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium"
                  >
                    {
                      LabelData.find((labelData) => labelData.value === label)
                        ?.icon
                    }
                    <p className="capitalize">
                      {
                        LabelData.find((labelData) => labelData.value === label)
                          ?.label
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {task.assignees.length > 0 && (
            <div className="flex gap-2 items-center justify-start w-full">
              <p className="text-xs text-gray-700 font-medium">
                <PersonIcon className="w-4 h-4 inline-block mr-1" />
                Assignees
              </p>
              <div className="flex gap-1 font-medium">
                {task.assignees.map((assignee, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center bg-white border border-zinc-200 rounded-lg p-1 px-2 text-xs min-w-max font-medium"
                  >
                    {
                      AssigneeData.find(
                        (assigneeData) => assigneeData.value === assignee
                      )?.icon
                    }
                    <p className="capitalize">
                      {
                        AssigneeData.find(
                          (assigneeData) => assigneeData.value === assignee
                        )?.label
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
