import { NextResponse } from "next/server"
import { sendMessage } from "../chat"

export async function POST(req: Request) {
  try {
    const { message, previousMessages } = await req.json()

    // Call the sendMessage function from our API
    const response = await sendMessage(message, previousMessages)

    // Return the response
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "Failed to get response from Aerius AI" }, { status: 500 })
  }
}
