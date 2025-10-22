import { useState, useEffect } from 'react'; 
import { profissionais } from '../database.js'; 
import ProfissionalCard from '../components/ProfissionalCard.jsx'; 

const ITEMS_PER_PAGE = 8; 

export default function ProfissionaisPage() {
  

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 

  
  const todosProfissionais = Object.values(profissionais);
  const filteredProfessionals = todosProfissionais.filter(professional => 
    professional.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredProfessionals.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
 
  const currentProfessionals = filteredProfessionals.slice(startIndex, endIndex);

 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };


  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

 
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [currentPage]); 

  return (
    <div>
        <section className="pagina-banner">
            <div className="container"><h1>Profissionais</h1></div>
        </section>


        <section className="barra-ferramentas">
            <div className="container search-container">
                <input 
                    type="text"
                    placeholder="Buscar profissional por nome..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </section>


        <section className="pagina-conteudo">
            <div className="container">
                <div className="lista-profissionais">
                   
                    {currentProfessionals.length > 0 ? (
                        currentProfessionals.map(prof => (
                            <ProfissionalCard key={prof.id} professional={prof} />
                        ))
                    ) : (
                        <p className="nenhum-resultado">Nenhum profissional encontrado.</p> 
                    )}
                </div>
                {totalPages > 1 && (
                    <nav className="paginacao" aria-label="Navegação de página">
                        <ul>
                           
                            <li>
                                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                                    &laquo;
                                </button>
                            </li>
                            
                            
                            {pageNumbers.map(number => (
                                <li key={number}>
                                    <button 
                                        onClick={() => goToPage(number)} 
                                        className={currentPage === number ? 'ativa' : ''}
                                    >
                                        {number}
                                    </button>
                                </li>
                            ))}
                            
                            <li>
                                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </section>
    </div>
  );
}