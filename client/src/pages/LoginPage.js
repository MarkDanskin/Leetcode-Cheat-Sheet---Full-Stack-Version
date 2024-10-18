// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

import '../styles/App.css';
import MainMenu from '../components/MainMenu';
import FooterMenu from '../components/FooterMenu';
import MainContainer from '../components/MainContainer';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/account/login', { email, password });
            localStorage.setItem('token', response.data.token);
            console.log(`Login was successful for user ${email}`);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <MainContainer>
            <MainMenu></MainMenu>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            <FooterMenu></FooterMenu>
        </MainContainer>
    );
};

export default LoginPage;
