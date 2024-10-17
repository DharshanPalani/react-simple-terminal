import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LoginScreen = ({ onLogin }) => {
  const divRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  useEffect(() => {
    // Focus on the div when the component mounts
    // divRef.current.focus();

    // Clean up event listener
    const handleKeyPressCleanup = (e) => {
      if (e.key === 'Enter') {
        onLogin();
      }
    };

    window.addEventListener('keypress', handleKeyPressCleanup);
    return () => {
      window.removeEventListener('keypress', handleKeyPressCleanup);
    };
  }, [onLogin]);

  return (
    <div
      className="login-screen"
      onKeyPress={handleKeyPress}
      tabIndex="0"
      ref={divRef}
      role="button"
      aria-live="polite"
    >
      <p className="login-text">Press "Enter" to login</p>
    </div>
  );
};

LoginScreen.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginScreen;
