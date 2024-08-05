import { Route, Routes } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar.components';
import Footer from './components/Footer.components';
import PhoneAuth from './components/PhoneAuth.comp.auth';
import HeroSection from './components/HeroSection.components';


//Pages
import HomePage from './pages/Home.pages';
import LoginPage from './pages/Login.pages';
import RegisterPage from './pages/Register.pages';
import DestinationPage from './pages/Destination.pages';
import BlogForm from './pages/BlogForm.pages';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/gallery" element={<h1>gallery Page</h1>} />
        <Route path="/blog" element={<BlogForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/phone" element={<PhoneAuth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
