import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './components/templates/Portfolio/Portfolio';
import Project from './components/templates/Project/Project';
import Blog from './components/templates/Blog/Blog';
import './index.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/blog/:slug" element={<Blog />} />
            </Routes>
        </BrowserRouter>
    );
}