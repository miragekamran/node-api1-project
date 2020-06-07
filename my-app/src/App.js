import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUser from './Components/CreateUser';
import DeleteUser from './Components/DeleteUser';
// import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <div className="App">
      <CreateUser />
      {/* <UpdateUser /> */}
      <DeleteUser />
    </div>
  );
}

export default App;
