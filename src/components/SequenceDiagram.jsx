import React, { useEffect, useState } from 'react';
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultLinkModel,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-diagrams';

const SequenceDiagram = () => {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    // Create the engine and model
    const newEngine = createEngine();
    const model = new DiagramModel();

    // Create the "User" node
    const userNode = new DefaultNodeModel({
      name: 'User',
      color: 'rgb(192,255,0)',
    });
    userNode.setPosition(50, 100);
    const userPort = userNode.addOutPort('Choisir fichier DXF()');

    // Create the "Système" node
    const systemNode = new DefaultNodeModel({
      name: 'Système',
      color: 'rgb(0,192,255)',
    });
    systemNode.setPosition(400, 100);
    const systemPort = systemNode.addInPort('Fichier DXF lu()');

    // Create the link between "User" and "Système"
    const link = userPort.link(systemPort);

    // Add everything to the model
    model.addAll(userNode, systemNode, link);

    // Set the model to the engine
    newEngine.setModel(model);
    setEngine(newEngine);
  }, []);

  if (!engine) {
    return <div>Loading diagram...</div>;
  }

  return (
    <div
      className="w-full h-screen bg-gray-100"
      style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
    >
      <CanvasWidget engine={engine} />
    </div>
  );
};

export default SequenceDiagram;
