import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Layout from './Layout/Layout';

function App() {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Layout>
    </Router>
    
  );
};

export default App