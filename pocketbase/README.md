# PocketBase Setup

This directory contains PocketBase configuration for the Artifact Research App.

## Local Development

### 1. Download PocketBase

```bash
# macOS (Intel)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.35.1/pocketbase_0.35.1_darwin_amd64.zip -o pocketbase.zip

# macOS (Apple Silicon)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.35.1/pocketbase_0.35.1_darwin_arm64.zip -o pocketbase.zip

# Linux
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.35.1/pocketbase_0.35.1_linux_amd64.zip -o pocketbase.zip

# Extract
unzip pocketbase.zip
rm pocketbase.zip
```

### 2. Start PocketBase

```bash
./pocketbase serve
```

PocketBase will be available at:
- **API**: http://127.0.0.1:8090
- **Admin UI**: http://127.0.0.1:8090/_/

### 3. Create Admin Account

Visit http://127.0.0.1:8090/_/ and create your admin account.

### 4. Import Collections

In the Admin UI:
1. Go to **Settings** → **Import collections**
2. Paste the contents of `pb_schema.json`
3. Click **Import**

> **Important**: After import, verify each collection's `id` field has the autogenerate pattern `[a-z0-9]{15}`. If missing, edit each collection and set this pattern in the `id` field options.

## Collection Overview

| Collection | Purpose |
|------------|---------|
| `participants` | User profile and consent data |
| `sessions` | Survey session tracking |
| `intent_responses` | Core research artifact (freeform text) |
| `session_feedback` | Reflection responses |

## Data Files

PocketBase stores data in `pb_data/` directory:
- `data.db` - SQLite database
- `storage/` - Uploaded files (if any)

## Backup

```bash
# Create backup
cp -r pb_data pb_data_backup_$(date +%Y%m%d)

# Or use PocketBase's built-in backup
./pocketbase backup
```
