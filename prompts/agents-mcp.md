# AI Agents & MCP Prompts

## Build an AI Agent
Build an AI agent for [DESCRIBE WHAT THE AGENT DOES].

Agent type: [Autonomous / Supervised / Tool-using]
Model: [GPT-4o / Claude Sonnet / other]
Framework: [Vercel AI SDK / LangChain / raw API]

Tools the agent needs:
- [Tool 1]: [what it does]
- [Tool 2]: [what it does]

Requirements:
- Tool definitions with proper JSON schemas
- System prompt that constrains the agent's behavior
- Loop logic (plan → act → observe → repeat)
- Graceful stopping condition
- Error handling for failed tool calls
- Logging of each step

Output the full agent implementation.

---

## Build an MCP Server
Build an MCP (Model Context Protocol) server that exposes [DESCRIBE CAPABILITIES].

Tools to expose:
- [tool-name]: [description, inputs, outputs]

Resources to expose (if any):
- [resource-uri]: [description]

Requirements:
- Use the official MCP SDK (@modelcontextprotocol/sdk)
- Proper JSON schema for all tool inputs
- Descriptive tool and parameter descriptions
- Error handling returning MCP-compliant error responses
- Transport: [stdio / SSE]

Output:
- The full MCP server file
- A README explaining how to connect
- The mcp.json config snippet

---

## Build a RAG Pipeline
Build a RAG (Retrieval-Augmented Generation) pipeline for [USE CASE].

Data source: [PDFs / database / website / markdown files]
Vector store: [Pinecone / Supabase pgvector / Chroma]
Embedding model: [text-embedding-3-small / other]

Pipeline steps:
1. Ingestion: load and chunk documents
2. Embedding: vectorize and store chunks
3. Retrieval: find relevant chunks at query time
4. Generation: LLM uses retrieved context to answer

Include:
- The ingestion script
- The query function
- Metadata storage for source tracking

Output all files in full.

---

## Build an Agentic Workflow
Build an agentic workflow for [DESCRIBE THE WORKFLOW].
Framework: [Inngest / Temporal / LangGraph / custom]

Steps:
1. Trigger: [what starts it]
2. [Step name]: [what happens]
3. Output: [what it produces]

Requirements:
- Each step is independently retriable
- State is persisted between steps
- Human approval gate at: [step name — or "none"]
- Timeout handling at each step
- Full structured logging

Output all files and registration code.

---

## Craft a System Prompt for an LLM
Write a system prompt for an LLM to [DESCRIBE BEHAVIOR].

Include:
- Clear role definition
- Specific behavioral rules (what to do and not do)
- Output format specification
- 2-3 few-shot examples showing ideal input → output
- Edge case handling instructions

Then test it by showing me a sample interaction.
