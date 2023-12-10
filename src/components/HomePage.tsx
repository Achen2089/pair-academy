import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="bg-blue-600 h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-6xl text-white font-bold mb-6">Welcome to Pair Academy</h1>
                <p className="text-xl text-white mb-8">Your personal assistant for learning coding</p>
                <Link to="/code-editor">
                    <button className="bg-green-500 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition duration-300 ease-in-out text-2xl">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}
