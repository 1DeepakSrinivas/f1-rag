# F1-RAG Project

## Overview

This project implements a Retrieval Augmented Generation (RAG) system focused on Formula 1 (F1) racing data. RAG combines the power of large language models with specific domain knowledge retrieval to provide accurate and contextual responses.

## Features

- F1 data retrieval and processing through web scraping
- RAG implementation for F1-specific queries
- Information retrieval from F1 historical datasets
- Vector database for efficient similarity search
- Web scraping using LangChain from predefined sources

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/f1-rag.git
cd f1-rag

# Install dependencies
npm install
```

## Technologies Used

- Next.js
- TypeScript
- Databricks
- LangChain
- RAG (Retrieval Augmented Generation)
- Vector Database
- OpenAI GPT-4 and text-embedding-3-small for text generation

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
ASTRA_DB_NAMESPACE="<your_keyspace_name>" (default - default_keyspace)
ASTRA_DB_COLLECTION="<your_db_collection_name>"
ASTRA_DB_API_ENDPOINT="<your_db_endpoint>"
ASTRA_DB_APPLICATION_TOKEN="<your_db_api_key>"
OPENAI_API_KEY="<your_openai_api_key>"
```

2. Set up Databricks:
   - Create a Databricks workspace
   - Generate a personal access token
   - Note down the cluster HTTP path

## Development

```bash
# Install dependencies
npm install

# Initialize vector database
npm run seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`
