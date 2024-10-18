// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const MainMenu = () => {
//     const navigate = useNavigate(); // useNavigate hook to programmatically navigate

//     return (
//         <div>
//             {/* Top menu */}
//             <nav className="top-menu">
//                 <button onClick={() => navigate('/')}>Main Page</button>
//                 <button onClick={() => navigate('/account/login')}>Login</button>
//                 <button onClick={() => navigate('/account/register')}>Register</button>
//             </nav>

//             {/* Sub-menu */}
//             <nav className="main-menu">
//                 <button>Create New Element</button>
//                 <button>Create New Group</button>
//                 <select>
//                     <option>Admin Group</option>
//                     {/* Additional groups will be added here */}
//                 </select>
//             </nav>
//         </div>
//     );
// };

// export default MainMenu;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUsername('User123'); // Placeholder
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            {}
            <nav className="top-menu">
                <button onClick={() => navigate('/')}>CheatSheet</button>
                {isLoggedIn ? (
                    <>
                        <span>{username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/account/login')}>Login</button>
                        <button onClick={() => navigate('/account/register')}>Register</button>
                    </>
                )}
            </nav>

            {}
            <nav className="main-menu">
                <button>Create New Element</button>
                <button>Create New Group</button>
                <select>
                    <option>Admin Group</option>
                    {}
                </select>
            </nav>
        </div>
    );
};

export default MainMenu;
