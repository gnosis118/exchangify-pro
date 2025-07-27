import React from "react";

const App = () => {
  console.log("App is rendering successfully!");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React App Working!
        </h1>
        <p className="text-gray-600">
          React hooks are now properly initialized
        </p>
      </div>
    </div>
  );
};

export default App;