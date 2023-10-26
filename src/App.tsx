import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { protectedRoutes, publicRoutes } from './routes/ListRoute';
import { ManageProductProvider } from './context/ProductContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <ManageProductProvider>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Component = route.component;
                const Layout = route.layout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Component />
                      </Layout>
                    }
                  />
                );
              })}
              {protectedRoutes.map((route, index) => {
                const Component = route.component;
                const Layout = route.layout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <ProtectedRoute>
                          <Component />
                        </ProtectedRoute>
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </ManageProductProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
