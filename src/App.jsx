import React, { useState } from 'react';
import './App.css';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Terminal from './components/Terminal';

function App() {
  const [stage, setStage] = useState('boot');

  const handleBootEnd = () => {
    setStage('login');
  };

  const handleLogin = () => {
    setStage('terminal');
  };

  return (
    <div>
      {stage === 'boot' && <BootScreen onBootEnd={handleBootEnd} />}
      {stage === 'login' && <LoginScreen onLogin={handleLogin} />}
      {stage === 'terminal' && <Terminal />}
    </div>
  );
}

export default App;
