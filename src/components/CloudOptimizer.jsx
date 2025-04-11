import React, { useState, useCallback } from "react";
import axios from "axios";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    ReactFlowProvider,
    Panel,
    Handle,
    Position
  } from "reactflow";
import "reactflow/dist/style.css";

// Custom node types
const nodeTypes = {
    clusterNode: ClusterNodeComponent,
    containerNode: ContainerNodeComponent,
  };

// Custom node components
function ContainerNodeComponent({ data }) {
  return (
    <div className={`p-3 rounded-lg shadow-md ${data.assigned ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 border-2 border-gray-400'}`}>
      <div className="font-semibold text-center">{data.label}</div>
      <div className="mt-1 text-xs">
        <div className="flex justify-between">
          <span>CPU:</span>
          <span>{data.cpu} cores</span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span>{data.memory} GB</span>
        </div>
        {data.assigned && (
          <div className="mt-1 text-xs text-green-700 font-semibold text-center">
            Assigned to: {data.assignedTo}
          </div>
        )}
      </div>

      {/* Source handle for connections */}
      <Handle type="source" position={Position.Right} id="source" />
    </div>
  );
}

function ClusterNodeComponent({ data }) {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-blue-50 border-2 border-blue-500">
      <div className="font-bold text-center text-blue-700">{data.label}</div>
      <div className="mt-2 text-sm">
        <div className="flex justify-between">
          <span>CPU:</span>
          <span>{data.cpu} cores</span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span>{data.memory} GB</span>
        </div>
      </div>
      
      {/* Target handle for connections */}
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
}


  const K8sOptimizerInterface = () => {
    // State for nodes and containers
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    
    // Form state
    const [nodeName, setNodeName] = useState("");
    const [nodeCpu, setNodeCpu] = useState(8);
    const [nodeMemory, setNodeMemory] = useState(32);
    
    const [containerName, setContainerName] = useState("");
    const [containerCpu, setContainerCpu] = useState(1);
    const [containerMemory, setContainerMemory] = useState(2);
    
    // Results state
    const [optimizationResults, setOptimizationResults] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [error, setError] = useState("");
    
    const runOptimization = useCallback(async () => {
      const clusterNodes = nodes.filter(node => node.type === "clusterNode");
      const containers = nodes.filter(node => node.type === "containerNode");
    
      if (clusterNodes.length === 0) {
        setError("Please add at least one node to your cluster");
        return;
      }
    
      if (containers.length === 0) {
        setError("Please add at least one container to optimize");
        return;
      }
    
      setIsOptimizing(true);
      setError("");
    
      try {
        // Format data for the API
        const apiData = {
          nodes: clusterNodes.map(node => ({
            name: node.data.label,
            cpuCapacity: node.data.cpu,
            memoryCapacity: node.data.memory
          })),
          containers: containers.map(container => ({
            name: container.data.label,
            cpuRequirement: container.data.cpu,
            memoryRequirement: container.data.memory
          }))
        };
    
        // Call your Docker API - replace with your actual endpoint
        const response = await axios.post(
          "http://localhost:8080/api/deploy",  // UPDATE URL TO DEPLOYED API IF NEEDED
          apiData,
          { headers: { "Content-Type": "application/json" } }
        );

        // Check if response is valid
        if (!response.data) {
          throw new Error("Empty response from API");
        }
        
        // Handle the optimization results
        const results = response.data;
        console.log("here is the data that we have set in the array", results); 
        setOptimizationResults(results);
    
        // ✅ Define updatedNodes FIRST
        const updatedNodes = nodes.map(node => {
          if (node.type !== 'containerNode') return node;
        
          // Ensure `results.optimizedPlacement` exists
           // Convert optimizedPlacement from object to array of key-value pairs
          const assignment = Object.entries(results?.optimizedPlacement || {}).find(
            ([containerName]) => containerName === node.data.label
          );
        
          if (assignment) {
            return {
              ...node,
              data: {
                ...node.data,
                assigned: true,
                assignedTo: assignment[1] // Assign the node name
              }
            };
          }
          return node;
        });
        
    
        // ✅ Now updatedNodes is defined before using it
        // Create edges between containers and their assigned nodes
        console.log("🔍 Updated Nodes:", updatedNodes);
        console.log("🔍 API Optimized Placement:", results.optimizedPlacement);
        const newEdges = []
        for (const containerName in results.optimizedPlacement || {}) {
          const nodeName = results.optimizedPlacement[containerName];
        
          console.log(`🔍 Processing: ${containerName} → ${nodeName}`);
        
          const container = updatedNodes.find(
            n => n.type === "containerNode" && n.data.label === containerName
          );
          const node = updatedNodes.find(
            n => n.type === "clusterNode" && n.data.label.includes(nodeName) // Match substrings
          );
        
          if (container?.id && node?.id) {
            newEdges.push({
              id: `edge-${container.id}-${node.id}`,
              source: container.id,
              target: node.id,
              animated: true,
              style: { stroke: "#10b981", strokeWidth: 2 },
            });
          } else {
            console.warn(`⚠️ Skipping edge for ${containerName} → ${nodeName}`);
          }
        }
        
        console.log("✅ Final Edges:", newEdges);
        setNodes(updatedNodes);
        setEdges(newEdges);
    
      } catch (err) {
        console.error("Optimization error:", err);
        setError(err.response?.data?.message || "Failed to run optimization");
      } finally {
        setIsOptimizing(false);
      }
    }, [nodes, setNodes, setEdges]);
     

    // Add a new node to the cluster
    const addNode = useCallback(() => {
      if (!nodeName) {
        setError("Please provide a node name");
        return;
      }

      // runOptimization function 

      
      // Check for duplicate node name
      if (nodes.some(n => n.data.label === nodeName && n.type === 'clusterNode')) {
        setError("A node with this name already exists");
        return;
      }
      
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'clusterNode',
        position: { 
          x: Math.random() * 400, 
          y: 100 
        },
        data: { 
          label: nodeName,
          cpu: nodeCpu,
          memory: nodeMemory 
        }
      };
      
      setNodes(nodes => [...nodes, newNode]);
      setNodeName("");
      setError("");
    }, [nodeName, nodeCpu, nodeMemory, nodes, setNodes]);
    
    // Add a new container (microservice)
    const addContainer = useCallback(() => {
      if (!containerName) {
        setError("Please provide a container name");
        return;
      }
      
      // Check for duplicate container name
      if (nodes.some(n => n.data.label === containerName && n.type === 'containerNode')) {
        setError("A container with this name already exists");
        return;
      }
      
      const newContainer = {
        id: `container-${Date.now()}`,
        type: 'containerNode',
        position: { 
          x: Math.random() * 400 + 500, 
          y: 100 + Math.random() * 300 
        },
        data: { 
          label: containerName,
          cpu: containerCpu,
          memory: containerMemory,
          assigned: false
        }
      };
      
      setNodes(nodes => [...nodes, newContainer]);
      setContainerName("");
      setError("");
    }, [containerName, containerCpu, containerMemory, nodes, setNodes]);
    
    // Run the optimization algorithm
    
    // Reset the optimization results and graph
    const resetOptimization = useCallback(() => {
      // Clear assigned status from containers
      const resetNodes = nodes.map(node => {
        if (node.type === 'containerNode') {
          return {
            ...node,
            data: {
              ...node.data,
              assigned: false,
              assignedTo: null
            }
          };
        }
        return node;
      });
      
      setNodes(resetNodes);
      setEdges([]);
      setOptimizationResults(null);
      setError("");
    }, [nodes, setNodes, setEdges]);
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
            Kubernetes Deployment Optimizer
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Node form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add Cluster Node</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Node Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="e.g., worker-1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPU Capacity (cores)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={nodeCpu}
                    onChange={(e) => setNodeCpu(Number(e.target.value))}
                    min="1"
                    step="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memory Capacity (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={nodeMemory}
                    onChange={(e) => setNodeMemory(Number(e.target.value))}
                    min="1"
                    step="1"
                  />
                </div>
                
                <button
                  onClick={addNode}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Add Node
                </button>
              </div>
            </div>
            
            {/* Container form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add Container</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Container Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                    placeholder="e.g., frontend"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPU Requirement (cores)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={containerCpu}
                    onChange={(e) => setContainerCpu(Number(e.target.value))}
                    min="0.1"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memory Requirement (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={containerMemory}
                    onChange={(e) => setContainerMemory(Number(e.target.value))}
                    min="0.1"
                    step="0.1"
                  />
                </div>
                
                <button
                  onClick={addContainer}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                >
                  Add Container
                </button>
              </div>
            </div>
            
            {/* Optimization controls */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Optimization</h2>
              
              <div className="space-y-4">
                <button
                  onClick={runOptimization}
                  disabled={isOptimizing}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition disabled:bg-purple-300"
                >
                  {isOptimizing ? "Optimizing..." : "Run Simulated Annealing"}
                </button>
                
                <button
                  onClick={resetOptimization}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                >
                  Reset Optimization
                </button>
                
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
                    {error}
                  </div>
                )}
                
                {optimizationResults?.optimizedScore !== undefined ? (
                    <p>Score: {optimizationResults.optimizedScore.toFixed(2)}</p>
                  ) : (
                    <p>Score: Not available</p>
                  )}
              </div>
            </div>
          </div>
          
          {/* Flow diagram */}
          <div className="bg-white p-4 rounded-xl shadow-lg h-96 md:h-[600px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
              <Panel position="top-right">
                <div className="bg-white p-2 rounded shadow-md text-xs">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Cluster Nodes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Assigned Containers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <span>Unassigned Containers</span>
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
          
          {/* Results details */}
          {optimizationResults && (
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Detailed Placement Results</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Container</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Node</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(optimizationResults?.optimizedPlacement || {}).map(([containerName, nodeName], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{containerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nodeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nodes.find(n => n.type === 'containerNode' && n.data.label === containerName)?.data.cpu || "N/A"} cores
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nodes.find(n => n.type === 'containerNode' && n.data.label === containerName)?.data.memory || "N/A"} GB
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {optimizationResults.nodeUtilization && optimizationResults.nodeUtilization.map((node, idx) => (
                  <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">{node.nodeName}</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU Usage:</span>
                          <span>{node.cpuUsed.toFixed(1)}/{node.cpuCapacity} cores ({(node.cpuUsed/node.cpuCapacity*100).toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${node.cpuUsed/node.cpuCapacity > 0.9 ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{ width: `${Math.min(100, node.cpuUsed/node.cpuCapacity*100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory Usage:</span>
                          <span>{node.memoryUsed.toFixed(1)}/{node.memoryCapacity} GB ({(node.memoryUsed/node.memoryCapacity*100).toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${node.memoryUsed/node.memoryCapacity > 0.9 ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{ width: `${Math.min(100, node.memoryUsed/node.memoryCapacity*100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const CloudOptimizer = () => (
    <ReactFlowProvider>
      <K8sOptimizerInterface />
    </ReactFlowProvider>
  );
  
  export default CloudOptimizer;
