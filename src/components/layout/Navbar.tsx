import { Link } from 'react-router';
import logo from '../../../src/assets/logo.png';
import { ModeToggle } from '../mode-toggle';

const Navbar = () => {
    return (
        <div className="max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-5">
            <div className="flex items-center pt-6">
                <Link to='/'>
                    <img className="w-16 h-auto rounded-sm" src={logo} alt="" />
                </Link>
            </div>
            <div className='ml-auto'>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;