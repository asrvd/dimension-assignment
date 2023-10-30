"use client";

import { Dialog } from "@headlessui/react";
import Modal from "./ui/Modal";
import { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  Cross1Icon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import TaskEditor from "./TaskEditor";
import EditorToolbar from "./TaskEditor/Toolbar";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import SelectComponent from "./ui/Select";
import {
  taskStatusData,
  AssigneeData,
  PriorityData,
  LabelData,
  ProjectData,
} from "../lib/constants";
import MultiSelectComponent from "./ui/MultiSelect";
import { TagIcon } from "./icons/TagIcon";
import { CalendarPlusIcon } from "./icons/CalendarPlusIcon";
import { EnterIcon } from "./icons/EnterIcon";
import { useDebounce } from "@uidotdev/usehooks";
import { SparkleIcon } from "./icons/SparkleIcon";
import { LightningIcon } from "./icons/Lightning";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { SpinnerIcon } from "./icons/Spinner";
import { useRouter } from "next/navigation";

const taskCreationSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty!" }),
  description: z.string().min(1, { message: "Description cannot be empty!" }),
  status: z.enum([
    "todo",
    "in-progress",
    "done",
    "in-progress",
    "completed",
    "closed",
    "backlog",
  ]),
  assignees: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high", ""]),
  project: z.string(),
});

export default function TaskModal() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<string>("todo");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [priority, setPriority] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const debouncedTitle = useDebounce(title, 400);
  const [aiGeneratedLabels, setAiGeneratedLabels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notInteractingWithModal, setNotInteractingWithModal] =
    useState<boolean>(false);

  useEffect(() => {
    const getLables = async () => {
      let generatedLabels = [];
      if (debouncedTitle && debouncedTitle.length !== 0) {
        const response = await fetch(`api/label?text=${debouncedTitle}`);
        const data = await response.json();
        generatedLabels = data || [];
      }
      setAiGeneratedLabels(generatedLabels);
    };
    getLables();
  }, [debouncedTitle]);

  const createTask = async () => {
    setIsSubmitting(true);
    const taskCreationData = taskCreationSchema.safeParse({
      title,
      description: editor?.getHTML(),
      status,
      assignees,
      labels,
      priority,
      project,
    });

    if (taskCreationData.success) {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskCreationData.data),
      });

      const data = await response.json();
      toast.success("Task created successfully!");
      setIsSubmitting(false);
      reset();
      setShowModal(false);
      router.refresh();
    } else {
      setIsSubmitting(false);
      toast.error(
        JSON.parse(taskCreationData.error.message)[0].message as string
      );
    }
  };

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-zinc w-full min-w-full max-w-none focus:outline-none prose-headings:mb-2 prose-p:my-1",
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: "Describe this task",
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      TextStyle.configure({}),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
  });

  const reset = () => {
    setStatus("todo");
    setAssignees([]);
    setLabels([]);
    setPriority("");
    setProject("");
    setTitle("");
    editor?.commands.setContent("");
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="sticky top-0 lg:pt-24 pt-6 bg-white">
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        resetModal={reset}
        notInteractingWithModal={notInteractingWithModal}
      >
        <div className="flex flex-col gap-4">
          <Dialog.Title
            as="div"
            className="text-base flex justify-between items-center font-medium text-zinc-500"
          >
            <div className="flex gap-2 items-center">
              <h3 className="px-2 py-1.5 rounded-lg flex gap-1 items-center justify-center bg-zinc-100">
                <LightningIcon className="w-4 h-4 text-green-500" />
                Frontend
              </h3>
              <ChevronRightIcon className="w-4 h-4 inline-block" />
              <p>New Task</p>
            </div>
            <button
              type="button"
              className="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 p-2 rounded-md focus:outline-none text-center flex justify-center items-center"
              onClick={() => {
                setShowModal(false);
                reset();
              }}
            >
              <Cross1Icon className="w-4 h-4" />
            </button>
          </Dialog.Title>
          <div className="flex flex-col min-w-full">
            <input
              type="text"
              placeholder="Task title"
              className="text-lg font-medium outline-none bg-transparent p-2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="w-full max-h-[250px] scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-y-auto">
              <TaskEditor editor={editor} />
            </div>
          </div>
          {aiGeneratedLabels.length > 0 && (
            <div className="flex gap-2 justify-start w-full items-center px-2 animate-slideDown">
              <SparkleIcon className="w-5 h-5 text-gray-400 mr-2" />
              {aiGeneratedLabels.map((label) => (
                <button
                  className="flex rounded-lg border border-dashed border-zinc-300 hover:bg-zinc-100 items-center justify-center px-2 py-1 gap-1 font-medium  text-sm text-zinc-500"
                  key={label}
                  onClick={() => {
                    if (!labels.includes(label)) {
                      setLabels([...labels, label]);
                    }
                  }}
                >
                  {LabelData.find((l) => l.value === label)?.icon}
                  {LabelData.find((l) => l.value === label)?.label}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2 justify-start w-full items-center px-2">
            <SelectComponent
              selectionData={taskStatusData}
              selected={status}
              setSelected={setStatus}
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <MultiSelectComponent
              selectionData={AssigneeData}
              selected={assignees}
              setSelected={setAssignees}
              notSelectedIcon={<PersonIcon className="w-4 h-4" />}
              notSelectedLabel="Assignee"
              notSelectedValue="No assignees"
              selectFor="assignees"
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <SelectComponent
              selectionData={PriorityData}
              selected={priority}
              setSelected={setPriority}
              notSelectedLabel="Priority"
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <MultiSelectComponent
              selectionData={LabelData}
              selected={labels}
              setSelected={setLabels}
              notSelectedIcon={<TagIcon className="w-4 h-4" />}
              notSelectedLabel="Tags"
              notSelectedValue="No tags"
              selectFor="tags"
              align="right"
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <SelectComponent
              selectionData={ProjectData}
              selected={project}
              setSelected={setProject}
              notSelectedLabel="Project"
              align="right"
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <button className="flex py-1 px-2 rounded-lg border border-zinc-300 gap-1 items-center justify-center text-zinc-500 font-medium hover:bg-zinc-100 focus:outline-none text-sm min-w-max">
              <CalendarPlusIcon className="w-4 h-4" />
              <span className="hidden lg:block">Due Date</span>
            </button>
          </div>
          <div className="divider h-px border-t border-zinc-200 min-w-full -mx-6" />
          <div className="flex gap-4 items-center max-w-full justify-between">
            <EditorToolbar
              editor={editor}
              setNotInteractingWithModal={setNotInteractingWithModal}
            />
            <button
              type="button"
              className="flex w-full md:w-auto max-w-max justify-evenly items-center rounded-lg border border-transparent bg-[#533BE5] font-medium text-white hover:bg-[#523be5e7] focus:outline-none fancy-button divide-x divide-[#FFFFFF33]"
              onClick={createTask}
            >
              <span className="w-full text-center text-sm p-2">Create</span>
              <span className="p-2">
                {isSubmitting ? (
                  <SpinnerIcon className="w-5 h-5" />
                ) : (
                  <EnterIcon className="w-5 h-5 self-center font-bold" />
                )}
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex gap-4 justify-between items-center w-full p-2 bg-zinc-50 rounded-lg shaodw-sm border border-zinc-100 mb-4">
        <p className="font-medium text-sm flex gap-1 items-center">
          Frontend
          <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          Tasks
        </p>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-lg flex gap-1 px-2 p-1 items-center justify-center bg-zinc-200 shadow-sm border border-zinc-300/80 text-sm font-medium text-zinc-900 hover:bg-zinc-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          New Task
        </button>
      </div>
    </div>
  );
}
