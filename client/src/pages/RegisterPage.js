// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

import '../styles/App.css'; // Import your CSS file
import MainMenu from '../components/MainMenu';
import FooterMenu from '../components/FooterMenu';
import MainContainer from '../components/MainContainer';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/account/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <MainContainer>
            <MainMenu></MainMenu>
            <h1>Create Account</h1>
            <form onSubmit={handleRegister}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Create Account</button>
            </form>
            {error && <p>{error}</p>}
            <FooterMenu></FooterMenu>
        </MainContainer>
    );
};

export default RegisterPage;
