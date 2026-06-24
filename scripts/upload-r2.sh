#!/bin/bash

# Upload media assets to Cloudflare R2 using rclone.
# Mirrors the dickbutt-web pattern (scripts/upload-r2-rclone.sh): the app reads
# assets from a public R2 URL, and uploads happen out-of-band via this script,
# so no R2 credentials ever live in the repo.
#
# Prereqs (one-time):
#   1. rclone installed (brew install rclone) with an "r2" remote configured:
#        [r2]
#        type = s3
#        provider = Cloudflare
#        access_key_id = YOUR_R2_ACCESS_KEY_ID
#        secret_access_key = YOUR_R2_SECRET_ACCESS_KEY
#        endpoint = https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
#   2. A bucket named "$R2_BUCKET" with PUBLIC access enabled (Cloudflare
#      dashboard → R2 → bucket → Settings → Public access), then set
#      NEXT_PUBLIC_R2_PUBLIC_URL to its public domain (assets.solarius.io or
#      the pub-xxxx.r2.dev URL) in .env / Vercel.
#
# Usage: npm run assets:upload

set -e

SOURCE_DIR="public/video"
R2_REMOTE="r2:solarius-assets"
R2_PREFIX="v1/video"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=================================================="
echo "Solarious R2 Upload (rclone)"
echo "=================================================="

if ! command -v rclone &> /dev/null; then
    echo -e "${RED}Error: rclone is not installed${NC}"
    echo "Install with: brew install rclone — or see https://rclone.org/install/"
    exit 1
fi

if ! rclone listremotes | grep -q "^r2:"; then
    echo -e "${RED}Error: R2 remote 'r2' is not configured in rclone${NC}"
    echo "Configure with: rclone config  (see the header of this script)"
    exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: $SOURCE_DIR not found${NC}"
    exit 1
fi

# Create the bucket if it does not exist yet (no-op if it does).
rclone mkdir "$R2_REMOTE" 2>/dev/null || true

echo ""
echo "Source:      $SOURCE_DIR"
echo "Destination: $R2_REMOTE/$R2_PREFIX"
echo ""
find "$SOURCE_DIR" -type f -exec ls -lh {} \; | awk '{print "  " $5, $9}'
echo ""

read -p "Continue with upload? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Upload cancelled"
    exit 0
fi

echo ""
echo -e "${YELLOW}Uploading...${NC}"
rclone sync "$SOURCE_DIR" "$R2_REMOTE/$R2_PREFIX" \
    --transfers 8 \
    --checkers 8 \
    --progress \
    --stats 5s \
    --stats-one-line

echo ""
echo -e "${GREEN}Upload complete.${NC}"
echo "Verify with: rclone ls $R2_REMOTE/$R2_PREFIX"
echo "Then set NEXT_PUBLIC_R2_PUBLIC_URL to the bucket's public domain."
