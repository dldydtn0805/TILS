import './App.css';
import { Routes, Route } from 'react-router-dom';
// pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/about" element={<AboutPage></AboutPage>}></Route>
          <Route path="/project" element={<ProjectPage></ProjectPage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
