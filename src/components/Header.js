import {Link} from 'react-router-dom';
export default function Header(){
    return (
    <div className="nav-links">
        <nav className="p-2">
            <Link className="px-3" to="/">Home</Link>
            <Link className='px-3' to="/tryChart">Graphs</Link>
            <Link className='px-3' to="/goldPrices">Gold</Link>
            <Link className="px-3" to="/about">About</Link>
            <Link className="px-3" to="/contact">Contact</Link>
        </nav>
    </div>
    );
}