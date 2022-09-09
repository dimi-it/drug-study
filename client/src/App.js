import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, useNavigate, Route, Routes } from "react-router-dom";
import Card from './Card';
import Home from './Home';
import Layout from './Layout';
import Game from './Game';
import Results from './Results';
import CardList from './CardsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='game/*' element={<Game/>}/>
          <Route path='results/*' element={<Results/>}/>
          <Route path='list/' element={<CardList/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
