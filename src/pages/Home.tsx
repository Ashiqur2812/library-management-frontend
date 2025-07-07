import Hero from '@/components/layout/Hero';
import { Helmet } from 'react-helmet';
import Books from './Books';

const Home = () => {
    return (
        <div>
            <div className="mx-auto w-11/12">
                <Helmet>
                    <title>Library Management System</title>
                    <meta name="description" content="Books" />
                </Helmet>
                <Hero />
            </div>
            <div className='px-0 lg:px-16 mb-12'>
                <Books />
            </div>
        </div>
    );
};

export default Home;