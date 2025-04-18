// app/api/chat/route.ts
import { NextResponse } from "next/server"
import type { Message } from "@/types/chat" // We'll create this type

// Type for Gemini API request
type GeminiRequest = {
  contents: {
    role: string
    parts: {
      text: string
    }[]
  }[]
  generationConfig: {
    temperature: number
    maxOutputTokens: number
    topP: number
    topK: number
  }
}

export async function POST(req: Request) {
  try {
    const { message, previousMessages } = await req.json()

    // Format previous messages for Gemini API
    const formattedMessages = []

    // Add system message as the first user message
    formattedMessages.push({
      role: "user",
      parts: [
        {
          text: `You are Aerius AI, an assistant specialized in air pollution monitoring and analysis.
You provide helpful, accurate, and concise information about air quality, pollutants, health impacts, and mitigation strategies.

When discussing air quality data:
- Format information clearly with appropriate spacing and organization
- Use headings (# and ##) for sections when appropriate
- Use bullet points (- ) for lists
- Keep responses concise but informative

If asked about specific pollutant levels, explain their significance and health implications.
You can suggest actions based on air quality readings and explain the Air Quality Index (AQI).
Always maintain a helpful, informative tone and focus on providing actionable insights about air pollution.

Now, respond to the following conversation and question:`,
        },
      ],
    })

    // Add model response to acknowledge system instructions
    formattedMessages.push({
      role: "model",
      parts: [
        {
          text: "I understand. I'm Aerius AI, specialized in air pollution monitoring and analysis. I'll provide helpful information about air quality, pollutants, health impacts, and mitigation strategies with clear formatting. I'll explain pollutant levels and their health implications, suggest actions based on air quality readings, and explain the AQI. I'll maintain a helpful tone and focus on actionable insights about air pollution. How can I assist you today?",
        },
      ],
    })

    // Add previous conversation messages
    for (const msg of previousMessages) {
      // Skip the initial greeting if it exists
      if (msg.id === "1" && msg.role === "assistant") continue

      formattedMessages.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    }

    // Add the current message
    formattedMessages.push({
      role: "user",
      parts: [{ text: message }],
    })

    // Create the request body
    const requestBody: GeminiRequest = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.95,
        topK: 40,
      },
    }

    // Make the API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Extract the text from the response
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      return NextResponse.json({ response: data.candidates[0].content.parts[0].text })
    }

    throw new Error("Unexpected response format from Gemini API")
  } catch (error) {
    console.error("Error sending message to Gemini API:", error)
    return NextResponse.json({ error: "Failed to get response from Aerius AI" }, { status: 500 })
  }
}