import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Sun = () => {
    const sunTexture = useLoader(TextureLoader, '/textures/sun.png');

    return (
        <group>
            <pointLight intensity={1.5} decay={0} distance={100} color="white" />
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial
                    map={sunTexture}
                    emissiveMap={sunTexture}
                    emissiveIntensity={0.6}
                    emissive="orange"
                />
            </mesh>
        </group>
    );
};

export default Sun;
