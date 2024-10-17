import React, { useEffect } from 'react';

const BootScreen = ({ onBootEnd }) => {
  useEffect(() => {
    // Simulate boot process (3 seconds)
    const timer = setTimeout(onBootEnd, 3000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [onBootEnd]);

  return (
    <div className="boot-screen">
      <h1>Booting...</h1>
      {/* <div className="loader"></div> */}
    </div>
  );
};

export default BootScreen;
