"use client"

import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import useColorMode from '@/hooks/useColorMode'
import { TypeAnimation } from 'react-type-animation' // Import the library

// Define Message type
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
}

// Send message function
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

const AeriusAIPage = () => {
  const [colorMode] = useColorMode();
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          content: "Hello! I'm Aerius AI, your air pollution monitoring assistant. How can I help you today?",
          role: "assistant",
          createdAt: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(input, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message with markdown-style formatting
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
    <DefaultLayout>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black transition-all duration-300">
        {/* Header section */}
        <div className="text-center p-8 w-full mb-6">
          <h1 className="text-6xl font-bold mb-4 text-green-600 dark:text-green-500">Aerius AI</h1>
          
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-3xl font-medium">
              <TypeAnimation
                sequence={[
                  'How can I help you??',
                  1000, // Wait 1s
                  'Ask me about air pollution...',
                  1000,
                  'Learn about environmental actions...',
                  1000,
                  'Monitor air quality with me...',
                  1000,
                  'How can I help you??',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
                repeat={Infinity}
              />
            </h2>
          </div>
        </div>
        
        {/* Chat interface */}
        <div className="w-full max-w-4xl mx-auto px-4 pb-8 flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="border-b bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 p-1.5 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Air Pollution Assistant</h2>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex flex-col space-y-1", message.role === "user" ? "items-end" : "items-start")}
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-2">
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
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-tl-none",
                    )}
                  >
                    {formatMessage(message.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-2">
                    <Bot className="h-3 w-3" />
                    <span>Aerius AI</span>
                    <span>•</span>
                    <time>{format(new Date(), "h:mm a")}</time>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 max-w-[85%] rounded-2xl rounded-tl-none p-3 flex items-center">
                    <div className="flex items-center">
                      <span className="text-green-600 dark:text-green-500 font-medium">Generating</span>
                      <TypeAnimation
                        sequence={['.', '..']}
                        wrapper="span"
                        speed={50}
                        className="text-green-600 dark:text-green-500"
                        repeat={Infinity}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="border-t dark:border-gray-700 p-3">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about air pollution..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-full w-10 h-10 flex items-center justify-center transition-all",
                    input.trim() ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500",
                  )}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Information cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-500">Air Quality Topics</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Air quality monitoring methods</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Pollution levels and interpretations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Health effects of air pollution</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-500">Environmental Actions</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Reducing individual carbon footprint</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Community air quality initiatives</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Policy and regulation information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AeriusAIPage