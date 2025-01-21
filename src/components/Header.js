import {Link, Links} from 'react-router-dom';
export default function Header(){
    return (
    <div className="nav-links">
        <nav className="p-2">
            <Link className="px-3" to="/">Home</Link>
            <Link className='px-3' to="/goldPrices">Product</Link>            
            <Link className='px-3' to="/market">Market</Link>
            <Link className='px-3' to="/tryChart">Graphs</Link>
            <Link className='px-3' to="/customCircuitBreaker">Circuit Breaker</Link>
            <Link className='px-3' to="/tokenBucketRateLimiterDemo">Rate Limiter</Link>
            <Link className="px-3" to="/about">About</Link>
            <Link className="px-3" to="/contact">Contact</Link>
            <Link className='px-3' to="/cards">Cards</Link>
        </nav>
    </div>
    );
}