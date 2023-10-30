/* eslint-disable @next/next/no-img-element */
import { CircleIcon } from "../components/icons/CircleIcon";
import { CrossCircleIcon } from "../components/icons/CrossCircleIcon";
import { CheckedCircleIcon } from "../components/icons/CheckedCircleIcon";
import { HalfFilledCircleIcon } from "../components/icons/HalfFilledCircleIcon";
import { DashedCircleIcon } from "../components/icons/DashedCircleIcon";
import { FlagIcon } from "../components/icons/FlagIcon";
import { ProjectIcon } from "../components/icons/ProjectIcon";
import { CloudIcon } from "../components/icons/CloudIcon";
import { GlobeIcon } from "../components/icons/GlobeIcon";

export const taskStatusData = [
  {
    label: "Backlog",
    icon: <DashedCircleIcon className="w-4 h-4" />,
    value: "backlog",
  },
  {
    label: "Todo",
    icon: <CircleIcon className="w-4 h-4" />,
    value: "todo",
  },
  {
    label: "In Progress",
    icon: <HalfFilledCircleIcon className="w-4 h-4" />,
    value: "in-progress",
  },
  {
    label: "Completed",
    icon: <CheckedCircleIcon className="w-4 h-4" />,
    value: "completed",
  },
  {
    label: "Closed",
    icon: <CrossCircleIcon className="w-4 h-4" />,
    value: "closed",
  },
];

export const AssigneeData = [
  {
    label: "Siddharth",
    value: "siddharth",
    icon: (
      <img
        src="https://avatar.vercel.sh/siddharth.svg"
        alt="Avatar for Siddharth"
        className="w-4 h-4 rounded-full"
      />
    ),
  },
  {
    label: "Ashish",
    value: "ashish",
    icon: (
      <img
        src="https://avatar.vercel.sh/ashish.svg"
        alt="Avatar for Ashish"
        className="w-4 h-4 rounded-full"
      />
    ),
  },
  {
    label: "Megan",
    value: "megan",
    icon: (
      <img
        src="https://avatar.vercel.sh/megan.svg"
        alt="Avatar for Megan"
        className="w-4 h-4 rounded-full"
      />
    ),
  },
];

export const PriorityData = [
  {
    label: "No priority",
    value: "",
    icon: <FlagIcon className="w-4 h-4" />,
  },
  {
    label: "Low",
    value: "low",
    icon: <span className="w-4 h-4 rounded-full bg-green-300" />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <span className="w-4 h-4 rounded-full bg-yellow-300" />,
  },
  {
    label: "High",
    value: "high",
    icon: <span className="w-4 h-4 rounded-full bg-red-300" />,
  },
];

export const LabelData = [
  {
    label: "Bug",
    value: "bug",
    icon: <span className="w-4 h-4 rounded-full bg-red-300" />,
  },
  {
    label: "Feature",
    value: "feature",
    icon: <span className="w-4 h-4 rounded-full bg-green-300" />,
  },
  {
    label: "Improvement",
    value: "improvement",
    icon: <span className="w-4 h-4 rounded-full bg-yellow-300" />,
  },
  {
    label: "Documentation",
    value: "documentation",
    icon: <span className="w-4 h-4 rounded-full bg-blue-300" />,
  },
  {
    label: "Duplicate",
    value: "duplicate",
    icon: <span className="w-4 h-4 rounded-full bg-gray-300" />,
  },
  {
    label: "Web",
    value: "web",
    icon: <GlobeIcon className="w-4 h-4 text-indigo-400" />,
  },
  {
    label: "Cloud",
    value: "cloud",
    icon: <CloudIcon className="w-4 h-4 text-sky-300" />,
  },
  {
    label: "Performance",
    value: "performance",
    icon: <span className="w-4 h-4 rounded-full bg-orange-300" />,
  },
];

export const ProjectData = [
  {
    label: "No project",
    value: "",
    icon: <ProjectIcon className="w-4 h-4" />,
  },
  {
    label: "Project 1",
    value: "project-1",
    icon: <ProjectIcon className="w-4 h-4" />,
  },
  {
    label: "Project 2",
    value: "project-2",
    icon: <ProjectIcon className="w-4 h-4" />,
  },
  {
    label: "Project 3",
    value: "project-3",
    icon: <ProjectIcon className="w-4 h-4" />,
  },
  {
    label: "Project 4",
    value: "project-4",
    icon: <ProjectIcon className="w-4 h-4" />,
  },
];
