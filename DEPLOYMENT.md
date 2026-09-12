# ============================================
# BLACKSENTINEL VISION - Production Deployment Guide
# ============================================

## Quick Start

```bash
# Clone and build
cd bsv-platform
npm install
npm run build

# Run production
npm run start:prod
```

---

## Deployment Options

### 1. VERCEL (Easiest - 1 Click)

**Best for:** Startups, MVPs, quick deployments

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Steps:**
1. Connect GitHub repo to Vercel dashboard
2. Set environment variables in Vercel UI
3. Auto-deploys on every push to `main`

**Cost:** Free tier available, Pro from $20/month

---

### 2. DOCKER (Recommended for Enterprise)

**Best for:** On-premise, air-gapped networks, full control

```bash
# Build image
docker build -t blacksentinel-vision:latest .

# Run container
docker run -d \
  --name bsv \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BSV_API_URL=https://api.your-domain.com \
  blacksentinel-vision:latest

# Or use docker-compose (includes Redis + PostgreSQL)
docker-compose up -d
```

**Cost:** Infrastructure cost only (your servers)

---

### 3. AWS (Recommended for Scale)

**Best for:** Enterprise, global scale, compliance requirements

**Architecture:**
- ECS Fargate (serverless containers)
- RDS PostgreSQL (managed database)
- ElastiCache Redis (managed cache)
- CloudFront CDN (global edge)
- WAF (web application firewall)
- S3 (static assets)
- Route 53 (DNS)

```bash
# Deploy with script
chmod +x scripts/deploy-aws.sh
./scripts/deploy-aws.sh
```

**Cost:** ~$200-500/month for production workload

---

### 4. KUBERNETES (Maximum Scale)

**Best for:** Large enterprises, multi-region, auto-scaling

```bash
# Apply manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -n bsv-production
```

**Includes:**
- 3-replica deployment with rolling updates
- Horizontal Pod Autoscaler (2-10 replicas)
- Health checks (liveness + readiness)
- Resource limits

**Cost:** Depends on cluster size

---

### 5. STATIC EXPORT (Simplest)

**Best for:** Demo, presentation, offline use

```bash
# Export as static HTML
npm run build
npx next export

# Deploy to any static host
# Netlify, GitHub Pages, S3, etc.
```

**Cost:** Free

---

### 6. ON-PREMISE (Air-Gapped)

**Best for:** Government, military, classified networks

```bash
# Build in connected environment
npm run build

# Transfer dist/ folder to air-gapped network
# Run with Node.js
node .next/standalone/server.js
```

---

## Environment Configuration

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BSV_API_URL` | API endpoint | `https://api.blacksentinel.com` |
| `NEXT_PUBLIC_BSV_WS_URL` | WebSocket endpoint | `wss://ws.blacksentinel.com` |
| `NEXT_PUBLIC_BSV_ENV` | Environment name | `production` |

### Optional (Threat Intel Feeds)

| Variable | Description |
|----------|-------------|
| `OTX_API_KEY` | AlienVault OTX API key |
| `VIRUSTOTAL_API_KEY` | VirusTotal API key |
| `ABUSEIPDB_API_KEY` | AbuseIPDB API key |
| `GREYNOISE_API_KEY` | GreyNoise API key |
| `SHODAN_API_KEY` | Shodan API key |

### Optional (AI/ML)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API for AI Copilot |
| `AI_MODEL_ENDPOINT` | Custom ML model endpoint |

---

## Security Checklist

- [ ] Change default secrets in `.env`
- [ ] Enable HTTPS/SSL
- [ ] Configure WAF rules
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Configure RBAC
- [ ] Set up MFA/SSO
- [ ] Enable encryption at rest
- [ ] Review CSP headers
- [ ] Set up monitoring/alerts

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Score | > 90 |

---

## Monitoring

### Health Check Endpoints
- `GET /` - Main page (returns 200)
- `GET /api/health` - Health check (to be implemented)

### Recommended Tools
- **Sentry** - Error tracking
- **DataDog** - APM and infrastructure
- **Grafana** - Dashboards
- **Prometheus** - Metrics
- **ELK Stack** - Log aggregation

---

## Support

- **Documentation:** https://docs.blacksentinel.com/vision
- **Support:** support@blacksentinel.com
- **Issues:** https://github.com/blacksentinel/vision/issues
