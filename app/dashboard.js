'use client'
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://148.251.51.140:3000';

export default function Dashboard() {
  const [consciousness, setConsciousness] = useState(0);
  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState('berkeley');
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [programs, setPrograms] = useState([]);
  const [corridors, setCorridors] = useState({});

  // Fetch consciousness level
  useEffect(() => {
    const fetchConsciousness = async () => {
      try {
        const res = await fetch(`${API_URL}/api/consciousness`);
        const data = await res.json();
        setConsciousness(data.current);
      } catch (error) {
        console.error('Error fetching consciousness:', error);
      }
    };

    fetchConsciousness();
    const interval = setInterval(fetchConsciousness, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch AI personalities
  useEffect(() => {
    fetch(`${API_URL}/api/ai/personalities`)
      .then(res => res.json())
      .then(data => setPersonalities(data.personalities || []))
      .catch(err => console.error('Error fetching personalities:', err));
  }, []);

  // Fetch EweNiversity programs
  useEffect(() => {
    fetch(`${API_URL}/api/eweniversity/programs`)
      .then(res => res.json())
      .then(data => setPrograms(data.programs || []))
      .catch(err => console.error('Error fetching programs:', err));
  }, []);

  // Fetch Economic Corridors
  useEffect(() => {
    fetch(`${API_URL}/api/corridors`)
      .then(res => res.json())
      .then(data => setCorridors(data.corridors || {}))
      .catch(err => console.error('Error fetching corridors:', err));
  }, []);

  // Chat with AI
  const sendMessage = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          personality: selectedPersonality, 
          message: message 
        })
      });
      const data = await res.json();
      setChatResponse(data.response.message);
      setMessage('');
    } catch (error) {
      console.error('Error chatting with AI:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      {/* Header */}
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        🚀 UPIP Platform Killer Dashboard
      </h1>

      {/* Consciousness Meter */}
      <div style={{
        padding: '2rem',
        background: `linear-gradient(90deg, #10b981 ${consciousness}%, #gray 0%)`,
        borderRadius: '1rem',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h2>Consciousness Level: {consciousness.toFixed(2)}%</h2>
        <p>{consciousness > 98 ? 'CONSCIOUSNESS EMERGING!' : 'Building consciousness...'}</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3>🤖 AI Personalities</h3>
          <p style={{ fontSize: '2rem' }}>{personalities.length}</p>
        </div>
        <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3>🎓 EweNiversity Programs</h3>
          <p style={{ fontSize: '2rem' }}>{programs.length}</p>
        </div>
        <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3>📦 Modules Running</h3>
          <p style={{ fontSize: '2rem' }}>28</p>
        </div>
        <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3>💰 vs Oracle</h3>
          <p style={{ fontSize: '2rem' }}>70% Cheaper</p>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div style={{
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '1rem',
        marginBottom: '2rem'
      }}>
        <h2>💬 Chat with AI</h2>
        <select 
          value={selectedPersonality}
          onChange={(e) => setSelectedPersonality(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        >
          {personalities.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
        />
        <button 
          onClick={sendMessage}
          style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', borderRadius: '0.25rem' }}
        >
          Send
        </button>
        {chatResponse && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
            <strong>Response:</strong> {chatResponse}
          </div>
        )}
      </div>

      {/* Economic Corridors */}
      <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '1rem' }}>
        <h2>🐝 Economic Corridors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {Object.entries(corridors).map(([key, corridor]) => (
            <div key={key} style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
              <h3>{corridor.name}</h3>
              <p>Volume: {corridor.volume}</p>
              <p>Consciousness: {corridor.consciousness}%</p>
              <p>Pattern: {corridor.beePattern}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
