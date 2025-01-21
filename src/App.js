import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import TryChart from './components/TryChart';
import GoldPrice from './components/GoldPrice/GoldPrice';
import CircuitBreakerStatus from './components/CircuitBreakerStatus';
import TokenBucketRateLimiterDemo from './components/RateLimiter/RateLimiter';
import Market from './components/Market/Market';
import OrganizeCards from './components/OrganizeCards';


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
        <Route path='/customCircuitBreaker' element={<CircuitBreakerStatus/>}/>
        <Route path='/market' element={<Market/>}/>
        <Route path='/tokenBucketRateLimiterDemo' element={<TokenBucketRateLimiterDemo/>}/>
        <Route path='/cards' element={<OrganizeCards/>}/>
      </Routes>
    </div>
  );
}
