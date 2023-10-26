import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { publicRoutes } from './routes/ListRoute';
import { ManageProductProvider } from './context/ProductContext';

function App() {
  return (
    <div className="App">
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
          </Routes>
        </ManageProductProvider>
      </CartProvider>
    </div>
  );
}

export default App;
