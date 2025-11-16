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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastUserMessageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to last user message when new messages arrive (so user can see their question + start of AI response)
  useEffect(() => {
    if (lastUserMessageRef.current) {
      lastUserMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    
    // Scroll to user message after sending (will be the last user message)
    setTimeout(() => {
      if (lastUserMessageRef.current) {
        lastUserMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
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

  const handleQuickActionClick = (suggestion: string) => {
    // Send the suggestion as a message directly
    sendMessage(suggestion)
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
          skipHtml={false}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2">{children}</h3>,
            h4: ({ children }) => <h4 className="text-sm font-semibold mb-1 mt-1">{children}</h4>,
            h5: ({ children }) => <h5 className="text-xs font-semibold mb-1 mt-1">{children}</h5>,
            h6: ({ children }) => <h6 className="text-xs font-medium mb-1 mt-1">{children}</h6>,
            code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-200 p-2 rounded text-xs overflow-auto">{children}</pre>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2">{children}</blockquote>,
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 underline font-medium"
              >
                {children}
              </a>
            ),
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

  const getContextualSuggestions = (lastMessage: Message, allMessages: Message[]): string[] => {
    const content = lastMessage.content.toLowerCase()
    const conversationHistory = allMessages.slice(-4).map(m => m.content.toLowerCase()).join(' ')
    
    // After city acknowledged, asking for trip details (check first - more specific)
    if (content.includes('berlin') && (content.includes('dates') || content.includes('when are you') || content.includes('when are you planning'))) {
      return [
        "I'm going next month",
        "Planning a weekend trip",
        "I need restaurants and hotels",
        "What about food tours?"
      ]
    }
    
    // Welcome/initial city mention (should show city options)
    if (content.includes('which city') || content.includes('planning to visit')) {
      return [
        "Berlin",
        "Paris",
        "Barcelona", 
        "Amsterdam"
      ]
    }
    
    // Restaurant-focused responses
    if (content.includes('kopps') || content.includes('restaurant') || content.includes('dining') || content.includes('€€€')) {
      return [
        "What about accommodations?",
        "Any nearby hotels?",
        "Show me food tours",
        "I'm also gluten-free"
      ]
    }
    
    // Accommodation-focused responses  
    if (content.includes('vegan hostel') || content.includes('check-in') || content.includes('accommodation') || content.includes('bedding')) {
      return [
        "What restaurants are nearby?",
        "Any walking tours?",
        "Show me local events",
        "What's the nightlife like?"
      ]
    }
    
    // Tour-focused responses
    if (content.includes('food tour') || content.includes('saturdays') || content.includes('hackescher markt') || content.includes('€65')) {
      return [
        "When should I book this?",
        "What else is in that area?",
        "Any evening tours?",
        "Where should I stay nearby?"
      ]
    }
    
    // Event-focused responses
    if (content.includes('vegan market') || content.includes('boxhagener platz') || content.includes('first saturday')) {
      return [
        "What time should I arrive?",
        "Any restaurants near the market?",
        "Where should I stay in that area?",
        "Other events this weekend?"
      ]
    }
    
    // Multi-category or comprehensive responses
    if (content.includes('safety score') && (content.includes('restaurant') && content.includes('accommodation'))) {
      return [
        "Plan my 3-day itinerary",
        "What about tours and events?",
        "Book everything for next month",
        "Any hidden gems?"
      ]
    }
    
    // Logistics/booking focused (be more specific to avoid conflict with restaurant booking)
    if ((content.includes('booking') || content.includes('reservation') || content.includes('advance notice')) && 
        !content.includes('kopps') && !content.includes('restaurant') && !content.includes('dining')) {
      return [
        "Help me create an itinerary",
        "What order should I book things?",
        "Any group discounts?",
        "What else should I know?"
      ]
    }
    
    // Dietary restrictions mentioned
    if (conversationHistory.includes('gluten') || conversationHistory.includes('allerg') || conversationHistory.includes('celiac')) {
      return [
        "More allergy-friendly options?",
        "What about cross-contamination?",
        "Safe accommodations too?",
        "Any specialized tours?"
      ]
    }
    
    // Non-Berlin cities (fallback for demo)
    if (content.includes('paris') || content.includes('amsterdam') || content.includes('barcelona')) {
      return [
        "Tell me about Berlin instead",
        "Berlin has amazing options",
        "What about Berlin for now?",
        "Berlin for my demo?"
      ]
    }
    
    // Default suggestions for other contexts
    return [
      "Tell me more about this",
      "What else do you recommend?", 
      "Any budget-friendly options?",
      "Plan my complete itinerary"
    ]
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
          {messages.map((message, index) => {
            // Find the last user message for scroll targeting
            const isLastUserMessage = message.role === 'user' && 
              !messages.slice(index + 1).some(m => m.role === 'user')
            
            // Check if this is the last assistant message for quick actions
            const isLastAssistantMessage = message.role === 'assistant' && 
              index === messages.length - 1 && !isLoading
            
            return (
              <div key={message.id}>
                <div
                  ref={isLastUserMessage ? lastUserMessageRef : null}
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
                  
                  <div className={`mt-1 text-xs text-gray-500 ${getUserTextAlign(message.role)}`}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
              
              {/* Quick actions after last assistant message */}
              {isLastAssistantMessage && (
                <div className="mt-3 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {getContextualSuggestions(message, messages).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          // Send message directly with the suggestion text
                          handleQuickActionClick(suggestion)
                        }}
                        className="text-sm bg-green-50 hover:bg-green-100 border border-green-200 rounded-full px-3 py-1.5 text-green-700 transition-colors"
                        disabled={isLoading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )
          })}
          
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
          
          {/* Auto-scroll target element */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask me about vegan travel in Berlin... (Shift+Enter for new line)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[40px] max-h-[120px]"
            disabled={isLoading}
            rows={1}
            style={{
              height: 'auto',
              overflowY: input.split('\n').length > 3 ? 'scroll' : 'hidden'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`
            }}
          />
          <Button 
            onClick={() => sendMessage()} 
            disabled={!input.trim() || isLoading}
            className="bg-green-500 hover:bg-green-600 mb-0.5"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}