import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Atom } from "react-loading-indicators"

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Components
import MyNavbar from './components/Navbar.components';
import Footer from './components/Footer.components';
const PhoneAuth = lazy(() => import('./components/PhoneAuth.comp.auth'));
const Gallery = lazy(() => import('./components/Gallery.components'));

//Pages
const HomePage = lazy(() => import('./pages/Home.pages'));
const LoginPage = lazy(() => import('./pages/Login.pages'));
const RegisterPage = lazy(() => import('./pages/Register.pages'));
const DestinationPage = lazy(() => import('./pages/Destination.pages'));
const BlogForm = lazy(() => import('./pages/BlogForm.pages'));
const StateBlogs = lazy(() => import('./pages/StateBlogs.pages'));
const BlogPage = lazy(() => import('./pages/BlogPage.pages'));
const About = lazy(() => import('./pages/About.pages'));
const ContactUs = lazy(() => import("./pages/ContactUs.pages"))
const SavedArticles = lazy(() => import("./pages/SavedArticles.pages"))


function App() {
    return (
        <div className="App">
            <MyNavbar />
            <Suspense fallback={<Atom color="#3172cc" size="large" text="Please Wait....." textColor="" />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blogs/:states" element={<StateBlogs />} />
                    <Route path="/blogs/:states/:id" element={<BlogPage />} />
                    <Route path="/destination" element={<DestinationPage />} />
                    <Route path="/destination/:id" element={<BlogPage />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/blog" element={<BlogForm />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/phone" element={<PhoneAuth />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/saved-blogs" element={<SavedArticles />} />
                    <Route path="/hello-world" element={<h1>Hello World</h1>} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}

export default App;
