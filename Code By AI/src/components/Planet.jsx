import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Planet = ({ planet, onSelect }) => {
    const meshRef = useRef();
    const orbitRef = useRef();

    // Load texture
    const texture = useLoader(TextureLoader, planet.texture);

    useFrame((state, delta) => {
        // Rotation (Self)
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }

        // Orbit (Around Sun)
        if (orbitRef.current) {
            orbitRef.current.rotation.y += planet.speed;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        if (onSelect) onSelect(planet);
    };

    return (
        <group ref={orbitRef}>
            <mesh
                ref={meshRef}
                position={[planet.distance, 0, 0]}
                onClick={handleClick}
                onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                onPointerOut={() => { document.body.style.cursor = 'auto' }}
            >
                <sphereGeometry args={[planet.radius, 32, 32]} />
                <meshStandardMaterial map={texture} color={planet.color} />
                {planet.ring && (
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[planet.ring.innerRadius, planet.ring.outerRadius, 32]} />
                        <meshStandardMaterial map={useLoader(TextureLoader, planet.ring.texture)} side={2} transparent opacity={0.8} />
                    </mesh>
                )}
            </mesh>
        </group>
    );
};

export default Planet;
