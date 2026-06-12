# Well na Estrada

Plataforma premium de consultoria e intercâmbio para a Irlanda.

## 🚀 Desenvolvimento Local

Este projeto utiliza uma infraestrutura isolada e robusta baseada em Docker para garantir consistência entre ambientes.

### 1. Pré-requisitos

- Docker & Docker Compose
- Node.js 18+
- NPM

### 2. Infraestrutura (Docker)

Inicie os serviços de banco de dados e API:

```bash
docker compose up -d
```

Isso iniciará:

- **well-db**: PostgreSQL 15 (Porta `54322`)
- **well-api**: PostgREST API (Porta `8000`)
- **well-adminer**: Painel de Gerenciamento de DB (Porta `8080`)

### 3. Aplicação (Next.js)

```bash
npm install
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001) (ou a porta disponível indicada pelo Next.js).

---

## 🛠️ Gestão de Ambiente (Multi-Project)

Caso você tenha outros projetos Supabase rodando localmente (ex: `avaliaprudente.com.br`), use os seguintes comandos para alternar com segurança:

### Para trabalhar na Well na Estrada:

```bash
# Para o outro projeto (no diretório dele)
supabase stop

# Ou pare manualmente se houver conflito de portas
docker stop $(docker ps -q --filter "name=supabase_")

# Inicie a Well
docker compose up -d
```

### Para voltar ao AvaliaPrudente:

```bash
docker compose stop # Para a Well
# No diretório do avaliaprudente:
supabase start
```

---

## 📊 Estrutura de Dados

O banco de dados já vem pré-configurado com:

- **site_settings**: Configurações globais (marca, redes sociais, links).
- **platform_content**: Conteúdo dinâmico das seções da landing page.
- **leads**: CRM inicial e captura de conversão.
- **analytics_events**: Rastreamento de comportamento do usuário.

As migrações estão localizadas em `./supabase/migrations`.

## 🎨 Padronização e Qualidade

- **Linting**: `npm run lint`
- **Estilos**: Tailwind CSS 4 com estética Premium Emerald.
- **Componentes**: Radix UI + Framer Motion.

---

_Developed with focus on transformation and excellence. 🇮🇪_
