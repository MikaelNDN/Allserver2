import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; 

import Header from './components/Header.jsx'; 
import Footer from './components/Footer.jsx'; 
import HomePage from './pages/HomePage.jsx'; 
import ProfissionaisPage from './pages/ProfissionaisPage.jsx'; 
import PerfilPage from './pages/PerfilPage.jsx'; 
import CarrinhoPage from './pages/CarrinhoPage.jsx'; 
import UsuarioPage from './pages/UsuarioPage.jsx'; 
import SobrePage from './pages/SobrePage.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profissionais" element={<ProfissionaisPage />} />
            <Route path="/perfil/:id" element={<PerfilPage />} />
            <Route path="/carrinho" element={<CarrinhoPage />} />
            <Route path="/perfil-usuario" element={<UsuarioPage />} />
            <Route path="/sobre" element={<SobrePage />} />
          </Routes>
        </main>
        <Footer />
        
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;