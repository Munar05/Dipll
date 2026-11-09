import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Assistant from './pages/Assistant'
import Explore from './pages/Explore'
import CreateProject from './pages/CreateProject'
import { token } from './api'
const Private=({children}:{children:JSX.Element})=>token()?children:<Navigate to="/login"/>
createRoot(document.getElementById('root')!).render(<BrowserRouter><Routes><Route element={<Layout/>}>
<Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth mode="login"/>}/><Route path="/register" element={<Auth mode="register"/>}/>
<Route path="/explore" element={<Explore/>}/><Route path="/assistant" element={<Private><Assistant/></Private>}/><Route path="/create" element={<Private><CreateProject/></Private>}/>
</Route></Routes></BrowserRouter>)
