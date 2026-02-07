# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-07

### 🎉 Release Inicial - Production Ready

#### Added - Adicionado

**Documentação**

- 📘 README.md completo com guia de instalação, estrutura, e deployment
- 📘 SECURITY.md com políticas de segurança e checklist
- 📘 DEPLOYMENT.md com guias passo-a-passo para 3 ambientes (Vercel, Docker, Nginx)
- 📘 CHANGELOG.md (este arquivo)

**Configuração & Build**

- ✅ Next.js 16.1.6 com Turbopack compiler
- ✅ TypeScript 5 para type safety
- ✅ Tailwind CSS 4 + Custom CSS variables
- ✅ `vercel.json` com security headers e configuração de deploy
- ✅ `.env.example` com template de variáveis de ambiente
- ✅ `.gitignore` com exclusão de secrets

**Features - Dashboard**

- 📊 Página de dashboard com 4 métricas principais
  - Total de carros
  - Valor total dos veículos
  - Veículos disponíveis
  - Preço médio
- 📈 Sparkline visualizando últimos 12 preços
- 💡 Cards de sugestões (Analytics, Tracking, Seguro)
- 📱 Responsivo para desktop/tablet/mobile

**Features - Gerenciamento de Carros**

- 🚗 Página CRUD completa para veículos
  - **Create**: Formulário para adicionar novo carro
  - **Read**: Lista de carros em cards responsivos
  - **Update**: Editar veículo (populate form + PUT request)
  - **Delete**: Deletar com confirmação
- 📝 Formulário com validação
  - Campos: Modelo, Marca, Ano, Preço, Quilometragem, Cor, Disponibilidade
  - Cancelar edição e limpar form
  - Mensagens de sucesso/erro
- 🎯 Card layout com ações (Editar/Deletar)

**Features - UI/UX**

- 🎨 Design System com CSS variables
  - Paleta de cores (Roxo #5b6bff, #7b4dff, Dark theme)
  - Componentes reutilizáveis (.btn, .card, .input)
  - Progress bars responsivas
- 📱 Responsividade
  - Desktop 2-column layout
  - Tablet ajuste dinâmico
  - Mobile single-column
  - Breakpoints: 1200px, 900px, 600px
- 🧭 Navbar com menu responsivo

**Components**

- `CarForm.tsx` - Formulário unificado (add/edit mode)
- `CarTable.tsx` - Grid de cards com ações
- `Navbar.tsx` - Navegação responsiva

**API Integration**

- 🔧 Comunicação com backend via fetch
- 📍 Endpoints implementados:
  - GET `/car` - Listar carros (dashboard + lista)
  - POST `/car` - Criar novo carro
  - PUT `/car/{id}` - Atualizar carro
  - DELETE `/car/{id}` - Deletar carro
  - GET `/relatorio/carros/txt` - Download relatório
- ✅ Tratamento de erros com feedback ao usuário
- ✅ Validação de Content-Type

**Security**

- 🔒 NEXT_PUBLIC_API_URL para comunicação segura
- 🔒 Nenhum hardcoded secret no código
- 🔒 Security headers configurados (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- 🔒 .env.local não versionado (.gitignore)
- 🔒 Confirmação antes de deletar (não-destruitivo)

**Production Readiness**

- ✅ Build otimizado (Next.js production build)
- ✅ Console.logs removidos (sem debug em produção)
- ✅ Variáveis de ambiente configuradas
- ✅ Suporta 3 ambientes de deploy (Vercel, Docker, Nginx)
- ✅ Documentação completa de deploy

#### Fixed - Corrigido

- 🐛 API error com NEXT_PUBLIC_API_URL não definida
- 🐛 Edit functionality agora popula form e envia PUT request
- 🐛 Mobile layout não responsivo (2-col não adaptava)
- 🐛 Formulário muito pequeno em mobile (aumentado padding/font)
- 🐛 Sem feedback ao usuário após create/update

#### Removed - Removido

- ❌ Console.log('API URL') de debugging
- ❌ Valores hardcoded de URLs
- ❌ Senhas/tokens em código (movido para .env.local)

#### Changed - Alterado

- 📝 Car display: De tabela simples → Cards com ações
- 📝 API error handling: De falha silenciosa → Mensagens amigáveis
- 📝 Form behavior: De adicionar-only → Adicionar ou Editar

#### Deprecated - Descontinuado

- ⚠️ Tabela HTML de carros (substituída por cards)

---

## [Unreleased] - Em Desenvolvimento

### Planejado para Futuro

#### Features

- [ ] Autenticação (JWT/OAuth)
- [ ] Perfis de usuário
- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] Filtros avançados
- [ ] Paginação na lista de carros
- [ ] Upload de imagens de carros
- [ ] Histórico de preços (gráfico)
- [ ] Notificações em tempo real
- [ ] Dark mode toggle (atualmente dark-only)

#### Infrastructure

- [ ] GitHub Actions CI/CD
- [ ] Testing (Jest + React Testing Library)
- [ ] E2E testing (Cypress/Playwright)
- [ ] Sentry error tracking
- [ ] Monitoring e Analytics
- [ ] Database backup automation
- [ ] Rate limiting global

#### Security

- [ ] Implementar 2FA
- [ ] GDPR compliance
- [ ] Política de cookies consentida
- [ ] Audit logs

---

## Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0
|_|_|
| | └─ PATCH: Bug fixes - compatível com 1.0.x
| └─── MINOR: Novas features - compatível com 1.x
└───── MAJOR: Breaking changes - requer atualização
```

### Exemplos

- `1.0.0` → `1.0.1` : Bug fix (incluir em 1.0.z)
- `1.0.1` → `1.1.0` : Nova feature (backwards compatible)
- `1.1.0` → `2.0.0` : Breaking change (incompatível com 1.x)

---

## Como Contribuir

1. Crie uma branch `feature/nome-da-feature` ou `bugfix/nome-do-bug`
2. Faça suas alterações
3. Atualize versão em `package.json`
4. Documente mudanças em um bloco novo acima de `[Unreleased]`
5. Abra PR com descrição clara

### Estrutura de Commit

```
tipo(escopo): descrição curta

Descrição mais longa explicando:
- O que foi mudado
- Por quê foi mudado
- Impacto da mudança

Fixes #123 (número da issue)
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

#### Exemplos

```
feat(dashboard): adicionar sparkline de preços

- Implementar componente de sparkline
- Calcular últimos 12 preços
- Adicionar tooltip com data

Fixes #42
```

```
fix(car): corrigir bug de edição não persistent

- Reset form apenas após sucesso da API
- Adicionar try-catch para capturar erros
- Mostrar toast com feedback

Fixes #51
```

1. Faça commit bem testado
2. Push para sua branch
3. Crie Pull Request
4. Equipe revisa e aprova
5. Merge em main dispara deploy automático (Vercel)

---

## Release Process

### Para fazer um Release

```bash
# 1. Criar tag
git tag -a v1.1.0 -m "Release 1.1.0 - Nova feature X"

# 2. Push tag
git push origin v1.1.0

# 3. GitHub Actions dispara automaticamente:
#    - Build e testa
#    - Deploy em staging
#    - Deploy em produção
#    - Gera release notes

# 4. Verificar em https://github.com/seu-usuario/relatoriocar_front/releases
```

---

## Support

Se encontrou um bug:

1. Verifique se já foi reportado em Issues
2. Crie novo Issue com:
   - Versão do projeto (`npm run build` → verificar package.json)
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se relevante

Se precisa de feature:

1. Verifique em Discussions/Issues
2. Descreva o caso de uso
3. Aguarde feedback da equipe

---

## Histórico de Deploy

| Versão | Data       | Ambiente   | Status  |
| ------ | ---------- | ---------- | ------- |
| 1.0.0  | 2026-02-07 | Production | ✅ Live |

---

## Dependências Principais

| Pacote       | Versão | Uso             |
| ------------ | ------ | --------------- |
| Next.js      | 16.1.6 | Framework React |
| React        | 19.2.3 | UI Library      |
| TypeScript   | 5.7.2  | Type Safety     |
| Tailwind CSS | 4.0.0  | Utility CSS     |
| ESLint       | Latest | Linting         |

Ver `package.json` para lista completa.

---

## Documentação Relacionada

- 📘 [README.md](./README.md) - Visão geral e quick start
- 📘 [SECURITY.md](./SECURITY.md) - Políticas de segurança
- 📘 [DEPLOYMENT.md](./DEPLOYMENT.md) - Guias de deploy
- 📘 [.env.example](./.env.example) - Template de configuração

---

**Atualizado em:** 07/02/2026  
**Mantenedor:** @seu-usuario  
**Licença:** MIT
