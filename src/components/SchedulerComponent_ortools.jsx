import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";

const SchedulerComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [maxTime, setMaxTime] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState("");

  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: "", priority: 0, duration: 0, deadline: 0 },
    ]);
  };

  const updateTask = (index, key, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? { ...task, [key]: value } : task))
    );
  };

  const fetchSchedule = useCallback(async () => {
    console.log("Tasks before optimization:", tasks);
    console.log("MaxTime:", maxTime);
    try {
      setError("");
      const response = await axios.post(
        "https://python-api-three-weld.vercel.app/schedule",
        {
          tasks,
          max_time: parseInt(maxTime),
        }
      );
      const schedule = response.data;
      createGraph(schedule);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  }, [tasks, maxTime]);

  const createGraph = useCallback((schedule) => {
    const newNodes = schedule.map((task, index) => {
      const taskDetails = tasks.find((t) => t.id === task.task_id);

      if (!taskDetails) {
        console.error(`Task with ID ${task.task_id} not found in local tasks list.`);
        return null;
      }

      return {
        id: `task-${task.task_id}-${taskDetails.name.replace(/\s+/g, '-')}`,
        data: { label: `${taskDetails.name}` },
        position: { x: index * 200, y: 100 },
      };
    }).filter(Boolean);

    const newEdges = schedule.slice(1).map((task, index) => ({
      id: `edge-${index}`,
      source: `task-${schedule[index].task_id}-${tasks
        .find((t) => t.id === schedule[index].task_id)
        .name.replace(/\s+/g, '-')}`,
      target: `task-${task.task_id}-${tasks
        .find((t) => t.id === task.task_id)
        .name.replace(/\s+/g, '-')}`,
      animated: true,
      label: `Duration: ${task.end_time - task.start_time}h`,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [tasks, setNodes, setEdges]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Task Flow Visualization</h1>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Maximum Time (hours)</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring focus:ring-blue-300"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          placeholder="Enter maximum time"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-4 mb-2 bg-white shadow rounded-md flex gap-4 items-center"
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
              onChange={(e) => updateTask(index, "priority", Number(e.target.value))}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Duration"
              value={task.duration}
              onChange={(e) => updateTask(index, "duration", Number(e.target.value))}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Deadline"
              value={task.deadline}
              onChange={(e) => updateTask(index, "deadline", Number(e.target.value))}
            />
          </div>
        ))}
        <button
          onClick={addTask}
          className="p-3 bg-blue-600 text-white font-bold rounded-md shadow hover:bg-blue-700 transition w-full mt-4"
        >
          Add Task
        </button>
      </div>

      <button
        onClick={fetchSchedule}
        className="p-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition w-full mb-6"
      >
        Generate Optimized Task Flow
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-bold bg-red-100 p-3 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div style={{ width: "100%", height: "500px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <SchedulerComponent />
  </ReactFlowProvider>
);
