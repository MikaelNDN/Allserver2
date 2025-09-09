// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Importe o AuthProvider

const theme = extendTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider> {/* 2. Envolva o App com ele */}
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);