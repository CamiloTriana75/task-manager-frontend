import React from "react";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-start justify-between">
      <div>
        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onToggle(task)} className="btn">✓</button>
        <button onClick={() => onEdit(task)} className="btn">✎</button>
        <button onClick={() => onDelete(task)} className="btn">🗑</button>
      </div>
    </div>
  );
}


