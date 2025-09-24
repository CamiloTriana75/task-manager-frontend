import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import api from "../api/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get("/tasks/")
      .then((res) => setTasks(res.data))
      .catch(() => {
        // fallback dummy
        setTasks([
          { id: 1, title: "Demo", description: "Tarea de ejemplo", completed: false },
        ]);
      });
  }, []);

  const visible = tasks.filter((t) =>
    filter === "completed" ? t.completed : filter === "pending" ? !t.completed : true
  );

  const createTask = async (payload) => {
    try {
      const res = await api.post("/tasks/", payload);
      setTasks((prev) => [res.data, ...prev]);
    } catch {
      setTasks((prev) => [{ id: Date.now(), completed: false, ...payload }, ...prev]);
    }
  };

  const toggleTask = async (task) => {
    const updated = { ...task, completed: !task.completed };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    try {
      await api.patch(`/tasks/${task.id}/`, { completed: updated.completed });
    } catch {}
  };

  const editTask = async (task) => {
    // placeholder, UI para editar
  };

  const deleteTask = async (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    try {
      await api.delete(`/tasks/${task.id}/`);
    } catch {}
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${filter==='all'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFilter("all")}>All</button>
            <button className={`px-3 py-1 rounded ${filter==='completed'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFilter("completed")}>Completed</button>
            <button className={`px-3 py-1 rounded ${filter==='pending'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFilter("pending")}>Pending</button>
          </div>
        </div>

        <div className="grid gap-3">
          {visible.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-black text-white text-2xl"
      >
        +
      </button>
      <TaskModal open={open} onClose={() => setOpen(false)} onCreate={createTask} />
    </div>
  );
}


