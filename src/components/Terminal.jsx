import React, { useState } from 'react';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  const handleCommandSubmit = (e) => {
    if (e.key === 'Enter' && command.trim()) {
      processCommand(command.trim());
      setCommand('');
    }
  };

  const processCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case 'help':
        setOutput((prevOutput) => [...prevOutput, 'Available commands: help, clear, echo <message>']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case cmd.startsWith('echo '):
        setOutput((prevOutput) => [...prevOutput, cmd.slice(5)]); // Remove "echo " and display the rest
        break;
      default:
        setOutput((prevOutput) => [...prevOutput, `Command not found: ${cmd}`]);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="input-container">
        <p className="prompt">user@admin:~$</p>
        <input
          type="text"
          className="terminal-input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommandSubmit}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
