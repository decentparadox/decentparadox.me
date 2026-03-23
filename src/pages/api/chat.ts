import type { APIRoute } from 'astro'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { google } from '@ai-sdk/google'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json()
    
    if (!messages || !messages.length) {
      return new Response(
        JSON.stringify({ error: 'No messages provided' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // API key is automatically available via Netlify/Astro environment
    // No need to check - it will be injected at runtime

    const result = streamText({
      model: google('gemini-2.0-flash-exp'),
      messages: convertToModelMessages(messages),
      system: `You are a helpful AI assistant specifically designed to answer questions about Tethra, a unified AI chat application. 
    
Here's what you should know about Tethra:
- Tethra is a cross-platform desktop application that lets users chat with AI locally while enabling web sharing of conversations
- It's built with React 19, TypeScript, Tauri (Rust), and SQLite
- Supports multiple AI providers: OpenAI (GPT models), Anthropic (Claude), Google (Gemini), DeepSeek, and more through Vercel AI SDK
- Key innovation: hybrid architecture - conversations stay private and local by default (stored in SQLite), but users can generate shareable web links for any conversation
- Features real-time streaming responses using WebSocket connections
- Uses TanStack Router for routing, Tailwind CSS with Shadcn/ui components for styling
- Solves the fragmentation problem - users no longer have to choose between privacy (local apps) and sharing (web apps)
- Cross-platform: works on Windows, macOS, and Linux
- Privacy-focused: full user control over data, sharing is completely optional

Technology Stack:
- Frontend: React 19, TypeScript, TanStack Router, Tailwind CSS, Shadcn/ui, Motion
- Backend: Tauri, Rust, SQLite
- AI Integration: Vercel AI SDK, WebSocket for streaming
- Web Sharing: Custom architecture for generating public URLs

Development Timeline:
- Design & Architecture: 2 weeks
- Core Development: 8 weeks
- AI Integration: 3 weeks
- Web Sharing: 2 weeks

Answer questions about Tethra in a friendly, helpful manner. If asked about topics unrelated to Tethra, politely redirect the conversation back to Tethra's features and capabilities.`,
    })

    return result.toUIMessageStreamResponse()
  } catch (error: any) {
    // Return detailed error for debugging
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error.message,
        stack: error.stack
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
