"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { GoalType } from "@/types";

interface GoalInputProps {
  goalType: GoalType;
}

const GoalInput: React.FC<GoalInputProps> = ({ goalType }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const { addGoal } = useStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGoal = {
      title,
      target,
      deadline,
      type: goalType,
      progress: 0,
    };

    await addGoal(newGoal);
    setTitle("");
    setTarget("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">
        Add {goalType} Goal
      </h2>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Goal Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="target">Target:</label>
          <input
            type="number"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalInput;