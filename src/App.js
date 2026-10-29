import React, { useState, useEffect } from 'react';
import { aeNetworkBridge } from './aeNetBridge';

function App() {
  const [networkStatus, setNetworkStatus] = useState('UNBOUND');

  useEffect(() => {
    // Ping the Unbound Oracle on initial load
    aeNetworkBridge.broadcastTelemetry({ nodeAction: 'App Initialized' });
  }, []);

  const triggerHandshake = async () => {
    const provider = window.phantom?.solana;
    const result = await aeNetworkBridge.executeHandshake(provider);
    
    if (result.status === 'AUTHORIZED') {
      setNetworkStatus(`SECURE NODE ACTIVE // ${result.identity.slice(0, 4)}...${result.identity.slice(-4)}`);
    } else {
      setNetworkStatus('HANDSHAKE FAILED // UNAUTHORIZED');
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#E0E0E0', minHeight: '100vh', padding: '3rem', fontFamily: 'monospace' }}>
      <h1 style={{ letterSpacing: '2px', color: '#FFFFFF' }}>A S H E N  Z E T A</h1>
      <p style={{ fontSize: '0.8rem', color: '#888' }}>SECURE NODE // AETHEOS PROTOCOL V1.0</p>
      
      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid #333', borderRadius: '8px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Handshake Required</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          This environment is protected by Aetheos Sovereign Execution. Execute the handshake to authorize your local identity and access the Zeta data layer.
        </p>
        
        <button 
          onClick={triggerHandshake} 
          style={{ padding: '1rem 2rem', backgroundColor: '#111', color: '#FFF', border: '1px solid #555', cursor: 'pointer', letterSpacing: '1px' }}
        >
          EXECUTE HANDSHAKE
        </button>
      </div>

      <div style={{ marginTop: '3rem', fontSize: '0.75rem', color: '#0f0', display: 'flex', gap: '4rem' }}>
        <div>
          <p>NETWORK: MAINNET BETA</p>
          <p>FIREDANCER: LIVE</p>
        </div>
        <div>
          <p>STATUS: {networkStatus}</p>
          <p>ORACLE: UNBOUND ARCHITECTURE</p>
        </div>
      </div>
    </div>
  );
}

export default App;
