import React, { useState } from 'react';

// Sample JSON structure for the file system
const fileSystem = {
  root: {
    folders: {
      folder1: {
        files: ["game.sh"],
        folders: {},
      },
      folder2: {
        files: ["game.sh"],
        folders: {},
      },
      folder3: {
        files: ["game.sh"],
        folders: {},
      },
    },
  },
};

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleCommandSubmit = (e) => {
    if (e.key === 'Enter' && command.trim()) {
      processCommand(command.trim());
      setCommand('');
      setHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setCommand(history[history.length - 1 - (historyIndex + 1)]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setCommand(history[history.length - 1 - (historyIndex - 1)]);
      } else {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const processCommand = (cmd) => {
    setOutput((prevOutput) => [...prevOutput, 'Processing...']);
    setTimeout(() => {
      switch (cmd.toLowerCase()) {
        case 'help':
          setOutput((prevOutput) => [
            ...prevOutput,
            'Available commands: help, clear, ls',
          ]);
          break;
        case 'clear':
          setOutput([]);
          break;
        case 'ls':
          // List only the folders in the root directory
          const folders = Object.keys(fileSystem.root.folders).join(' ');
          setOutput((prevOutput) => [
            ...prevOutput,
            `${folders}`,
          ]);
          break;
        default:
          setOutput((prevOutput) => [...prevOutput, `Command not found: ${cmd}`]);
      }
    }, 250);
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, index) => (
          <p key={index} className={line.startsWith('Command not found') ? 'error' : ''}>
            {line}
          </p>
        ))}
      </div>
      <div className="input-container">
        <p className="prompt">user@luna:~$</p>
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
