import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
  useStoreApi,
  useReactFlow,
} from "reactflow";
import { PlusIcon, ClockIcon, ChartBarIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

import 'reactflow/dist/style.css';

const MIN_DISTANCE = 150;

const SchedulerComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [maxTime, setMaxTime] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const store = useStoreApi();
  const { getInternalNode } = useReactFlow();

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
      createGraph(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  };

  const createGraph = (scheduleData) => {
    const newNodes = scheduleData.map((task, index) => ({
      id: `task-${task.task_id}`,
      data: { label: `Task ${task.task_id}` },
      position: { x: index * 150, y: 100 },
    }));

    const newEdges = scheduleData.slice(1).map((task, index) => ({
      id: `edge-${index}`,
      source: `task-${scheduleData[index].task_id}`,
      target: `task-${task.task_id}`,
      label: `Duration: ${task.end_time - task.start_time}h`,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const getClosestEdge = useCallback((node) => {
    const { nodeLookup } = store.getState();
    const internalNode = getInternalNode(node.id);

    const closestNode = Array.from(nodeLookup.values()).reduce(
      (res, n) => {
        if (n.id !== internalNode.id) {
          const dx =
            n.internals.positionAbsolute.x -
            internalNode.internals.positionAbsolute.x;
          const dy =
            n.internals.positionAbsolute.y -
            internalNode.internals.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      }
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.internals.positionAbsolute.x <
      internalNode.internals.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${closestNode.node.id}-${node.id}`
        : `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, []);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          closeEdge.className = "temp";
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge]
  );

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 shadow-md p-4 bg-white rounded-lg flex justify-center items-center">
          <ChartBarIcon className="h-8 w-8 text-green-600 mr-2" />
          Task Scheduling Optimizer
        </h1>
      </header>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          <ClockIcon className="h-5 w-5 inline-block text-blue-500 mr-2" />
          Maximum Time (hours)
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring focus:ring-blue-300"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          placeholder="Enter maximum time"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <PlusIcon className="h-6 w-6 text-green-500 mr-2" />
          Tasks
        </h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-white shadow-lg rounded-lg flex gap-4"
          >
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-blue-300"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => updateTask(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg w-1/5 focus:ring focus:ring-blue-300"
              placeholder="Priority"
              value={task.priority}
              onChange={(e) => updateTask(index, "priority", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg w-1/5 focus:ring focus:ring-blue-300"
              placeholder="Duration"
              value={task.duration}
              onChange={(e) => updateTask(index, "duration", e.target.value)}
            />
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg w-1/5 focus:ring focus:ring-blue-300"
              placeholder="Deadline"
              value={task.deadline}
              onChange={(e) => updateTask(index, "deadline", e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={addTask}
          className="mt-2 p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      <button
        onClick={fetchSchedule}
        className="w-full p-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition mb-6 flex justify-center items-center"
      >
        Optimize Schedule
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-bold bg-red-100 p-3 rounded-lg shadow-md flex items-center">
          <ExclamationCircleIcon className="h-6 w-6 mr-2" />
          {error}
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            Schedule Visualization
          </h2>
          <div style={{ width: "100%", height: "500px" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeDrag={onNodeDrag}
              onNodeDragStop={onNodeDragStop}
              style={{ backgroundColor: "#F7F9FB" }}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <SchedulerComponent />
  </ReactFlowProvider>
);
