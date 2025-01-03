import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import TryChart from './components/TryChart';
import GoldPrice from './components/GoldPrice/GoldPrice';


export default function App(){
  return(
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/tryChart' element={<TryChart/>}/>
        <Route path='/goldPrices' element={<GoldPrice/>}/>
      </Routes>
    </div>
  );
}
