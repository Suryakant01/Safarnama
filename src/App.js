import { Route, Routes } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar.components';


//Pages


//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      {/* <Routes>
        <Route path ="/" element = {<h1>home Page</h1>} />
        <Route path ="/destination" element = {<h1>destination Page</h1>} />
        <Route path ="/gallery" element = {<h1>gallery Page</h1>} />
        <Route path ="/blog" element = {<h1>blog Page</h1>} />
      </Routes> */}
    </div>
  );
}

export default App;
