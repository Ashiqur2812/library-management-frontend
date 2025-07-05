import Hero from '@/components/layout/Hero';
import { Helmet } from 'react-helmet';
import Books from './Books';

const Home = () => {
    return (
        <div>
            <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 px-4">
                <Helmet>
                    <title>Library Management System</title>
                    <meta name="description" content="Books" />
                </Helmet>
                <Hero />
                <Books />
            </div>
        </div>
    );
};

export default Home;