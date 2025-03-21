import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Actualiza Switch a Routes
import UserList from './components/UserList/UserList';
import UserCreate from './components/UserCreate/UserCreate';
import UserEdit from './components/UserEdit/UserEdit';

const App = () => {
  return (
    <Router>
      <div className="App">
      <header>
        <div class="px-3 py-2 bg-dark text-white">
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <h1>Aplicación de pruebaFront</h1>
              </a>
            </div>
          </div>
        </div>
      </header>
        
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
