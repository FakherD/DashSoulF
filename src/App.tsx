import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        if (response.ok) {
          const content = await response.json();
          setFirstname(content.firstname);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error("There was an error fetching the user's profile:", error);
        setFirstname(''); // Reset firstname if fetching profile fails
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div className="App">
      <BrowserRouter>
        <Nav firstname={firstname} setName={setFirstname}/>
        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home firstname={firstname} />} />
            <Route path="/Login" element={<Login setName={setFirstname} />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}


export default App;
