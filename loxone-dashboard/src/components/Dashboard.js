// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'; 
import loxoneService from '../services/loxoneService';

const Dashboard = () => {
    const [lightStatus, setLightStatus] = useState('off');
    const [connectionStatus, setConnectionStatus] = useState('connecting');

    useEffect(() => {
        const initializeService = async () => {
            let retries = 3;
            while (retries > 0) {
                try {
                    await loxoneService.init();
                    setConnectionStatus('connected');
                    return;
                } catch (error) {
                    console.error("Initialization failed:", error);
                    retries -= 1;
                    if (retries > 0) {
                        console.log(`Retrying... (${3 - retries}/3)`);
                        await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds
                    } else {
                        setConnectionStatus('failed');
                    }
                }
            }
        };

        initializeService();

        return () => {
            if (loxoneService.connection) {
                loxoneService.connection.disconnect();
                console.log("Service disconnected");
            }
        };
    }, []);

    const toggleLight = async () => {
        if (connectionStatus !== 'connected') {
            console.warn("Service not connected");
            return;
        }

        try {
            await loxoneService.toggleLight();
            const status = await loxoneService.getLightStatus();
            const validStatuses = ['on', 'off'];
            setLightStatus(validStatuses.includes(status) ? status : 'unknown');
        } catch (error) {
            console.error("Failed to toggle light:", error);
            setLightStatus('error');
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Loxone Dashboard</h1>
            {connectionStatus === 'connecting' && <p>Connecting...</p>}
            {connectionStatus === 'failed' && <p>Failed to connect. Please check your connection.</p>}
            {connectionStatus === 'connected' && (
                <>
                    <div className={`status-indicator ${lightStatus === 'on' ? 'status-on' : 'status-off'}`}>
                        {lightStatus === 'on' ? 'Light On' : 'Light Off'}
                    </div>
                    <button className="toggle-button" onClick={toggleLight}>
                        Toggle Light
                    </button>
                </>
            )}
        </div>
    );
};

export default Dashboard;
