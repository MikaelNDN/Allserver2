export default function SobrePage() {
  return (
    <div>
      <section className="pagina-banner">
        <div className="container">
          <h1>Conheça o Coração do [Nome do Restaurante/Estabelecimento]</h1> 
        </div>
      </section>

      <section className="pagina-conteudo">
        <div className="container sobre-container"> 
          
          <h2>Nossa História</h2>
          <p>
            Fundado em [Ano de Fundação] por [Nome(s) do(s) Fundador(es) ou "apaixonados por gastronomia"], 
            o [Nome do Restaurante/Estabelecimento] nasceu do sonho de criar um espaço único em Patos, 
            onde [Descreva o conceito principal: ex: a autêntica culinária regional, sabores internacionais, 
            um ambiente descontraído] pudesse ser apreciado em sua melhor forma.
          </p>
          <p>
            Desde o início, nossa jornada tem sido marcada por [Mencione um marco ou desafio: ex: desafios, 
            aprendizados, a busca constante por qualidade, a alegria de receber nossos clientes]. 
            Hoje, nos orgulhamos de ser [Descreva a posição atual: ex: uma referência em hospitalidade, 
            um ponto de encontro querido na cidade, um lugar para celebrar momentos especiais].
          </p>
          
          <img 
            src="/img/foto-restaurante.jpg" 
            alt="Fachada do [Nome do Restaurante]" 
            className="sobre-foto" 
            style={{ maxWidth: '500px', borderRadius: '10px', margin: '30px auto', display: 'block' }} 
          />

          <h2>Nossa Missão e Nossos Valores</h2>
          <p>
            Nossa missão é [Descreva a missão: ex: oferecer uma experiência gastronômica memorável, 
            proporcionar momentos de alegria e confraternização, ser o melhor destino para X na cidade]. 
            Fazemos isso guiados por nossos valores fundamentais:
          </p>
          <ul>
            <li><strong>Qualidade:</strong> Selecionamos os melhores ingredientes e preparamos tudo com cuidado e paixão.</li>
            <li><strong>Hospitalidade:</strong> Queremos que você se sinta em casa, acolhido por nossa equipe.</li>
            <li><strong>[Valor 3]:</strong> [Descreva o terceiro valor, ex: Inovação, Tradição, Alegria, Comunitário].</li>
            <li><strong>[Valor 4, opcional]:</strong> [Descreva o quarto valor, se houver].</li>
          </ul>

          <h2>Nossa Equipe</h2>
          <p>
            Por trás de cada detalhe, há uma equipe [Descreva a equipe: ex: dedicada, apaixonada por servir, 
            comprometida com a excelência]. Acreditamos que um ótimo serviço é tão importante quanto 
            uma ótima comida e bebida. [Opcional: Mencione o Chef ou Gerente, se relevante].
          </p>

          <h2>Nossos Diferenciais</h2>
          <p>
            Buscamos sempre inovar e oferecer o melhor aos nossos clientes. Seja através do nosso 
            [Mencione um diferencial: ex: cardápio sazonal, ambiente único, música ao vivo], 
            queremos que sua visita seja especial.
          </p>
          <p>
            Um dos pilares da experiência no [Nome do Restaurante/Estabelecimento] é a nossa carta de drinks. 
            Acreditamos que um bom coquetel pode transformar um momento. Por isso, investimos em contar 
            com **bartenders profissionais e talentosos**, capazes de criar desde os clássicos 
            perfeitos até bebidas autorais que surpreendem o paladar. Garantir um serviço de bar 
            excepcional é parte do nosso compromisso com a qualidade. 
          </p>

          <h2>Visite-nos ou Entre em Contato</h2>
          <div className="sobre-contato"> {/* Classe para estilizar se necessário */}
            <p><strong>Endereço:</strong> [Endereço Completo, Rua, Número, Bairro, Patos - PB]</p>
            <p><strong>Telefone / Reservas:</strong> [Seu Número de Telefone]</p>
            <p><strong>Horário de Funcionamento:</strong> [Seus Horários]</p>
            <p><strong>Siga-nos:</strong> <a href="[Link Insta]">Instagram</a> | <a href="[Link Face]">Facebook</a></p> 
          </div>

        </div>
      </section>
    </div>
  );
}