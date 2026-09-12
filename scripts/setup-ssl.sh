#!/bin/bash
# ============================================
# BLACKSENTINEL VISION - SSL Setup Script
# Uses Let's Encrypt / Certbot
# ============================================

set -e

DOMAIN="vision.blacksentinel.com"
EMAIL="admin@blacksentinel.com"

echo "Setting up SSL certificates for $DOMAIN"

# Install certbot if not present
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    apt-get update && apt-get install -y certbot python3-certbot-nginx
fi

# Obtain certificate
certbot certonly \
  --nginx \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --non-interactive

# Auto-renewal cron
echo "0 0,12 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" > /etc/cron.d/certbot-renew

echo "SSL certificates installed successfully!"
echo "Certificate path: /etc/letsencrypt/live/$DOMAIN/"
