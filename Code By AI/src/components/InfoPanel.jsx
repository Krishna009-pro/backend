import React from 'react';

const InfoPanel = ({ planet, onClose }) => {
    if (!planet) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '300px',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Inter, sans-serif'
        }}>
            <h2 style={{ marginTop: 0, fontSize: '24px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
                {planet.name}
            </h2>

            <div style={{ marginTop: '15px' }}>
                <p><strong>Diameter:</strong> {planet.info.diameter}</p>
                <p><strong>Avg Temp:</strong> {planet.info.temp}</p>
                <p style={{ lineHeight: '1.5', color: '#ccc' }}>
                    {planet.info.description}
                </p>
            </div>

            <button
                onClick={onClose}
                style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    background: '#444',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Close
            </button>
        </div>
    );
};

export default InfoPanel;
