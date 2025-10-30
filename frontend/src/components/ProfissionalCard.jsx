import { Link } from 'react-router-dom';

export default function ProfissionalCard({ professional }) {
  
  console.log('Dados recebidos pelo ProfissionalCard:', professional); 


  if (!professional || !professional.id || !professional.imagem || !professional.nome || !professional.categoria || professional.preco === undefined) {
    console.error('ProfissionalCard recebeu dados incompletos:', professional);
    return null;
  }

  
  const precoFormatado = `R$ ${professional.preco.toFixed(2).replace('.', ',')}`;

  return (
    <Link to={`/perfil/${professional.id}`} className="card-link">
      <div className="card-profissional">
        <div className="imagem">
          <img src={professional.imagem} alt={professional.nome} /> 
          <div className="overlay">
            <button>Ver detalhes</button>
          </div>
        </div>
        <div className="info">
          <h3>{professional.nome}</h3>
          <p>{professional.categoria}</p>
          <span className="preco">{precoFormatado}</span>
        </div>
      </div>
    </Link>
  );
}