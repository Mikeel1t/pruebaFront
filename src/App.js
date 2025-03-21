import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Actualiza Switch a Routes
import UserList from './components/UserList/UserList';
import UserCreate from './components/UserCreate/UserCreate';
import UserEdit from './components/UserEdit/UserEdit';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Aplicación PruebaFront</h1>
        <Routes>  {/* Cambié Switch por Routes */}
          <Route path="/create" element={<UserCreate />} />  {/* Cambié component por element */}
          <Route path="/edit/:userId" element={<UserEdit />} />  {/* Cambié component por element */}
          <Route path="/" element={<UserList />} />  {/* Cambié component por element */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
