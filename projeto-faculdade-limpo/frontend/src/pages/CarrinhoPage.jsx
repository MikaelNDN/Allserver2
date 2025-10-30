import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { profissionais } from '../database.js';

export default function CarrinhoPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  const total = cartItems.reduce((acc, item) => {
    const profissional = profissionais[item.id];
    if (profissional) {
      return acc + profissional.preco * item.quantity;
    }
    return acc;
  }, 0);

  const totalFormatado = `R$ ${total.toFixed(2).replace('.', ',')}`;

  return (
    <div>
      <section className="pagina-banner">
        <div className="container"><h1>Carrinho</h1></div>
      </section>
      
      <section className="pagina-conteudo">
        <div className="carrinho-container">
          <div className="carrinho-itens">
            <div className="carrinho-header">
                <span className="header-profissional">Profissional</span>
                <span className="header-valor">Valor</span>
                <span className="header-hora">Hora(s)</span>
                <span className="header-total">Total</span>
            </div>

            {cartItems.length === 0 ? (
              <p className="carrinho-vazio" style={{ padding: '20px' }}>Seu carrinho está vazio.</p>
            ) : (
              cartItems.map(item => {
                const profissional = profissionais[item.id];
                if (!profissional) return null;
                
                const itemTotalFormatado = `R$ ${(profissional.preco * item.quantity).toFixed(2).replace('.', ',')}`;
                const itemPrecoFormatado = `R$ ${profissional.preco.toFixed(2).replace('.', ',')}`;

                return (
                  <div key={item.id} className="carrinho-item">
                    <div className="item-info">
                      <img src={profissional.imagem} alt={profissional.nome} />
                      <div>
                        <p className="item-categoria">{profissional.categoria}</p>
                        <h3 className="item-nome">{profissional.nome}</h3>
                      </div>
                    </div>
                    <div className="item-valor">{itemPrecoFormatado}</div>
                    <div className="item-quantidade">
                      <input type="number" value={item.quantity} min="1" readOnly />
                    </div>
                    <div className="item-total">{itemTotalFormatado}</div>
                    <div className="item-remover">
                      <button onClick={() => removeFromCart(item.id)} className="remover-btn">
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="carrinho-resumo">
            <h3>Valor total</h3>
            <div className="resumo-linha">
              <span>Subtotal</span>
              <span className="resumo-subtotal">{totalFormatado}</span>
            </div>
            <div className="resumo-linha total">
              <span>Total</span>
              <span className="resumo-total">{totalFormatado}</span>
            </div>
            <Link to="/checkout" className="botao-contratar">Contratar</Link>
          </div>
        </div>
      </section>
    </div>
  );
}