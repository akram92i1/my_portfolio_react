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
  const [tasks, setTasks] = useState([
    { id: 1, name: "Prepare Project Report", priority: 3, duration: 4, deadline: 12 },
    { id: 2, name: "Team Meeting", priority: 5, duration: 2, deadline: 8 },
    { id: 3, name: "Code Review", priority: 4, duration: 3, deadline: 10 },
    { id: 4, name: "Client Presentation", priority: 2, duration: 6, deadline: 15 },
    { id: 5, name: "System Backup", priority: 1, duration: 5, deadline: 20 },
    { id: 6, name: "Develop Feature X", priority: 4, duration: 3, deadline: 9 },
  ]);
  const [maxTime, setMaxTime] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState("");

  const fetchSchedule = useCallback(async () => {
    try {
      // setError("");
      // const response = await axios.post(
      //   "https://python-api-three-weld.vercelsssss.app/schedule",
      //   {
      //     tasks,
      //     max_time: parseInt(maxTime),
      //   }
      // );
      const schedule = tasks;
      createGraph(schedule);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  }, [tasks, maxTime]);

  const createGraph = useCallback((schedule) => {
    // Create nodes for tasks
    const newNodes = schedule.map((task, index) => {
      const taskDetails = tasks.find((t) => t.id === task.task_id);
      if (!taskDetails) {
        console.error(`Task with ID ${task.task_id} not found in local tasks list.`);
        return null;
      }
  
      return {
        data: { label: `${tasks.find((t) => t.id === task.task_id).name}` }, // Use task_id for consistent IDs
        position: { x: index * 200, y: 100 }, // Position nodes sequentially
      };
    }).filter(Boolean); // Remove any null values caused by missing tasks
  
    // Create edges based on task dependencies (sequential flow)
    const newEdges = schedule.slice(1).map((task, index) => ({
      id: `edge-${index}`,
      source: `task-${schedule[index].task_id}`, // Use task_id for source
      target: `task-${task.task_id}`, // Use task_id for target
      animated: true,
      label: `Duration: ${task.end_time - task.start_time}h`, // Use duration from schedule
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
              onChange={(e) =>
                setTasks((prevTasks) =>
                  prevTasks.map((t, i) => (i === index ? { ...t, name: e.target.value } : t))
                )
              }
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Priority"
              value={task.priority}
              onChange={(e) =>
                setTasks((prevTasks) =>
                  prevTasks.map((t, i) =>
                    i === index ? { ...t, priority: Number(e.target.value) } : t
                  )
                )
              }
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Duration"
              value={task.duration}
              onChange={(e) =>
                setTasks((prevTasks) =>
                  prevTasks.map((t, i) =>
                    i === index ? { ...t, duration: Number(e.target.value) } : t
                  )
                )
              }
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-1/5"
              placeholder="Deadline"
              value={task.deadline}
              onChange={(e) =>
                setTasks((prevTasks) =>
                  prevTasks.map((t, i) =>
                    i === index ? { ...t, deadline: Number(e.target.value) } : t
                  )
                )
              }
            />
          </div>
        ))}
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
