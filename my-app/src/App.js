import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUser from './Components/CreateUser';
import UserCard from './Components/UserCard';

function App() {
  return (
    <div className="App">
      <CreateUser/>
      <UserCard />
    </div>
  );
}

export default App;
