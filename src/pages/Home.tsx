import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
const Home = () => {
    return (
        <>
            <div className="main-div">
                <h1>Discover the Power of Linkify</h1>
                <p className="typewriter">
                    <Typewriter
                        words={['Unify!', 'Simplify!', 'Linkify!']}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={50}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </p>
                <Link to="/auth">
                    <button>Get Linkified</button>
                </Link>
            </div>
        </>
    );
};

export default Home;
