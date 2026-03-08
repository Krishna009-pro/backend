import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';

const Scene = ({ onSelect }) => {
    return (
        <Canvas camera={{ position: [0, 20, 45], fov: 60 }}>
            <color attach="background" args={['#000000']} />

            <Suspense fallback={null}>
                <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.1} />
                <SolarSystem onSelect={onSelect} />
            </Suspense>

            <OrbitControls minDistance={10} maxDistance={200} enablePan={false} />
        </Canvas>
    );
};

export default Scene;
