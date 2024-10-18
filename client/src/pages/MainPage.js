import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import MainContainer from '../components/MainContainer';
import Section from '../components/Section';
import Element from '../components/Element';
import '../styles/App.css';
import MainMenu from '../components/MainMenu';
import FooterMenu from '../components/FooterMenu';

const MainPage = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/elements', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setElements(response.data.elements);
            } catch (error) {
                console.error('Error fetching elements:', error);
            }
        };

        fetchElements();
    }, []);

    const groupElementsByCategory = () => {
        const groups = {
            categories: new Set(),
            methods: [],
            keywords: [],
            operators: [],
        };

        elements.forEach((element) => {
            element.Categories.forEach((category) => {
                if (category.name !== 'Method' && category.name !== 'Keyword' && category.name !== 'Operator') {
                    groups.categories.add(category.name);
                }
            });

            if (element.Categories.some((cat) => cat.name === 'Method')) {
                groups.methods.push(element);
            }
            if (element.Categories.some((cat) => cat.name === 'Keyword')) {
                groups.keywords.push(element);
            }
            if (element.Categories.some((cat) => cat.name === 'Operator')) {
                groups.operators.push(element);
            }
        });

        return groups;
    };

    const { categories, methods, keywords, operators } = groupElementsByCategory();

    return (
        <MainContainer>
            <MainMenu />

            {}
            <Section title="Categories">
                {[...categories].map((category) => (
                    <Element key={category} name={category} />
                ))}
            </Section>

            <hr className="divider" />

            {}
            <Section title="Methods">
                {methods.map((element) => (
                    <Element key={element.id} name={element.name} description={element.description} snippets={element.Snippets || []} />
                ))}
            </Section>

            <hr className="divider" />

            {}
            <Section title="Keywords">
                {keywords.map((element) => (
                    <Element key={element.id} name={element.name} description={element.description} snippets={element.Snippets || []} />
                ))}
            </Section>

            <hr className="divider" />

            {}
            <Section title="Operators">
                {operators.map((element) => (
                    <Element key={element.id} name={element.name} description={element.description} snippets={element.Snippets || []} />
                ))}
            </Section>

            <FooterMenu />
        </MainContainer>
    );
};

export default MainPage;
