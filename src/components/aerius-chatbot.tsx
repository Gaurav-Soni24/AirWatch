"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"


type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
}


export async function sendMessage(message: string, previousMessages: Message[]): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: message }]
          }]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();


    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response.";

    return responseText;
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    throw error;
  }
}

export function AeriusAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          content: "Hello! I'm Aerius AI, your air pollution monitoring assistant. How can I help you today?",
          role: "assistant",
          createdAt: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return


    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    console.log(messages)

    try {

      const response = await sendMessage(input, messages)


      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }


  const formatMessage = (content: string) => {
    // Process markdown-style formatting
    const processText = (text: string) => {
      // Handle bold text (** or __)
      let formattedText = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (_, m1, m2) => {
        const match = m1 || m2;
        return `<strong>${match}</strong>`;
      });
      
      // Handle underline (_)
      formattedText = formattedText.replace(/\_(.*?)\_/g, '<u>$1</u>');
      
      return formattedText;
    };

    const lines = content.split("\n");

    return (
      <>
        {lines.map((line, i) => {
          // Process the line for markdown formatting
          const processedLine = processText(line);
          
          if (line.startsWith("# ")) {
            return (
              <h3 key={i} className="text-lg font-bold mt-2 mb-1" 
                  dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
            );
          } else if (line.startsWith("## ")) {
            return (
              <h4 key={i} className="text-md font-semibold mt-2 mb-1"
                  dangerouslySetInnerHTML={{ __html: processedLine.substring(3) }} />
            );
          } else if (line.startsWith("- ")) {
            return (
              <li key={i} className="ml-4"
                  dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
            );
          } else if (line.trim() === "") {
            return <div key={i} className="h-2"></div>;
          } else {
            return (
              <p key={i} className="mb-1"
                 dangerouslySetInnerHTML={{ __html: processedLine }} />
            );
          }
        })}
      </>
    );
  }

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 flex items-center justify-center text-white"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col shadow-xl border-2 border-gray-200 rounded-lg bg-white animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="border-b bg-gray-50 px-4 py-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 p-1.5 rounded-full">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Aerius AI</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full h-8 w-8 hover:bg-red-100 hover:text-red-500 flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex flex-col space-y-1", message.role === "user" ? "items-end" : "items-start")}
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 px-2">
                    {message.role === "assistant" ? (
                      <>
                        <Bot className="h-3 w-3" />
                        <span>Aerius AI</span>
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3" />
                        <span>You</span>
                      </>
                    )}
                    <span>•</span>
                    <time>{format(message.createdAt, "h:mm a")}</time>
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-3",
                      message.role === "user"
                        ? "bg-green-600 text-white rounded-tr-none"
                        : "bg-gray-100 rounded-tl-none",
                    )}
                  >
                    {formatMessage(message.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 px-2">
                    <Bot className="h-3 w-3" />
                    <span>Aerius AI</span>
                    <span>•</span>
                    <time>{format(new Date(), "h:mm a")}</time>
                  </div>
                  <div className="bg-gray-100 max-w-[85%] rounded-2xl rounded-tl-none p-3 flex items-center">
                    <div className="flex items-center">
                      <span className="text-green-600 font-medium">Generating</span>
                      <span className="animate-pulse text-green-600">.</span>
                      <span className="animate-pulse text-green-600 [animation-delay:-0.15s]">.</span>
                      <span className="animate-pulse text-green-600 [animation-delay:-0.3s]">.</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="border-t p-3">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about air pollution..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-full w-10 h-10 flex items-center justify-center transition-all",
                    input.trim() ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-200 text-gray-400",
                  )}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}