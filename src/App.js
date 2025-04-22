import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect root to /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
