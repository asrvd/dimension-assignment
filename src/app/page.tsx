import TaskModal from "./components/TaskModal";
import { prisma } from "./lib/db";
import TaskCard from "./components/TaskCard";

async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks;
}

async function Tasks() {
  const tasks = await getTasks();
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen relative bg-white min-w-screen flex-col items-center justify-between px-6 lg:px-24 pb-6 lg:pb-24">
      <section className="flex flex-col lg:w-2/3 w-full h-full relative bg-white">
        <TaskModal />
        <Tasks />
      </section>
    </main>
  );
}
