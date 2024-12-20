import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Grid, Text, Plane } from '@react-three/drei';
import { AxesHelper, Euler, TextureLoader , RepeatWrapping  } from 'three';
import grass from '../assets/grass.webp'
// Generate 20 random sensor positions within 10 x 10 area on the XY plane (Z = 0)
const generateSensors = () => {
  const sensors = [];
  for (let i = 0; i < 20; i++) {
    sensors.push([
      Math.random() * 10,  // Random X between 0 and 10
      Math.random() * 10,  // Random Y between 0 and 10
      0                    // Z = 0 (on the ground)
    ]);
  }
  return sensors;
};

const sensorPositions = generateSensors();

// Placeholder UAV paths (all at altitude Z = 10)
const tspKmeansPath = [
  [1, 2, 10],
  [3, 4, 10],
  [5, 6, 10],
  [7, 3, 10],
  [4, 1, 10],
];

const abcPath = [
  [1.5, 2.5, 10],
  [3.5, 4.5, 10],
  [5.5, 3.5, 10],
  [6.5, 2, 10],
  [4.5, 1.5, 10],
];

const scaBasedPath = [
  [1.2, 2.2, 10],
  [3.2, 4.2, 10],
  [5.2, 6.2, 10],
  [7.2, 3.2, 10],
  [4.2, 1.2, 10],
];

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
    <Sphere ref={uavRef} args={[0.15, 16, 16]} position={path[0]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

// Axis Labels Component for ZXY orientation
const AxisLabels = () => {
  return (
    <>
      <Text position={[10.5, 0, 0]} fontSize={0.5} color="blue">
        X
      </Text>
      <Text position={[0, 10.5, 0]} fontSize={0.5} color="green">
        Y
      </Text>
      <Text position={[0, 0, 10.5]} fontSize={0.5} color="red">
        Z
      </Text>
    </>
  );
};

const UAVPathAnimation = () => {

  const grassTexture  = useLoader(TextureLoader , grass) ; 
  // Repeat the texture for a larger terrain
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(4, 4);

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [15, 15, 15], up: [0, 0, 1], fov: 100 }}>
        {/* Lighting for better visualization */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        

        <OrbitControls makeDefault />

         {/* Ground Plane with Grass Texture */}
         <Plane args={[12, 12]}  position={[5, 5, 0]} receiveShadow>
            <meshStandardMaterial map={grassTexture} />
          </Plane>


        {/* Add Grid and Axes */}
        <Grid infiniteGrid args={[10, 10]} rotation={[Math.PI / 2, 0, 0]} />
        <primitive object={new AxesHelper(10)} rotation={new Euler(0, 0, Math.PI / 2)} />

        {/* Render Axis Labels */}
        <AxisLabels />

        {/* Render Sensors */}
        {sensorPositions.map((pos, index) => (
          <Sphere key={index} args={[0.2, 16, 16]} position={pos} castShadow>
            <meshStandardMaterial color="black" />
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
