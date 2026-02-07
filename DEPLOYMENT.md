# 🚀 Guia de Deploy

## 📍 Índice

1. [Antes de Fazer Deploy](#antes-de-fazer-deploy)
2. [Deploy na Vercel (Recomendado)](#deploy-na-vercel-recomendado)
3. [Deploy com Docker](#deploy-com-docker)
4. [Deploy com Nginx](#deploy-com-nginx)
5. [Monitoramento & Logs](#monitoramento--logs)
6. [Troubleshooting](#troubleshooting)

---

## Antes de Fazer Deploy

### ✅ Checklist Pré-Deploy

```bash
# 1. Verificar que o build local funciona
npm run build

# 2. Simular produção localmente
npm run start

# 3. Verificar que nenhum secret está exposto
git ls-files | grep -E '\.env$'  # Não deve listar nada
grep -r "hardcode\|password\|secret\|token\|api_key" --include="*.tsx" --include="*.ts"

# 4. Fazer commit final
git add .
git commit -m "Deploy ready: security audit passed"
git push origin main

# 5. Validar ambiente de produção
echo $NEXT_PUBLIC_API_URL
echo $AUTH_SERVER_BACKEND_URL
```

### 📋 Variáveis de Ambiente Necessárias

```env
# ESSENCIAL - Frontend
NEXT_PUBLIC_API_URL=https://api-production.example.com

# FUTURO - Autenticação
AUTH_SERVER_BACKEND_URL=https://auth-production.example.com

# OPTIONAL - Analytics
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Deploy na Vercel (Recomendado)

### Opção 1: Via Interface Gráfica (Mais Fácil)

1. **Acesse Vercel**
   - Vá para https://vercel.com
   - Clique em "Log In" e autentique com GitHub/GitLab/Bitbucket

2. **Criar Novo Projeto**
   - Clique em "New Project"
   - Selecione seu repositório `relatoriocar_front`
   - Vercel detectará automaticamente que é Next.js

3. **Configurar Ambiente**
   - Vá para Settings → Environment Variables
   - Adicione:
     ```
     NEXT_PUBLIC_API_URL = https://api-production.example.com
     AUTH_SERVER_BACKEND_URL = https://seu-auth-server.com
     ```

4. **Deploy**
   - Clique em "Deploy"
   - Vercel fará build e publicará automaticamente
   - URL fornecida: `https://seu-projeto.vercel.app`

5. **Configurar Domínio Personalizado (Opcional)**
   - Settings → Domains
   - Adicione seu domínio (ex: carros.seudominio.com)
   - Atualize DNS conforme instruções

### Opção 2: Via CLI (Mais Rápido)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Autenticar
vercel login

# 3. Deploy
vercel --prod

# 4. Configurar variáveis de ambiente via CLI
vercel env add NEXT_PUBLIC_API_URL
# Digite a URL de produção

vercel env add AUTH_SERVER_BACKEND_URL
# Digite a URL do auth server

# 5. Redeploy com variáveis
vercel --prod
```

### Vercel Features Inclusos

- ✅ HTTPS automático com certificado SSL gratuito
- ✅ CDN global
- ✅ Deploy automático em cada push para main
- ✅ Preview links para PRs
- ✅ Analytics de performance
- ✅ Security headers (já configurados em vercel.json)
- ✅ Serverless functions se precisar (API routes)

### Monitoramento no Vercel

- Dashboard → Analytics
  - Real-time requests, response time, status codes
  - Gráfico de performance
  - Cache hits vs misses

- Logs → Function Logs
  - Ver logs em tempo real
  - Histórico de deploy

---

## Deploy com Docker

### Preparação

```bash
# 1. Criar Dockerfile
cat > Dockerfile << 'EOF'
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variáveis de build
ARG NEXT_PUBLIC_API_URL
ARG AUTH_SERVER_BACKEND_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_SERVER_BACKEND_URL=$AUTH_SERVER_BACKEND_URL

RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
EOF

# 2. Criar .dockerignore
cat > .dockerignore << 'EOF'
.git
.gitignore
node_modules
npm-debug.log
.next
.env.local
.env
.DS_Store
EOF
```

### Build & Run Localmente

```bash
# Build image
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg AUTH_SERVER_BACKEND_URL=https://auth.example.com \
  -t carros-app:latest .

# Testar localmente
docker run -p 3000:3000 carros-app:latest

# Verificar em http://localhost:3000
```

### Deploy no Servidor (Ubuntu/Debian)

```bash
# 1. Instalar Docker e Docker Compose
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker $USER

# 2. Fazer login em registry (Docker Hub / GitHub Container Registry)
docker login

# 3. Push image
docker tag carros-app:latest seu-usuario/carros-app:latest
docker push seu-usuario/carros-app:latest

# 4. No servidor, criar docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  carros-app:
    image: seu-usuario/carros-app:latest
    container_name: carros-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api-production.com
      - AUTH_SERVER_BACKEND_URL=https://auth-production.com
      - NODE_ENV=production
    volumes:
      - /data/carros-logs:/app/.next/.logs
    networks:
      - carros-network

networks:
  carros-network:
    driver: bridge
EOF

# 5. Iniciar containers
docker-compose up -d

# 6. Verificar
docker ps
docker logs -f carros-app

# 7. Atualizar imagem (novo deploy)
docker-compose pull
docker-compose up -d
```

### Docker com Nginx + Let's Encrypt

```bash
# Criar containers/docker-compose.nginx.yml
cat > docker-compose.nginx.yml << 'EOF'
version: '3.8'

services:
  app:
    image: seu-usuario/carros-app:latest
    container_name: carros-app
    restart: always
    expose:
      - "3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api-production.com
      - AUTH_SERVER_BACKEND_URL=https://auth-production.com
      - NODE_ENV=production
    networks:
      - carros-network

  nginx:
    image: nginx:alpine
    container_name: carros-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./www:/var/www/certbot:ro
    depends_on:
      - app
    networks:
      - carros-network

networks:
  carros-network:
    driver: bridge
EOF

# Obter certificado SSL via Let's Encrypt
certbot certonly --standalone -d seu-dominio.com

# copiar certificados para ./ssl/
```

---

## Deploy com Nginx

### Setup Manual (Ubuntu/Debian)

```bash
# 1. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Instalar Nginx
sudo apt-get install -y nginx

# 3. Clonar repo e instalar deps
cd /var/www
sudo git clone https://github.com/seu-usuario/relatoriocar_front.git
cd relatoriocar_front
npm ci --production

# 4. Build
NEXT_PUBLIC_API_URL=https://api-production.com npm run build

# 5. Criar arquivo systemd para auto-start
sudo tee /etc/systemd/system/carros-app.service << 'EOF'
[Unit]
Description=Carros Report App
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/relatoriocar_front
Environment="NEXT_PUBLIC_API_URL=https://api-production.com"
Environment="AUTH_SERVER_BACKEND_URL=https://auth-production.com"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable carros-app
sudo systemctl start carros-app

# 6. Configurar Nginx como reverse proxy
sudo tee /etc/nginx/sites-available/carros-app << 'EOF'
upstream carros_backend {
    server localhost:3000;
}

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    # Redirect HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;

    # SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    # SSL Hardening
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://carros_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files (cache por 1 ano)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Next.js static directory
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 7. Ativar configuração
sudo ln -s /etc/nginx/sites-available/carros-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 8. Setup Certbot (renovação automática)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com
sudo certbot renew --dry-run  # Testar renovação automática
```

### Monitoramento

```bash
# Ver logs da aplicação
sudo journalctl -u carros-app -f --lines=100

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Verificar espaço em disco
df -h

# Verificar uso de memória
free -m

# Reiniciar se necessário
sudo systemctl restart carros-app
```

---

## Monitoramento & Logs

### Logging

```typescript
// Implementar em producation (app/lib/logger.ts)
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          message,
          data,
        }),
      );
    }
  },
  error: (message: string, error?: Error) => {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        error: error?.message,
        stack: error?.stack,
      }),
    );
  },
};
```

### Sentry (Error Tracking)

```bash
# 1. Instalar
npm install @sentry/nextjs

# 2. Configurar em .env.local
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/project-id

# 3. Criar next.config.ts com Sentry
import { withSentryConfig } from "@sentry/nextjs";

const config = {
  // ... sua config
};

export default withSentryConfig(config, {
  org: "sua-organization",
  project: "carros-app",
})
```

### Google Analytics

```typescript
// Adicionar ao layout.tsx
import Script from 'next/script'

export default function RootLayout({children}) {
  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Troubleshooting

### Build falha

```bash
# Limpar cache
rm -rf .next node_modules package-lock.json

# Reinstalar
npm install

# Redigitar build
npm run build
```

### App lenta em produção

```bash
# Verificar que está usando mode: 'production' na build
npm run build

# Verificar bundle size
npm run build-- --analyze

# Otimizar imagens em /public
```

### CORS Error

```
Error: Access to XMLHttpRequest from origin blocked by CORS
```

→ Backend deve ter `Access-Control-Allow-Origin: https://seu-dominio.com`

### Variáveis de ambiente não funcionando

```bash
# Lembrar: NEXT_PUBLIC_ é exposto ao browser
# Sem NEXT_PUBLIC_ fica privado do servidor

# Verificar que está definida
echo $NEXT_PUBLIC_API_URL

# Build precisa da variável em tempo de build
NEXT_PUBLIC_API_URL=https://api.com npm run build
```

### Node memory exceeded

```bash
# Aumentar limite
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# Docker: aumentar mem limit
docker run -m 4g carros-app:latest
```

---

## Rollback (Desfazer Deploy)

### Vercel

```
Vercel Dashboard → Deployments → Clique no deploy anterior → "Promote to Production"
```

### Docker

```bash
# Ver histórico de imagens
docker image ls | grep carros-app

# Usar versão anterior
docker run -p 3000:3000 carros-app:v1.0.0
```

### Nginx + Systemd

```bash
# Ver commits
git log --oneline

# Reverter código
git checkout <commit-hash>

# Rebuild
npm run build

# Restart
sudo systemctl restart carros-app
```

---

**Status Final**: ✅ Pronto para qualquer ambiente de produção

Para dúvidas específicas, consulte SECURITY.md para questões de segurança.
