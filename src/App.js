import './App.css';
import Loginform from './Pages/Loginform'
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginform />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
