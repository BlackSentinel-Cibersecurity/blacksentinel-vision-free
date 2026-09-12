#!/bin/bash
# ============================================
# BLACKSENTINEL VISION - AWS Deployment Script
# Requires: AWS CLI, Docker, ECR credentials
# ============================================

set -e

# Configuration
AWS_REGION="us-east-1"
ECR_REPOSITORY="blacksentinel-vision"
ECS_CLUSTER="bsv-production"
ECS_SERVICE="bsv-service"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "============================================"
echo "  BLACKSENTINEL VISION - AWS DEPLOYMENT"
echo "============================================"

# Step 1: Build Docker image
echo "[1/6] Building Docker image..."
docker build -t $ECR_REPOSITORY:latest .
docker tag $ECR_REPOSITORY:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Step 2: Login to ECR
echo "[2/6] Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Step 3: Push to ECR
echo "[3/6] Pushing image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Step 4: Update ECS Service
echo "[4/6] Updating ECS service..."
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --force-new-deployment \
  --region $AWS_REGION

# Step 5: Wait for deployment
echo "[5/6] Waiting for deployment to stabilize..."
aws ecs wait services-stable \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE \
  --region $AWS_REGION

# Step 6: Verify
echo "[6/6] Deployment complete!"
echo "============================================"
echo "  STATUS: DEPLOYED SUCCESSFULLY"
echo "============================================"
