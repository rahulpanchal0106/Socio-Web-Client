import { useEffect, useState } from 'react';
import './App.css';
import Feed from './components/Feed/Feed';
import Login from './components/Auth/Login';
import Nav from './components/Navbar/Nav';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import People from './components/People/People';
import Signup from './components/Auth/Signup';
import Post from './components/Post/Post';
import ProfilePage from './components/Profile/ProfilePage';
import getData from './utils/getData';
import getCookie from './utils/getCookie';
import '../fonts/WEB/css/chillax.css';

function App() {
    const [username, setUsername] = useState('');
    

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/feed',
            element: <Feed />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/people',
            element: <People />,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
        {
            path: '/post',
            element: <Post />,
        },
        {
            path: '/profile/:username/:uidTo',
            element: <ProfilePage />,
        },
    ]);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getData();
            if (user && user.username) {
                setUsername(user.username);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
