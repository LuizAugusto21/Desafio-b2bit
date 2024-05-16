import {Routes, Route} from 'react-router-dom';

import React from 'react';
import Login from './pages/Login/login';
import UserProfile from './pages/UserProfile/UserProfile';

// import { Container } from './styles';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element= {<Login/>}></Route>
        <Route path="/profile" element= {<UserProfile/>}></Route>
    </Routes>
  )
}

export default MainRoutes;