import { Route, Routes } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar.components';
import Footer from './components/Footer.components';
import PhoneAuth from './components/PhoneAuth.comp.auth';
import HeroSection from './components/HeroSection.components';
import Gallery from './components/Gallery.components';

//Pages
import HomePage from './pages/Home.pages';
import LoginPage from './pages/Login.pages';
import RegisterPage from './pages/Register.pages';
import DestinationPage from './pages/Destination.pages';
import BlogForm from './pages/BlogForm.pages';
import StateBlogs from './pages/StateBlogs.pages';
import BlogPage from './pages/BlogPage.pages';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <MyNavbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs/:states" element={<StateBlogs />} />
                <Route path="/blogs/:states/:place" element={<BlogPage />} />
                <Route path="/destination" element={<DestinationPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<BlogForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/phone" element={<PhoneAuth />} />
                <Route path="/allblogs" element={<h1>all blogs</h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
