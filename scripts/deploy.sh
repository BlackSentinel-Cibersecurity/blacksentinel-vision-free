#!/bin/bash
# ============================================
# BLACKSENTINEL VISION - Production Build & Deploy
# One-command deployment script
# ============================================

set -e

echo "============================================"
echo "  BLACKSENTINEL VISION - DEPLOYMENT"
echo "============================================"

# Step 1: Validate environment
echo "[1/8] Validating environment..."
node -v && npm -v

# Step 2: Install dependencies
echo "[2/8] Installing dependencies..."
npm ci

# Step 3: Type check
echo "[3/8] Running type checks..."
npm run typecheck

# Step 4: Lint
echo "[4/8] Running linter..."
npm run lint || true

# Step 5: Build
echo "[5/8] Building production..."
npm run build:prod

# Step 6: Generate deployment artifacts
echo "[6/8] Generating deployment artifacts..."
mkdir -p dist
cp -r .next/standalone/* dist/ 2>/dev/null || true
cp -r .next/static dist/ 2>/dev/null || true
cp -r public dist/ 2>/dev/null || true

# Step 7: Package
echo "[7/8] Creating deployment package..."
tar -czf blacksentinel-vision-$(date +%Y%m%d-%H%M%S).tar.gz dist/

echo "[8/8] Build complete!"
echo "============================================"
echo "  PACKAGE: blacksentinel-vision-*.tar.gz"
echo "============================================"
echo ""
echo "Deployment options:"
echo "  1. Vercel:     npx vercel --prod"
echo "  2. Docker:     docker build -t bsv . && docker run -p 3000:3000 bsv"
echo "  3. AWS:        ./scripts/deploy-aws.sh"
echo "  4. Kubernetes: kubectl apply -f k8s/"
echo "  5. Manual:     cp -r dist/ /var/www/bsv && node server.js"
echo "============================================"
