import React, { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("React App Loading...");
  
  useEffect(() => {
    console.log("React hooks are working!");
    setMessage("React App Working!");
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {message}
        </h1>
        <p className="text-gray-600">
          React hooks are now properly initialized
        </p>
      </div>
    </div>
  );
};

export default App;