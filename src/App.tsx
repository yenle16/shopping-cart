import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Navbar } from './components/navbar/Navbar';
import { Store } from './pages/store/Store';
import { CartProvider } from './context/CartContext';
import { Login } from './pages/login/Login';
import { publicRoutes } from './routes/ListRoute';

function App() {
  return (
    <div className="App">
      <CartProvider>
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
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
