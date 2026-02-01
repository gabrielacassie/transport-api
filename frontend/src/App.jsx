import { useState, useEffect } from 'react'

function App() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard, bus, taxi, train
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('userpass');

  const [busData, setBusData] = useState(null);
  const [taxiData, setTaxiData] = useState(null);
  const [trainData, setTrainData] = useState(null);

  const login = async () => {
    try {
      const res = await fetch('http://localhost:5004/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.access_token);
      } else {
        alert(data.msg);
      }
    } catch (e) {
      console.error(e);
      // Fallback for demo without backend running perfectly
      alert("Could not connect to auth service. Ensure docker-compose is running.");
    }
  };

  const fetchServices = async () => {
      // Fetch Bus
      try {
          const res = await fetch('http://localhost:5001/bus');
          setBusData(await res.json());
      } catch(e) { console.log("Bus service offline"); }

      // Fetch Taxi
      try {
          const res = await fetch('http://localhost:5002/taxi');
          setTaxiData(await res.json());
      } catch(e) { console.log("Taxi service offline"); }

      // Fetch Train
      try {
          const res = await fetch('http://localhost:5003/train');
          setTrainData(await res.json());
      } catch(e) { console.log("Train service offline"); }
  };

  useEffect(() => {
    if (token) {
        fetchServices();
    }
  }, [token]);

  if (!token) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
        <div className="glass-card" style={{width: '100%', maxWidth: '400px'}}>
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Transport Hub Login</h2>
          <div style={{marginBottom: '1rem'}}>
             <label>Username</label>
             <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div style={{marginBottom: '2rem'}}>
             <label>Password</label>
             <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button style={{width: '100%'}} onClick={login}>Sign In</button>
          <p style={{marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7, textAlign: 'center'}}>
              Demo credentials: user / userpass
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="nav">
        <div className="logo">TransportHub</div>
        <div>
          <span style={{marginRight: '1rem'}}>Welcome, {username}</span>
          <button className="secondary" onClick={() => setToken(null)}>Logout</button>
        </div>
      </nav>

      <div className="grid">
        <div className="glass-card">
          <h3>🚌 Bus Service</h3>
          <p>{busData ? busData.status : "Offline"}</p>
          <div className="badge badge-blue">{busData ? busData.service : "Loading..."}</div>
          <div style={{marginTop: '1rem'}}>
            <button className="secondary" onClick={() => alert("Book Bus Feature Coming Soon!")}>View Schedule</button>
          </div>
        </div>

        <div className="glass-card">
          <h3>🚖 Taxi Service</h3>
          <p>{taxiData ? taxiData.status : "Offline"}</p>
          <div className="badge badge-yellow">{taxiData ? taxiData.service : "Loading..."}</div>
           <div style={{marginTop: '1rem'}}>
            <button className="secondary" onClick={() => alert("Request Ride Feature Coming Soon!")}>Request Ride</button>
          </div>
        </div>

        <div className="glass-card">
          <h3>🚆 Train Service</h3>
          <p>{trainData ? trainData.status : "Offline"}</p>
          <div className="badge badge-green">{trainData ? trainData.service : "Loading..."}</div>
           <div style={{marginTop: '1rem'}}>
            <button className="secondary" onClick={() => alert("Timetable Feature Coming Soon!")}>View Timetable</button>
          </div>
        </div>
      </div>
      
      <div style={{marginTop: '3rem'}}>
        <div className="glass-card">
            <h2>System Status</h2>
            <p>All systems operational. Real-time tracking enabled.</p>
            <div style={{height: '200px', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem'}}>
                [Map Visualization Placeholder]
            </div>
        </div>
      </div>

    </div>
  )
}

export default App
