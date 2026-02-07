# 🔒 Política de Segurança

## Informações Sensíveis

### ✅ Seguro (Público)

- Código-fonte do frontend
- Estrutura do projeto
- Documentação de API
- Nomes de componentes
- URLs públicas

### ❌ NUNCA Commitar

- `.env.local` ou `.env` com valores reais
- Chaves de API
- Senhas ou tokens
- Dados de desenvolvimento com informações reais
- Arquivos de configuração com secrets

### Configuração Correta

```bash
# Criar arquivo local (não versionado)
cp .env.example .env.local

# Adicionar ao .gitignore (já configurado)
.env*
!.env.example

# Verificar que .env.local NÃO está no git
git ls-files | grep -E '^\.env'  # Não deve estar listado
```

## Variáveis de Ambiente Seguras

### Development

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
AUTH_SERVER_BACKEND_URL=http://localhost:3001
```

### Production (Vercel)

Adicionar via Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://api-production.example.com
AUTH_SERVER_BACKEND_URL=https://auth-production.example.com
```

## HTTPS & SSL

- ✅ Sempre use HTTPS em produção
- ✅ Certificado SSL válido e não expirado
- ✅ Force HTTPS via redirects
- ✅ HSTS headers configurados

## Headers de Segurança

Já configurados em `vercel.json`:

- `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- `X-Frame-Options: SAMEORIGIN` - Previne Clickjacking
- `X-XSS-Protection: 1; mode=block` - Proteção XSS
- `Referrer-Policy: strict-origin-when-cross-origin` - Controla referrer

## Validação & Sanitização

### Client-Side (Implementado)

- ✅ TypeScript para type safety
- ✅ Validação de campos antes de submit
- ✅ Confirmação para operações críticas (deletar)
- ✅ Tratamento de erros com mensagens amigáveis

### Server-Side (Backend)

- ⚠️ Responsabilidade do backend:
  - Validar todos os inputs
  - Sanitizar dados (XSS, SQL Injection)
  - Implementar autenticação/autorização
  - Rate limiting
  - CORS configurado corretamente

## CORS Configuration

Backend deve incluir:

```
Access-Control-Allow-Origin: https://seu-dominio.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Logs & Monitoring

### Remover em Produção

- ✅ Removidos `console.log()` de debug
- ✅ Sem URLs hardcoded
- ✅ Sem dados sensíveis em logs

### Implementar

- Setup Sentry para error tracking
- Google Analytics para eventos
- LogRocket para session replay (opcional)
- Monitoring de performance

## Versionamento

Mantenha dependências atualizadas:

```bash
npm outdated
npm update
npm audit
npm audit fix
```

## Backup & Disaster Recovery

- ✅ Código em GitHub (backup automático)
- ✅ .env.local em local seguro (1Password, LastPass)
- ✅ Database backup configurado no backend
- ✅ Plano de rollback para deploy

## Endpoints Públicos vs Privados

### Públicos (Sem Autenticação)

- GET /car - Listar veículos
- GET /dashboard - Dados públicos

### Privados (Requer Autenticação) - Futuro

- POST /car - Criar veículo
- PUT /car/{id} - Editar veículo
- DELETE /car/{id} - Deletar veículo
- POST /relatorio - Gerar relatório

Implementar autenticação no backend com JWT/OAuth.

## Rate Limiting

Backend deve implementar:

- Limite de 100 requisições/minuto por IP
- Throttling para operações de escrita
- Captcha para fluxos críticos

## Dados Privados do Usuário

Atualmente: Sem autenticação/perfis de usuário

Quando implementar:

- Hash senhas com bcrypt
- Tokens JWT com expiração curta (15min)
- Refresh tokens com expiração longa (30 dias)
- Cookies HTTP-only para sessão
- GDPR compliance para dados pessoais

## Checklist Final de Produção

- [ ] `.env.local` configurado e NÃO commitado
- [ ] HTTPS ativado
- [ ] SSL certificate válido
- [ ] Headers de segurança configurados
- [ ] console.logs removidos
- [ ] CORS do backend correto
- [ ] Rate limiting ativado
- [ ] Monitoring configurado
- [ ] Backup automático
- [ ] Disaster recovery testado
- [ ] Política de senhas
- [ ] 2FA para admin (quando houver)

---

**Última atualização**: 07/02/2026  
**Status**: ✅ Pronto para Produção
