# Artifact Document Structure & IA Research - Documentation

This folder contains all documentation for the Artifact Research App project.

## Contents

| Document | Purpose |
|----------|---------|
| [Document-Structure-&-IA-Research.md](./Document-Structure-&-IA-Research.md) | Complete research specification |
| [spec-database.md](./spec-database.md) | PocketBase database schema and data model |

## Quick Links

### Research Overview
The research studies how different user segments (technical vs. non-technical) naturally structure and organize application documentation.

### Survey Flow (MVP)
1. **Welcome & Consent** - Introduction and consent checkbox
2. **Participant Intake** - Demographics and experience questions
3. **Stimulus Introduction** - Todo app scenario presentation
4. **Intent Capture** - Freeform text artifact collection
5. **Reflection** - Difficulty rating, vocabulary gaps, feedback
6. **Thank You** - Confirmation and follow-up information

### Deferred Features (Phase 1+)
- Clarifying Questions screen
- Card Sort exercise

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 + TypeScript + TailwindCSS |
| Backend | PocketBase (SQLite embedded) |
| Hosting | Zo Computer (VPS) |

## Local Development

```bash
# Frontend
npm run dev                    # http://localhost:3000

# Backend  
cd pocketbase && ./pocketbase serve   # http://127.0.0.1:8090
```

See [main README](../README.md) for full setup instructions.
