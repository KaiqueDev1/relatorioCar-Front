# Relatório Car - Sistema de Gestão de Veículos

> **Plataforma profissional de gerenciamento de inventário de veículos para concessionárias**

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D%2018-brightgreen.svg)

## 📋 Visão Geral

Relatório Car é uma aplicação web moderna desenvolvida com **Next.js 16** e **React 19**, projetada para fornecer uma solução completa de gerenciamento de veículos em concessionárias. O sistema oferece funcionalidades de cadastro, edição, exclusão e visualização de estoque, além de um **dashboard analítico** com métricas de negócio e geração de relatórios.

### ✨ Características Principais

- **Gerenciamento de Veículos**
  - Cadastro completo com modelo, marca, ano, preço, quilometragem e cor
  - Edição inline de dados de veículos
  - Exclusão segura com confirmação
  - Status de disponibilidade

- **Dashboard Analytics**
  - Valor total do estoque em tempo real
  - Contagem de veículos e taxa de disponibilidade
  - Sparkline visual de preços
  - Métricas por marca
  - Sugestões de relatórios avançados

- **Relatórios**
  - Download de relatórios em formato TXT
  - Dados consolidados de inventário
  - Exportação de dados estruturados

- **Interface Responsiva**
  - Design mobile-first
  - Grid adaptativo (desktop/tablet/mobile)
  - PWA-ready
  - Acessibilidade WCAG

- **Performance**
  - Next.js com Turbopack (compilação rápida)
  - Otimização de imagens
  - Code splitting automático
  - Assets pré-carregados

---

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- Backend API rodando (veja configuração abaixo)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/relatoriocar_front.git
   cd relatoriocar_front
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Edite `.env.local` com sua URL de backend:

   ```env
   NEXT_PUBLIC_API_URL=https://seu-backend-api.com
   AUTH_SERVER_BACKEND_URL=https://seu-auth-server.com
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
relatoriocar_front/
├── app/
│   ├── globals.css                 # Estilos globais e responsivos
│   ├── layout.tsx                  # Layout raiz da aplicação
│   ├── page.tsx                    # Página inicial
│   ├── car/
│   │   └── page.tsx               # Página de gerenciamento de carros
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard com analytics
│   ├── auth/                       # Futuro: módulo de autenticação
│   └── components/
│       ├── Navbar.tsx             # Navegação principal
│       ├── CarForm.tsx            # Formulário de adição/edição
│       └── CarTable.tsx           # Tabela/grid de carros
├── public/                         # Assets estáticos
├── .env.example                    # Template de variáveis de ambiente
├── .gitignore                      # Configuração git
├── package.json                    # Dependências e scripts
├── tsconfig.json                   # Configuração TypeScript
├── next.config.ts                  # Configuração Next.js
├── tailwind.config.js              # Configuração Tailwind CSS
└── README.md                       # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 16.1.6** - Framework React com SSR/SSG
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utilidades CSS

### Development

- **Turbopack** - Compilador rápido (Next.js)
- **ESLint 9** - Linter de código
- **Node 18+** - Runtime JavaScript

### DevOps

- **Vercel** - Plataforma de deploy recomendada
- **Docker** - Containerização (opcional)

---

## 📝 Páginas e Funcionalidades

### 1. **Página Inicial** (`/`)

- Landing page com apresentação do sistema
- Navegação para seções principais
- Links rápidos para carros e dashboard

### 2. **Gerenciador de Carros** (`/car`)

#### Layout Responsivo

- **Desktop**: Grid 2 colunas (formulário | lista)
- **Tablet/Mobile**: Single column (formulário | lista empilhados)

#### Funcionalidades

**Formulário de Adição/Edição**

- Campos: Modelo, Marca, Ano, Preço (R$), Quilometragem, Cor
- Checkbox de disponibilidade
- Modo edição com preenchimento automático
- Botões: Adicionar | Atualizar (dinâmico) | Cancelar

**Lista de Veículos (Blocos/Cards)**

- Grid responsivo de cards
- Informações: Modelo, Marca, Ano, Cor, KM, Preço, Status
- Ações por card: Editar, Deletar
- Confirmação de exclusão com segurança

#### API Endpoints Utilizados

```
GET    /car                  # Listar todos os veículos
POST   /car                  # Criar novo veículo
PUT    /car/{id}             # Atualizar veículo
DELETE /car/{id}             # Deletar veículo
```

### 3. **Dashboard Analytics** (`/dashboard`)

#### Métricas Exibidas

- **Valor Total do Estoque** - Soma de todos os preços
- **Total de Carros** - Contagem de veículos
- **Veículos Disponíveis** - Count + barra de progresso
- **Valor Médio** - Preço médio por unidade
- **Marcas Distintas** - Contagem de marcas únicas

#### Visualizações

- Sparkline de preços (últimos 12 carros)
- Cards com ícones visuais
- Sugestões de métricas adicionais

#### API Endpoints Utilizados

```
GET    /car                  # Buscar todos os carros (para cálculos)
```

### 4. **Componentes Reutilizáveis**

**Navbar.tsx**

- Navegação fixa com links: Início, Carros, Dashboard
- Logo e título da aplicação
- Menu responsivo com wrap em mobile

**CarForm.tsx**

- Componente reutilizável para adição/edição
- Props: `onSuccess`, `editingCar`, `onCancelEdit`
- Suporta modo novo e edição
- Validação básica client-side

**CarTable.tsx**

- Exibição de lista de carros em cards
- Props: `cars`, `onEdit`, `onDelete`
- Ações de edição e exclusão
- Grid adaptativo

---

## 🎨 Design & UX

### Paleta de Cores

```css
--bg-900: #0b0d10 /* Background escuro */ --bg-800: #0f1720 /* Background secundário */ --panel: #0f1724 /* Painéis */ --muted: #9aa4b2 /* Texto muted */
  --text: #e6eef6 /* Texto principal */ --accent-start: #5b6bff /* Gradiente start (roxo) */ --accent-end: #7b4dff /* Gradiente end (roxo) */;
```

### Responsividade

| Breakpoint | Largura    | Comportamento                                 |
| ---------- | ---------- | --------------------------------------------- |
| Desktop    | > 1200px   | 2 colunas, tabelas, full-size                 |
| Tablet     | 768-1200px | 1 coluna, cards                               |
| Mobile     | < 768px    | Fullwidth, cards empilhados, fontes reduzidas |

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev (hot-reload)

# Build & Production
npm run build        # Build otimizado para produção
npm start           # Inicia servidor production

# Qualidade de Código
npm run lint        # Executa ESLint
```

---

## 🔐 Segurança & Boas Práticas

### ✅ Implementado

- ✓ Variáveis de ambiente em `.env.local` (nunca commitar)
- ✓ `.env.example` com placeholders seguros
- ✓ `.gitignore` configurado corretamente
- ✓ HTTPS recomendado para production
- ✓ Validação de entrada client-side
- ✓ Confirmação de exclusão (UX safety)
- ✓ TypeScript para type safety
- ✓ ESLint para code quality

### 🔄 Fluxos Recomendados para API

**Adição de Veículo**

```
1. Usuário preenche formulário
2. Clica "Adicionar Carro"
3. Validação client-side
4. POST /car (JSON body)
5. Success: Limpa formulário + Recarrega lista
6. Error: Mostra alert com mensagem
```

**Edição de Veículo**

```
1. Usuário clica "Editar" no card
2. Formulário popula com dados
3. Usuário modifica campos
4. Clica "Atualizar Carro"
5. PUT /car/{id} (JSON body com dados)
6. Success: Limpa edição + Recarrega lista
7. Error: Mostra alert
```

**Exclusão de Veículo**

```
1. Usuário clica "Deletar" no card
2. Confirmação: "Tem certeza que deseja deletar este carro?"
3. Se confirmar: DELETE /car/{id}
4. Success: Recarrega lista + Alert
5. Error: Alert com mensagem de erro
```

### Tratamento de Erros

- Status 400+: Mostra alert com mensagem de erro
- Conexão falha: Console error + alert
- Validação: Client-side antes do submit

---

## 📦 Deploy

### Vercel (Recomendado - Next.js Native)

1. **Push do código para GitHub**

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Conecte no Vercel**
   - Vá para https://vercel.com/new
   - Importe o repositório GitHub
   - Vercel detectará automaticamente como Next.js

3. **Configure variáveis de ambiente**
   - Em "Settings > Environment Variables", adicione:
     ```
     NEXT_PUBLIC_API_URL=https://seu-api-production.com
     AUTH_SERVER_BACKEND_URL=https://seu-auth-production.com
     ```

4. **Deploy automático**
   - Cada push para `main` fará deploy automático
   - Vercel gera preview URL para branches

### Docker (Alternativa)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t relatoriocar-front .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.com relatoriocar-front
```

### Nginx (Self-hosted)

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 Relatórios & Exportação

### Formato de Relatório (TXT)

```
Relatório gerado em: 07/02/2026 10:30:45

1) Total de carros: 3
2) Veículos disponíveis: 2
3) Valor total da concessionária (R$): 75000.00
4) Valor médio por veículo (R$): 25000.00

Contagem por marca:
- Honda: 1
- Volkswagen: 2

Lista de veículos (resumida):
1. Civic | Honda | 2009 | R$ 20000.00 | KM: 150000 | Disponível: Sim
2. Gol | Volkswagen | 2000 | R$ 15000.00 | KM: 200000 | Disponível: Não
3. Jetta | Volkswagen | 2017 | R$ 40000.00 | KM: 100000 | Disponível: Sim

Sugestões de métricas adicionais e itens para incluir no relatório:
- Distribuição de quilometragem (faixas)
- Top 5 modelos por quantidade
- Valor por marca (soma/ média)
...
```

---

## 🚨 Checklist de Deploy

- [ ] `.env.local` configurado com URLs de produção
- [ ] `.env.local` **não commitado** (verificar `.gitignore`)
- [ ] `.env.example` atualizado com placeholders
- [ ] `npm run build` executa sem erros
- [ ] `npm run lint` sem warnings críticos
- [ ] Backend API acessível e CORS configurado
- [ ] HTTPS ativado em produção
- [ ] Certificado SSL válido
- [ ] Domínio DNS apontando para IP/CDN
- [ ] Monitoramento de erros configurado (Sentry, LogRocket)
- [ ] Analytics associado (GA, Mixpanel)
- [ ] Backup da database configurado
- [ ] Rate limiting no backend
- [ ] Logs centralizados

---

## 📞 Suporte & Contribuição

### Reportar Issues

1. Abra uma issue no GitHub
2. Descreva o problema com passos para reproduzir
3. Anexe screenshots se aplicável
4. Indicar versão do Node.js e browser

### Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit suas mudanças: `git commit -m 'Add: nova funcionalidade'`
4. Faça push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📄 Changelog

### v0.1.0 (2025-02-07)

- ✅ Inicialização do projeto com Next.js 16
- ✅ Configuração de TypeScript e Tailwind CSS
- ✅ Página inicial de landing
- ✅ Gerenciador de carros (CRUD completo)
- ✅ Dashboard com analytics e métricas
- ✅ Design responsivo (mobile-first)
- ✅ Componentes reutilizáveis
- ✅ Integração com API REST backend
- ✅ Download de relatórios (TXT)
- ✅ Tratamento de erros e validações
- ✅ Documentação completa

---

## 📄 Licença

Este projeto está sob licença MIT. Veja [LICENSE](./LICENSE) para detalhes.

---

## 🙌 Agradecimentos

Desenvolvido como um projeto educacional para demonstrar boas práticas em desenvolvimento frontend com Next.js, React e TypeScript.

---

## 📮 Contato

Para dúvidas ou sugestões:

- **Email**: dev@relatoriocar.com
- **Issues**: GitHub Issues
- **Documentação**: [Wiki do Projeto]

---

**Versão**: 0.1.0  
**Última atualização**: 07 de Fevereiro de 2026  
**Status**: ✅ Pronto para Deploy
