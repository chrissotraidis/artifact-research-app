# Artifact Document Structure & IA Research App

A research survey application to study how different user segments (technical vs. non-technical) naturally structure and organize application documentation.

## 🎯 Research Question

> How do different user segments naturally structure and organize application documentation — and is there a delta between what works well for humans vs. what works well for AI?

## Overview

This app supports Artifact's core thesis that **the document is the interface**. By studying how people describe software naturally, we can inform:

- Artifact's core document experience
- DxD (Design by Discovery) methodology  
- AI prompt engineering and interpretation layer

## Target Segments

| Segment | Description |
|---------|-------------|
| **Technical-adjacent** | PMs, BAs, Designers — familiar with software process |
| **Non-technical** | Small business owners, tradespeople, creators |
| **Software engineers** | Developers, architects (control group) |

## Survey Flow

1. **Welcome & Consent** — Set expectations and capture consent
2. **Participant Intake** — Segment classification (name, work type, experience)
3. **Stimulus Introduction** — Present the todo app scenario
4. **Intent Capture** — Core research artifact: freeform description capture
5. **Reflection** — Difficulty rating, vocabulary gaps, follow-up interest
6. **Thank You** — Confirmation and next steps

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (currently single-file, componentization planned) |
| **Backend** | Firebase (MVP) → PocketBase (planned) |
| **Hosting** | Zo Computer (planned) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/[username]/artifact-research-app.git
cd artifact-research-app
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Documentation

See [docs/Document-Structure-&-IA-Research.md](docs/Document-Structure-&-IA-Research.md) for the complete research specification including:

- Research objectives and methodology
- Screen-by-screen specifications
- Data model (PocketBase collections)
- Build phases and roadmap
- Value hypotheses to validate

## Build Phases

### Phase 0: Weekend MVP ✅
Core survey flow with intent capture

### Phase 1: Iteration (Planned)
Add clarifying question logic and Arnold-style interpretation

### Phase 2: Expansion (Planned)
Card sort interface, second stimulus, automated scoring

## Contributing

This is an internal research project for Artifact.

## License

Proprietary — Artifact Research
