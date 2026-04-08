import { useState } from 'react';
import Home from './pages/Home';
// import About from './pages/About'
// import Board from './pages/Board'
// import Login from './pages/Login'
// import Admin from './pages/Admin'

import './App.css';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
function App() {
  const [isLoggedIn, setIsLoggedIs] = useState(false);
  return (
    <BrowserRouter basename="/my-app">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path='/about' element={<About />}></Route>
        <Route path='/boards/:id' element={<Board />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin' element={ isLoggedIn ? <Admin /> : <Navigate to='/login' />}></Route> */}
      </Routes>
    </BrowserRouter>
    // <>
    //   <Home></Home>
    // </>
  );
}

export default App;
