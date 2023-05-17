import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Chat from './pages/chat';
import Hotline from './pages/hotline';
import HomePage from './pages/index';
import Sos from './pages/sos';
import User from './pages/users';
import UserManagement from './pages/users/userManagement';
import RoleManagement from './pages/users/roleManagement';
import Detail from './pages/users/detail';
import Login from './pages/login';
import Type from './pages/sos/type';
import Subtype from './pages/sos/subtype';





const AuthenProvider = () => {
  return (
    // <AuthProvider>

    <Routes>
      {/* <Route
        path="*"
        element={<Login />}
      /> */}
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/user"
        element={<UserManagement />}
      />
      <Route
        path="/role"
        element={<RoleManagement />}
      />
      <Route
        path="/hotline"
        element={<Hotline />}
      />
      <Route
        path="/sos"
        element={< Sos />}
      />
      <Route
        path="/type"
        element={< Type />}
      />
      <Route
        path="/subtype"
        element={< Subtype />}
      />
      <Route
        path="/chat"
        element={<Chat />}
      />
      <Route
        path="/detail/:id"
        element={<Detail />}
      />
    </Routes>
    // </AuthProvider>
  );
};
export default AuthenProvider;
