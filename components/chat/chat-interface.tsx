"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockChatHistory } from "@/lib/mock-data"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    listingReferences?: string[]
    categories?: string[]
  }
}

interface ChatInterfaceProps {
  initialMessages?: Message[]
  className?: string
}

export default function ChatInterface({ initialMessages = [], className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Convert mock data to proper format if no initial messages
    if (initialMessages.length === 0) {
      return mockChatHistory.map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant',
        timestamp: new Date(msg.timestamp)
      }))
    }
    return initialMessages
  })
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.slice(-5) // Send last 5 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(data.timestamp),
        metadata: data.metadata
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const MessageContent = ({ message }: { message: Message }) => {
    if (message.role === 'user') {
      return <div className="whitespace-pre-wrap">{message.content}</div>
    }

    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown 
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
            code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-200 p-2 rounded text-xs overflow-auto">{children}</pre>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    )
  }

  const getUserTextAlign = (role: string) => {
    return role === 'user' ? 'text-right' : 'text-left'
  }

  const getFlexDirection = (role: string) => {
    return role === 'user' ? 'flex-row-reverse' : 'flex-row'
  }

  const getAvatarColor = (role: string) => {
    return role === 'user' ? "bg-blue-500 text-white" : "bg-green-500 text-white"
  }

  const getBubbleColor = (role: string) => {
    return role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
  }

  return (
    <div className={`flex flex-col h-full max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">VeganBnB Travel Assistant</h2>
            <p className="text-sm text-gray-600">Your AI guide for complete vegan travel planning</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${getFlexDirection(message.role)}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className={getAvatarColor(message.role)}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex-1 max-w-[80%] ${getUserTextAlign(message.role)}`}>
                <div className={`rounded-lg p-3 ${getBubbleColor(message.role)}`}>
                  <MessageContent message={message} />
                </div>
                
                {/* Show categories if available */}
                {message.metadata?.categories && message.metadata.categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.metadata.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs rounded-full bg-white bg-opacity-20 text-white"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className={`mt-1 text-xs text-gray-500 ${getUserTextAlign(message.role)}`}>
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-500 text-white">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animate-delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animate-delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about vegan travel in Berlin..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={!input.trim() || isLoading}
            className="bg-green-500 hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick suggestions */}
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            "Plan my 3-day vegan trip to Berlin",
            "Best vegan restaurants with high safety scores",
            "Vegan accommodation with good breakfast",
            "What events are happening this weekend?"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}