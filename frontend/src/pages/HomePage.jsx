import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profissionais } from '../database.js'; 
import ProfissionalCard from '../components/ProfissionalCard.jsx';
import ServiceModal from '../components/ServiceModal.jsx';

export default function HomePage() {

    console.log('Dados dos profissionais importados:', profissionais);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null); 

    const handleOpenModal = (serviceType) => {
        setSelectedService(serviceType);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const algunsProfissionais = Object.values(profissionais).slice(0, 4);

    console.log('Profissionais no array para renderizar:', algunsProfissionais);


    return (
        <div>
            <section className="secao-apresentacao">
                <div className="conteudo-sobreposto">
                    <p className="texto-boas-vindas">Bem-vindo ao AllServe</p>
                    <h1>Ache o bartender ideal<br />para o seu evento</h1>
                    <p className="subtitulo">Conecte-se com profissionais qualificados para tornar sua festa inesquecível.</p>
                    <Link to="/profissionais" className="botao-principal">CONTRATAR AGORA</Link>
                </div>
            </section>
            <section className="servicos">
                <h2>Nossos serviços</h2>
                <p className="descricao">Escolha o tipo de profissional ideal para sua ocasião.</p>
                <div className="cards">
                
                    <div className="card" onClick={() => handleOpenModal('tradicional')}>
                        <img src="/img/cards.png" alt="Bartender Tradicional" />
                        <h3>Tradicional</h3>
                    </div>
                    <div className="card" onClick={() => handleOpenModal('barista')}>
                        <img src="/img/cards.png" alt="Bartender Barista" />
                        <h3>Barista</h3>
                    </div>
                    <div className="card" onClick={() => handleOpenModal('showman')}>
                        <img src="/img/cards.png" alt="Bartender Showman" />
                        <h3>Showman</h3>
                    </div>
                </div>
            </section>
            
            {isModalOpen && <ServiceModal service={selectedService} onClose={handleCloseModal} />}

            <section id="profissionais-home" className="profissionais">
                <h2>Profissionais</h2>
                <div className="lista-profissionais">
                    {algunsProfissionais.map(prof => (
                        <ProfissionalCard key={prof.id} professional={prof} />
                    ))}
                </div>
                <div className="btn-centro">
                    <Link to="/profissionais" className="botao-secundario">Mostrar mais</Link>
                </div>
            </section>
        </div>
    );
}