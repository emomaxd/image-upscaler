import React, { useState } from 'react';
import './App.css';
import PhotoUpload from './photoUpload';
import LoginPage from './loginPage';

const App = () => {
  const [logInTrigger, setLogInTrigger] = useState(false);


  const handleLogInPage = () => {
    setLogInTrigger(!logInTrigger);
  };

  const handleUpload = (formData) => {
    fetch('http://localhost:5000/uploads', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log("server response: " + response);
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="App">
      {!logInTrigger ? (
        <div>
          <button className="logInButton" onClick={handleLogInPage}>Log In</button>
          <PhotoUpload onUpload={handleUpload} />
        </div>
      ) : (
        <LoginPage onLogin={handleLogInPage} />
      )}
    </div>
  );
};

export default App;
