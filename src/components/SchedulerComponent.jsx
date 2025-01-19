import React, { useState } from "react";
import axios from "axios";

const SchedulerComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [maxTime, setMaxTime] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, name: "", priority: 0, duration: 0, deadline: 0 },
    ]);
  };

  const updateTask = (index, key, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [key]: value } : task
    );
    setTasks(updatedTasks);
  };

  const fetchSchedule = async () => {
    try {
      setError("");
      const response = await axios.post(
        "https://python-api-three-weld.vercel.app/schedule",
        {
          tasks,
          max_time: parseInt(maxTime),
        }
      );
      setSchedule(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">
        Task Scheduling Optimizer
      </h1>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Maximum Time (hours)
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          placeholder="Enter maximum time"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Tasks</h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-4 mb-2 bg-white shadow rounded-md flex gap-4"
          >
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-1/3"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => updateTask(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Priority"
              value={task.priority}
              onChange={(e) => updateTask(index, "priority", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Duration"
              value={task.duration}
              onChange={(e) => updateTask(index, "duration", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Deadline"
              value={task.deadline}
              onChange={(e) => updateTask(index, "deadline", e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={addTask}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>
      <button
        onClick={fetchSchedule}
        className="w-full p-2 bg-green-500 text-white font-bold rounded-md"
      >
        Optimize Schedule
      </button>
      {error && (
        <div className="mt-4 text-red-500 font-bold">
          Error: {error}
        </div>
      )}
      {schedule.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-2">Optimized Schedule</h2>
          <div className="space-y-2">
            {schedule.map((s, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded-md flex justify-between"
              >
                <span>Task ID: {s.task_id}</span>
                <span>
                  Time: {s.start_time} - {s.end_time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SchedulerComponent;
