import React from 'react';
import { planetData } from '../data/planetData';
import Planet from './Planet';
import Sun from './Sun';

const SolarSystem = ({ onSelect }) => {
    return (
        <group>
            <Sun />
            {planetData.map((planet) => (
                <Planet key={planet.name} planet={planet} onSelect={onSelect} />
            ))}
        </group>
    );
};

export default SolarSystem;
