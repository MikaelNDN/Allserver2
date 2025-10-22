# Documentação do Frontend - AllServe

## Estrutura de Páginas

### `HomePage.jsx`
- **Responsabilidade**: Página inicial do site
- **Funcionalidades**:
  - Mostrar banner/hero section
  - Listar categorias de profissionais
  - Mostrar profissionais em destaque
- **APIs necessárias no Backend**:
  - `GET /api/profissionais/destaques` - Retornar lista de profissionais em destaque
  - `GET /api/categorias` - Retornar lista de categorias disponíveis

### `ProfissionaisPage.jsx`
- **Responsabilidade**: Listar todos os profissionais
- **Funcionalidades**:
  - Filtrar por categoria
  - Ordenar por preço/avaliação
  - Paginação dos resultados
- **APIs necessárias no Backend**:
  - `GET /api/profissionais` - Lista paginada de profissionais
    - Query params: categoria, ordenacao, pagina, limite
  - `GET /api/profissionais/filtros` - Retornar opções de filtros disponíveis

### `PerfilPage.jsx`
- **Responsabilidade**: Mostrar perfil detalhado do profissional
- **Funcionalidades**:
  - Informações completas do profissional
  - Avaliações e comentários
  - Calendário de disponibilidade
  - Botão de contratação
- **APIs necessárias no Backend**:
  - `GET /api/profissionais/:id` - Detalhes do profissional
  - `GET /api/profissionais/:id/avaliacoes` - Lista de avaliações
  - `GET /api/profissionais/:id/disponibilidade` - Calendário de horários
  - `POST /api/contratacoes` - Iniciar processo de contratação

### `CarrinhoPage.jsx`
- **Responsabilidade**: Gerenciar serviços selecionados
- **Funcionalidades**:
  - Listar serviços no carrinho
  - Calcular total
  - Aplicar cupom de desconto
  - Finalizar pedido
- **APIs necessárias no Backend**:
  - `GET /api/carrinho` - Recuperar itens do carrinho
  - `POST /api/carrinho` - Adicionar item ao carrinho
  - `DELETE /api/carrinho/:itemId` - Remover item do carrinho
  - `POST /api/carrinho/cupom` - Validar e aplicar cupom
  - `POST /api/pedidos` - Criar pedido a partir do carrinho

### `UsuarioPage.jsx`
- **Responsabilidade**: Perfil e configurações do usuário
- **Funcionalidades**:
  - Dados pessoais
  - Histórico de pedidos
  - Endereços salvos
  - Métodos de pagamento
- **APIs necessárias no Backend**:
  - `GET /api/usuarios/perfil` - Dados do usuário
  - `PUT /api/usuarios/perfil` - Atualizar dados
  - `GET /api/usuarios/pedidos` - Histórico de pedidos
  - `GET /api/usuarios/enderecos` - Lista de endereços
  - `POST /api/usuarios/enderecos` - Adicionar endereço
  - `GET /api/usuarios/pagamentos` - Métodos de pagamento salvos

### `SobrePage.jsx`
- **Responsabilidade**: Página institucional
- **Funcionalidades**:
  - Informações sobre a empresa
  - Termos de uso
  - Política de privacidade
- **APIs necessárias no Backend**:
  - `GET /api/info/sobre` - Conteúdo institucional
  - `GET /api/info/termos` - Termos de uso
  - `GET /api/info/privacidade` - Política de privacidade

## Componentes Principais

### `Header.jsx`
- **Responsabilidade**: Navegação principal
- **Funcionalidades**:
  - Menu de categorias
  - Busca
  - Carrinho
  - Login/Cadastro
- **APIs necessárias no Backend**:
  - `GET /api/auth/status` - Verificar status de autenticação
  - `GET /api/categorias` - Menu de categorias
  - `GET /api/busca` - Busca geral no site

### `Footer.jsx`
- **Responsabilidade**: Rodapé do site
- **Funcionalidades**:
  - Links institucionais
  - Newsletter
  - Redes sociais
- **APIs necessárias no Backend**:
  - `POST /api/newsletter` - Cadastrar email na newsletter

### `ProfissionalCard.jsx`
- **Responsabilidade**: Card de profissional na listagem
- **Funcionalidades**:
  - Foto e informações básicas
  - Avaliação média
  - Preço base
  - Link para perfil completo
- **APIs necessárias no Backend**:
  - (Usa dados já carregados pela página pai)

### `ServiceModal.jsx`
- **Responsabilidade**: Modal de detalhes do serviço
- **Funcionalidades**:
  - Descrição completa
  - Opções/variações
  - Adicionar ao carrinho
- **APIs necessárias no Backend**:
  - `GET /api/servicos/:id` - Detalhes do serviço
  - `POST /api/carrinho` - Adicionar ao carrinho

## Contextos

### `CartContext.jsx`
- **Responsabilidade**: Gerenciar estado do carrinho
- **Funcionalidades**:
  - Adicionar/remover itens
  - Calcular totais
  - Persistir carrinho
- **APIs necessárias no Backend**:
  - `GET /api/carrinho` - Sincronizar carrinho
  - `PUT /api/carrinho` - Atualizar carrinho

## Arquivos de Configuração/Dados

### `database.js`
- **Responsabilidade**: Dados mockados para desenvolvimento
- **Substituição no Backend**:
  - Criar endpoints correspondentes retornando dados reais do banco
  - Manter mesma estrutura de dados para compatibilidade

### `vite.config.js`
- **Responsabilidade**: Configuração do build
- **Considerações Backend**:
  - Configurar CORS para permitir acesso do frontend
  - Configurar proxy em desenvolvimento se necessário

## Endpoints Necessários (Resumo)

### Autenticação
```
POST /api/auth/login
POST /api/auth/registro
POST /api/auth/logout
GET /api/auth/status
```

### Profissionais
```
GET /api/profissionais
GET /api/profissionais/:id
GET /api/profissionais/destaques
GET /api/profissionais/:id/avaliacoes
GET /api/profissionais/:id/disponibilidade
```

### Carrinho e Pedidos
```
GET /api/carrinho
POST /api/carrinho
DELETE /api/carrinho/:itemId
POST /api/carrinho/cupom
POST /api/pedidos
GET /api/pedidos/:id
```

### Usuário
```
GET /api/usuarios/perfil
PUT /api/usuarios/perfil
GET /api/usuarios/pedidos
GET /api/usuarios/enderecos
POST /api/usuarios/enderecos
GET /api/usuarios/pagamentos
```

### Outros
```
GET /api/categorias
GET /api/busca
POST /api/newsletter
GET /api/info/*
```

## Estrutura de Dados Principal

### Profissional
```javascript
{
  id: string,
  nome: string,
  telefone: string,
  instagram: string,
  preco: number,
  avaliacao: number,
  numAvaliacoes: number,
  imagem: string,
  resumo: string,
  tags: string[],
  categoria: string,
  especialidade: string,
  descricaoCompleta: string
}
```

### Pedido
```javascript
{
  id: string,
  usuario: string,
  profissional: string,
  servicos: Array<{
    id: string,
    nome: string,
    preco: number,
    quantidade: number
  }>,
  status: string,
  total: number,
  data: string,
  pagamento: {
    metodo: string,
    status: string
  }
}
```

### Usuário
```javascript
{
  id: string,
  nome: string,
  email: string,
  telefone: string,
  enderecos: Array<{
    id: string,
    rua: string,
    numero: string,
    complemento: string,
    cidade: string,
    estado: string,
    cep: string
  }>,
  pagamentos: Array<{
    id: string,
    tipo: string,
    ultimos4Digitos: string
  }>
}
```