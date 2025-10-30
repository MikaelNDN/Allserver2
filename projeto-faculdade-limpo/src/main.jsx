// src/main.jsx (CORRIGIDO E COMPLETO)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// 1. Importa o roteador principal (que define as páginas)
import AppRouter from './pages/AppRouter.jsx'; 

// 2. Importa o seu CSS (o App.css não é necessário se não o estiver a usar)
import './index.css'; 

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* 3. Envolve toda a aplicação com os Provedores */}
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          {/* 4. Renderiza o AppRouter, não o App.jsx */}
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);