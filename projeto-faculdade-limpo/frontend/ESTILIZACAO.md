# Documentação de Estilização - AllServe

## Estrutura de CSS

### Variáveis Globais (`index.css`)
```css
:root {
  --cor-primaria: #C49A3D;
  --cor-primaria-hover: #a87f2c;
  --cor-fundo: #fff;
  --cor-texto-principal: #333;
  --cor-texto-escuro: #000;
  --cor-footer: #f3ebd7;
  --sombra-padrao: 0 2px 6px rgba(0, 0, 0, 0.05);
  --fonte-principal: "Inter", sans-serif;
}
```

## Componentes Estilizados

### Header/Navegação
- Posicionamento fixo no topo
- Sombra suave para elevação
- Menu com hover effects
- Ícones interativos

```css
.barra-navegacao {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
```

### Botões
Dois estilos principais:
1. **Botão Principal**
   - Fundo colorido (cor primária)
   - Hover com escala e mudança de cor
   ```css
   .botao-principal {
     background: var(--cor-primaria);
     color: var(--cor-fundo);
   }
   ```

2. **Botão Secundário**
   - Borda colorida
   - Hover inverte cores
   ```css
   .botao-secundario {
     border: 2px solid var(--cor-primaria);
     background: transparent;
   }
   ```

### Cards de Profissionais
- Layout em grid/flex
- Animação suave no hover
- Sombra para elevação
- Imagem com aspect ratio controlado

```css
.card {
  background: #f8f5f0;
  border-radius: 15px;
  transition: transform 0.3s ease;
}
```

### Modal de Serviço
- Overlay escuro
- Animação de entrada/saída
- Layout flexbox para conteúdo
- Imagem responsiva

```css
.detalhe-servico {
  position: fixed;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
}
```

## Responsividade

### Breakpoints Principais
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Adaptações Mobile
1. Header
   - Menu compacto/hamburger
   - Ícones menores

2. Cards
   - Layout em coluna única
   - Tamanho adaptativo

3. Modal
   - Layout em coluna
   - Padding reduzido
   - Imagem menor

## Seções Específicas

### Hero Section
- Imagem de fundo com overlay
- Conteúdo centralizado
- Texto responsivo
```css
.secao-apresentacao {
  height: calc(100vh - 85px);
  background: url('/img/fundo.png') center/cover;
}
```

### Lista de Serviços
- Grid responsivo
- Gap consistente
- Cards com hover effect

### Carrinho
- Layout em lista
- Totais alinhados à direita
- Botões de ação destacados

## Elementos Comuns

### Formulários
- Inputs com padding consistente
- Focus states visíveis
- Mensagens de erro em vermelho
- Labels alinhados corretamente

### Imagens
- `object-fit: cover` para manter proporções
- Lazy loading onde apropriado
- Fallbacks para erro de carregamento

### Animações
- Transições suaves (0.3s)
- Hover effects nos elementos interativos
- Feedback visual em botões

## Boas Práticas

1. **Variáveis CSS**
   - Usar variáveis para cores e valores comuns
   - Facilita manutenção e consistência

2. **Nomenclatura**
   - BEM (Block Element Modifier)
   - Classes descritivas e semânticas

3. **Performance**
   - Evitar aninhamento excessivo
   - Preferir classes a IDs
   - Minimizar uso de !important

4. **Acessibilidade**
   - Contraste adequado
   - Estados de foco visíveis
   - Textos legíveis

## Estrutura de Arquivos CSS

```
src/
├── index.css         # Estilos globais e variáveis
├── App.css          # Estilos específicos do App
└── components/      # Estilos de componentes
    ├── Header.css
    ├── Footer.css
    └── ...
```

## Temas e Customização

### Variáveis de Cor
- Primária: #C49A3D (dourado)
- Hover: #a87f2c (dourado escuro)
- Fundo: #fff (branco)
- Texto: #333 (cinza escuro)

### Tipografia
- Fonte principal: "Inter"
- Hierarquia de tamanhos:
  - Títulos: 32px
  - Subtítulos: 18px
  - Texto: 16px
  - Pequeno: 14px

### Espaçamento
- Padding padrão: 20px
- Gaps: 30px
- Margens: múltiplos de 5px

### Sombras
- Padrão: 0 2px 6px rgba(0, 0, 0, 0.05)
- Elevada: 0 4px 15px rgba(0, 0, 0, 0.1)

## Dicas de Implementação

1. **Novos Componentes**
   - Seguir padrão de variáveis
   - Manter consistência visual
   - Testar responsividade

2. **Modificações**
   - Usar classes existentes quando possível
   - Manter hierarquia visual
   - Respeitar espaçamentos padrão

3. **Responsividade**
   - Mobile-first approach
   - Usar unidades flexíveis (rem, %)
   - Breakpoints consistentes