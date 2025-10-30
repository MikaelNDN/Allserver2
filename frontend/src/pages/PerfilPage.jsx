import { useContext, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { profissionais } from '../database.js'; 
import { CartContext } from '../context/CartContext.jsx'; 

export default function PerfilPage() {
  const { id } = useParams(); 
  const profissional = profissionais[id];
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); 

 
  const [activeTab, setActiveTab] = useState('descricao');
  const [quantity, setQuantity] = useState(1);

  if (!profissional) {
    return <h2>Profissional não encontrado!</h2>;
  }


  let urlWhatsapp = '#';
  if (profissional.telefone) { 
    const mensagem = `Olá ${profissional.nome}, vi seu perfil no site AllServe e gostaria de mais informações sobre seus serviços.`;
    urlWhatsapp = `https://wa.me/${profissional.telefone}?text=${encodeURIComponent(mensagem)}`;
  }

  let urlInstagram = '#';
  if (profissional.instagram) { 
    urlInstagram = `https://www.instagram.com/${profissional.instagram}/`;
  }


  const handleAddToCart = () => {
    addToCart(profissional.id, quantity);
    navigate('/carrinho');
  };

  
  const precoFormatado = `R$ ${profissional.preco.toFixed(2).replace('.', ',')}`;

  return (
    <main className="container-perfil">
        <section className="perfil-principal">
            <div className="perfil-imagem-col">
                <img id="perfil-imagem" src={profissional.imagem} alt={profissional.nome} />
            </div>

            <div className="perfil-info-col">
                <div className="nome-container">
                    <h1 id="perfil-nome">{profissional.nome}</h1>
                </div>
                <div className="contato-icones">
                    {profissional.telefone && (
                        <a href={urlWhatsapp} className="btn-social whatsapp" title="Conversar no WhatsApp" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    )}

                    {profissional.instagram && (
                        <a href={urlInstagram} className="btn-social instagram" title="Ver no Instagram" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    )}
                </div>

                
                <p id="perfil-preco" className="info-preco">{precoFormatado}/hora</p>
                
                
                <div id="perfil-avaliacao" className="info-avaliacao">
                    <div className="estrelas">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-${i < profissional.avaliacao ? 'solid' : 'regular'} fa-star`}></i>
                        ))}
                    </div>
                    <span>{profissional.numAvaliacoes} {profissional.numAvaliacoes === 1 ? 'Avaliação' : 'Avaliações'}</span>
                </div>

                <p id="perfil-resumo" className="info-resumo">{profissional.resumo}</p>
                
                <h4>Serviços oferecidos:</h4>
                <div id="perfil-tags" className="info-tags">
                    {profissional.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>

                <div className="info-acoes">
                    <div className="quantidade">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    <button onClick={handleAddToCart} className="botao-principal contratar">Contratar</button>
                </div>
            </div>
        </section>


        <section className="perfil-detalhes">
         
            <nav className="tabs-nav">
                <button 
                  className={`tab-btn ${activeTab === 'descricao' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('descricao')}>
                  Descrição
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'servicos' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('servicos')}>
                  Serviços detalhados
                </button>
              
            </nav>
      
            <div className="tabs-conteudo">
              
                <div id="tab-descricao" className={`tab-painel ${activeTab === 'descricao' ? 'active' : ''}`}>
                    {profissional.descricaoCompleta}
                </div>
          
                <div id="tab-servicos" className={`tab-painel ${activeTab === 'servicos' ? 'active' : ''}`}>
                    <div className="info-extra">
                        <div><span>ID:</span> <span id="perfil-id">{profissional.id}</span></div>
                        <div><span>Categoria:</span> <span id="perfil-categoria">{profissional.categoria}</span></div>
                        <div><span>Especialidade:</span> <span id="perfil-especialidade">{profissional.especialidade}</span></div>
                       
                        <div><span>Share:</span>
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                 <div id="tab-avaliacoes" className={`tab-painel ${activeTab === 'avaliacoes' ? 'active' : ''}`}>...</div> 
            </div>
        </section>
    </main>
  );
}