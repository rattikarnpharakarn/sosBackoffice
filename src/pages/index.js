import React from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const login = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!login) {

        navigate('/login')
    }
    return (
        <div className="App">
            <header className="App-header">

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default Home