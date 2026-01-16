# Artifact Document Structure & IA Research App

A research survey application to study how different user segments (technical vs. non-technical) naturally structure and organize application documentation.

## 🎯 Research Question

> How do different user segments naturally structure and organize application documentation — and is there a delta between what works well for humans vs. what works well for AI?

## Overview

This app supports Artifact's core thesis that **the document is the interface**. By studying how people describe software naturally, we can inform:

- Artifact's core document experience
- DxD (Design by Discovery) methodology  
- AI prompt engineering and interpretation layer

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 + TypeScript + TailwindCSS |
| **Backend** | PocketBase (SQLite embedded) |
| **Hosting** | Zo Computer (VPS) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/[username]/artifact-research-app.git
cd artifact-research-app
npm install
```

### Development (Frontend Only)

```bash
npm run dev
```

App runs at http://localhost:3000

> **Note**: Without PocketBase running, survey data will be logged to console only.

---

## 🗄️ PocketBase Setup

### Local Development

```bash
cd pocketbase

# Download PocketBase (macOS Apple Silicon)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.35.1/pocketbase_0.35.1_darwin_arm64.zip -o pocketbase.zip
unzip pocketbase.zip && rm pocketbase.zip

# Start PocketBase
./pocketbase serve
```

1. Visit http://127.0.0.1:8090/_/ and create admin account
2. Go to **Settings** → **Import collections**
3. Paste contents of `pocketbase/pb_schema.json`
4. Click **Import**

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `NEXT_PUBLIC_POCKETBASE_URL` for production.

---

## 🖥️ VPS Deployment (Zo Computer)

### 1. Server Requirements

- Linux VPS (Ubuntu 22.04+ recommended)
- 1GB RAM minimum
- Node.js 18+ and npm
- nginx (reverse proxy)

### 2. PocketBase Setup

```bash
# SSH into your VPS
ssh user@your-zo-computer.com

# Create directory
mkdir -p /opt/artifact-research
cd /opt/artifact-research

# Download PocketBase
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.35.1/pocketbase_0.35.1_linux_amd64.zip -o pocketbase.zip
unzip pocketbase.zip && rm pocketbase.zip

# Create systemd service
sudo tee /etc/systemd/system/pocketbase.service > /dev/null <<EOF
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/opt/artifact-research
ExecStart=/opt/artifact-research/pocketbase serve --http="127.0.0.1:8090"
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Start PocketBase
sudo systemctl enable pocketbase
sudo systemctl start pocketbase
```

### 3. Frontend Deployment

```bash
# Clone repository
cd /opt
git clone https://github.com/[username]/artifact-research-app.git
cd artifact-research-app

# Install dependencies
npm install

# Create production env
echo "NEXT_PUBLIC_POCKETBASE_URL=https://your-domain.com/api" > .env.local

# Build
npm run build

# Install PM2 (process manager)
npm install -g pm2

# Start Next.js
pm2 start npm --name "artifact-research" -- start
pm2 save
pm2 startup
```

### 4. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Next.js frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # PocketBase API
    location /api/ {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://127.0.0.1:8090;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # PocketBase Admin (optional, restrict access)
    location /_/ {
        proxy_pass http://127.0.0.1:8090;
        # Add IP restriction for admin access
        # allow YOUR_IP;
        # deny all;
    }
}
```

```bash
# Enable site and restart nginx
sudo ln -s /etc/nginx/sites-available/artifact-research /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 Data Collections

| Collection | Purpose |
|------------|---------|
| `participants` | User profile and consent |
| `sessions` | Survey session tracking |
| `intent_responses` | Core research (freeform text) |
| `session_feedback` | Reflection responses |

---

## 🔒 Backup Strategy

```bash
# Manual backup
cd /opt/artifact-research
./pocketbase backup

# Automated daily backup (add to crontab)
0 3 * * * cd /opt/artifact-research && ./pocketbase backup
```

---

## Documentation

See [docs/](docs/) for:
- [Research Specification](docs/Document-Structure-&-IA-Research.md)
- [Documentation Index](docs/README.md)

## License

Proprietary — Artifact Research
