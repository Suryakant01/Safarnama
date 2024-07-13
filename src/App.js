import { Route, Routes } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar.components';
import Footer from './components/Footer.components';

//Pages
import HomePage from './pages/Home.pages';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination" element={<h1>destination Page</h1>} />
        <Route path="/gallery" element={<h1>gallery Page</h1>} />
        <Route path="/blog" element={<h1>blog Page</h1>} />
        <Route path="/login" element={<h1>login Page</h1>} />
      </Routes>
      <div>
        <h1>destination</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
