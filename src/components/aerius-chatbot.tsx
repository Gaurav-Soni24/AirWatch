"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react"
import { sendMessage } from "@/api/chat"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Define message type
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
}

export function AeriusAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Initial greeting when chat is opened
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

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send message to API
      const response = await sendMessage(input, messages)

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Add error message
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

  // Format message content with proper styling
  const formatMessage = (content: string) => {
    // Split by line breaks
    const lines = content.split("\n")

    return (
      <>
        {lines.map((line, i) => {
          // Check if line is a heading (starts with # or ##)
          if (line.startsWith("# ")) {
            return (
              <h3 key={i} className="text-lg font-bold mt-2 mb-1">
                {line.substring(2)}
              </h3>
            )
          } else if (line.startsWith("## ")) {
            return (
              <h4 key={i} className="text-md font-semibold mt-2 mb-1">
                {line.substring(3)}
              </h4>
            )
          } else if (line.startsWith("- ")) {
            // Handle bullet points
            return (
              <li key={i} className="ml-4">
                {line.substring(2)}
              </li>
            )
          } else if (line.trim() === "") {
            return <div key={i} className="h-2"></div>
          } else {
            return (
              <p key={i} className="mb-1">
                {line}
              </p>
            )
          }
        })}
      </>
    )
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center justify-center text-white"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col shadow-xl border-2 border-gray-200 rounded-lg bg-white animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="border-b bg-gray-50 px-4 py-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1.5 rounded-full">
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

            {/* Messages area */}
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
                        ? "bg-blue-600 text-white rounded-tr-none"
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
                  <div className="bg-gray-100 max-w-[85%] rounded-2xl rounded-tl-none p-3 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-3">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about air pollution..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-full w-10 h-10 flex items-center justify-center transition-all",
                    input.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400",
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