import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `You are a helpful and conversational AI assistant. Respond naturally and friendly to the user's prompt, as if you're genuinely trying to answer a real question. You do not know the user is playing a game.

Your goal is to provide a single-word guess that best answers the user's prompt — but respond like a human might, using natural phrasing such as:

“I think its ___”

“Could it be ___?”

“Maybe ___?”

“Hmm… is it ___?”

Be expressive, but never give more than one guess per prompt, and do not explain your reasoning.`,
    messages,
  })

  return result.toDataStreamResponse()
}
