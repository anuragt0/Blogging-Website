import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <div className="App">
      <Router>
      <Toaster toastOptions={{ duration: 4000 }} />

        <Routes>
            <Route exact path = "/" element={<Home/>}/>
            <Route exact path = "/login" element={<Login/>}/>
            <Route exact path = "/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
