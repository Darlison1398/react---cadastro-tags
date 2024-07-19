import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from './view/login/Login';
import Index from './view/main/Index';
import Admin from './view/main/Admin';

import { AuthProvider } from './view/login/AuthContext';
import PrivateRoute from './view/login/PrivateRoute';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main/*" element={<PrivateRoute component={Index} />} />
          <Route path="/admin/*" element={<PrivateRoute component={Admin} />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
