

import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function UsuarioPage() {
    
    const [activeTab, setActiveTab] = useState('pedidos');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <section className="pagina-conteudo">
            <div className="container perfil-usuario-container">
                
                <aside className="perfil-nav">
                    <div className="user-info-card">
                        <img src="/img/avatar-exemplo.png" alt="Avatar do usuário" className="user-avatar" />
                        <h3>Olá, Ana!</h3>
                        <p>ana.silva@email.com</p>
                    </div>
                    <nav className="perfil-menu">
                        <ul>
                            <li>
                                <a href="#" 
                                   className={`menu-link ${activeTab === 'pedidos' ? 'active' : ''}`}
                                   onClick={(e) => { e.preventDefault(); handleTabClick('pedidos'); }}>
                                    <i className="fa-solid fa-receipt"></i> Meus Pedidos
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                   className={`menu-link ${activeTab === 'favoritos' ? 'active' : ''}`}
                                   onClick={(e) => { e.preventDefault(); handleTabClick('favoritos'); }}>
                                    <i className="fa-regular fa-heart"></i> Favoritos
                                </a>
                            </li>
                            <li>
                                <a href="#" 
                                   className={`menu-link ${activeTab === 'config' ? 'active' : ''}`}
                                   onClick={(e) => { e.preventDefault(); handleTabClick('config'); }}>
                                    <i className="fa-solid fa-gear"></i> Configurações
                                </a>
                            </li>
                            <li>
                                <Link to="/"><i className="fa-solid fa-right-from-bracket"></i> Sair</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <section className="perfil-conteudo">
                    
                    <div id="pedidos" className={`painel-conteudo ${activeTab === 'pedidos' ? 'active' : ''}`}>
                        <h2>Meus Pedidos</h2>
                        <div className="pedido-card">
                            <div className="pedido-info">
                                <img src="/img/hermione.png" alt="Hermione Granger" />
                                <div>
                                    <h4>Contratação de Barista</h4>
                                    <p>Profissional: <strong>Hermione Granger</strong></p>
                                    <p>Data: 25/10/2025</p>
                                </div>
                            </div>
                            <div className="pedido-status">
                                <span className="status concluido">Concluído</span>
                                <span className="pedido-valor">R$ 2.000,00</span>
                            </div>
                        </div>
                    </div>

                    <div id="favoritos" className={`painel-conteudo ${activeTab === 'favoritos' ? 'active' : ''}`}>
                        <h2>Meus Favoritos</h2>
                        <p>Você ainda não marcou nenhum profissional como favorito.</p>
                    </div>

                    <div id="config" className={`painel-conteudo ${activeTab === 'config' ? 'active' : ''}`}>
                        <h2>Configurações da Conta</h2>
                        <p>Em breve, aqui você poderá alterar sua senha e informações de pagamento.</p>
                    </div>

                </section>
            </div>
        </section>
    );
}