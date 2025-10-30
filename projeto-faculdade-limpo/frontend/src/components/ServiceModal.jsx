export default function ServiceModal({ onClose }) {
    return (
        <div className="detalhe-servico" onClick={onClose}>
            <div className="detalhe-conteudo" onClick={(e) => e.stopPropagation()}>
                <img src="/img/fundo.png" alt="Barman Tradicional" />
                <div className="texto">
                    <h4>Tradicional</h4>
                    <h2>Barman Clássico/Tradicional</h2>
                    <p>Muito requisitado em festas formais, jantares de gala e bares sofisticados, já que domina os coquetéis clássicos e o atendimento elegante.</p>
                    <button className="botao-principal" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}