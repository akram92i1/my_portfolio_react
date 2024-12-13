// src/components/UAVPathAnimation.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Grid } from '@react-three/drei';
import { AxesHelper } from 'three';

// Placeholder sensor positions for different approaches
const tspKmeansPath = [
  [0, 0, 3],
  [2, 1, 3],
  [4, 2, 3],
  [6, 0, 3],
  [8, -1, 3],
];

const abcPath = [
  [0, 0, 3],
  [1, 2, 3],
  [3, 1, 3],
  [5, 0, 3],
  [7, -2, 3],
];

const scaBasedPath = [
  [0, 0, 3],
  [2, 0, 3],
  [4, 1, 3],
  [6, -1, 3],
  [8, 0, 3],
];

// Generate 20 random sensor positions with z = 0
const generateSensors = () => {
  const sensors = [];
  for (let i = 0; i < 20; i++) {
    sensors.push([
      (Math.random() * 10) - 5, // Random x between -5 and 5
      (Math.random() * 5) - 2.5, // Random y between -2.5 and 2.5
      0, // z = 0
    ]);
  }
  return sensors;
};

const sensorPositions = generateSensors();

// UAV component that follows the path
const UAV = ({ path, color }) => {
  const uavRef = useRef();
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const speed = 0.02;

  useFrame(() => {
    if (currentPointIndex < path.length) {
      const target = path[currentPointIndex];
      uavRef.current.position.lerp(
        { x: target[0], y: target[1], z: target[2] },
        speed
      );

      if (
        uavRef.current.position.distanceTo(
          { x: target[0], y: target[1], z: target[2] }
        ) < 0.1
      ) {
        setTimeout(() => {
          setCurrentPointIndex((prev) => prev + 1);
        }, 500);
      }
    }
  });

  return (
    <Sphere ref={uavRef} args={[0.1, 16, 16]} position={path[0]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

const UAVPathAnimation = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />

        {/* Add Grid and Axes */}
        <Grid infiniteGrid rotation={[Math.PI / 2, 0, 0]} />
        <primitive object={new AxesHelper(5)} />

        {/* Render Sensors */}
        {sensorPositions.map((pos, index) => (
          <Sphere key={index} args={[0.08, 16, 16]} position={pos}>
            <meshStandardMaterial color="yellow" />
          </Sphere>
        ))}

        {/* Render Paths */}
        <Line points={tspKmeansPath} color="blue" dashed lineWidth={2} />
        <Line points={abcPath} color="green" lineWidth={2} />
        <Line points={scaBasedPath} color="red" lineWidth={2} />

        {/* Render UAVs */}
        <UAV path={tspKmeansPath} color="blue" />
        <UAV path={abcPath} color="green" />
        <UAV path={scaBasedPath} color="red" />
      </Canvas>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-3 rounded shadow-md">
        <h3 className="font-bold mb-2">Legend</h3>
        <ul>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 inline-block mr-2"></span>
            TSP-Kmeans (Dashed Line)
          </li>
          <li className="flex items-center mt-1">
            <span className="w-4 h-4 bg-green-500 inline-block mr-2"></span>
            ABC (Solid Line)
          </li>
          <li className="flex items-center mt-1">
            <span className="w-4 h-4 bg-red-500 inline-block mr-2"></span>
            SCA-Based Approach (Solid Line)
          </li>
          <li className="flex items-center mt-1">
            <span className="w-4 h-4 bg-purple-500 inline-block mr-2"></span>
            Sensors
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UAVPathAnimation;
