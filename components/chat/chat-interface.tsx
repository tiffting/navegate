"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TravelSettings, { type TravelSettings as TravelSettingsType } from "@/components/settings/travel-settings";
import { generateItineraryFromChat } from "@/lib/sample-itinerary";
import { downloadIcsFile } from "@/lib/calendar-export";
import { getListingsByCategory } from "@/lib/mock-data";

// Calendar Export Button Component
function CalendarExportButton({ messages }: { messages: Message[] }) {
    const handleExport = () => {
        const itinerary = generateItineraryFromChat(messages);
        if (itinerary) {
            downloadIcsFile(itinerary);

            // Add success message to console (could be a toast in future)
            console.log(`✅ Calendar export complete! Downloaded: ${itinerary.title}`);
        } else {
            console.log("❌ No exportable itinerary found in conversation");
        }
    };

    // Check if the last assistant message contains an exportable itinerary
    const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop();

    if (!lastAssistantMessage) return null;

    const content = lastAssistantMessage.content.toLowerCase();

    // Check for structured schedule format (tables or day headers)
    const hasStructuredSchedule = () => {
        // Table format with times (like your example above)
        const tableRowsWithTimes = (content.match(/\|\s*\d{1,2}:\d{2}|\|\s*\d{1,2}\s*(am|pm)/gi) || []).length;
        
        // Day-based headers
        const dayHeaders = (content.match(/##?\s*(day \d+|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi) || []).length;
        
        return tableRowsWithTimes >= 2 || dayHeaders >= 2;
    };

    // Check conversation progression (accommodation confirmed + dining planned)
    const hasCompleteTripPlan = () => {
        // User has confirmed accommodation choice
        const hasConfirmedAccommodation = messages.some(msg => 
            msg.role === 'user' && 
            (msg.content.toLowerCase().includes("i'll go with") || 
             msg.content.toLowerCase().includes("sounds good") ||
             msg.content.toLowerCase().includes("perfect"))
        );
        
        // Current message has multiple venue recommendations with times/schedules
        const venueCount = (content.match(/(restaurant|hotel|tour|cafe|bar)/g) || []).length;
        const hasTimeInfo = content.includes("hours") || content.includes("schedule") || content.includes("open");
        
        return hasConfirmedAccommodation && venueCount >= 2 && hasTimeInfo;
    };

    // Exclude incomplete or question-focused responses
    const isIncompleteResponse = () => {
        return (
            content.includes("would you prefer") ||
            content.includes("next step:") ||
            content.includes("let me know") ||
            content.includes("how you'd like to proceed") ||
            content.endsWith("?")
        );
    };

    const hasItinerary = (hasStructuredSchedule() || hasCompleteTripPlan()) && !isIncompleteResponse();

    if (!hasItinerary) return null;

    return (
        <div className="mt-3 flex justify-start">
            <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 transition-colors text-sm font-medium"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                Export to Calendar
            </button>
        </div>
    );
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    metadata?: {
        listingReferences?: string[];
        categories?: string[];
    };
}

interface ChatInterfaceProps {
    initialMessages?: Message[];
    className?: string;
}

export default function ChatInterface({ initialMessages = [], className }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [userSettings, setUserSettings] = useState<TravelSettingsType | null>(null);

    // Load user settings from localStorage on startup
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem("veganbnb-user-preferences");
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                setUserSettings(settings);
                console.log("Loaded existing settings from localStorage:", settings);
            } else {
                setUserSettings(null);
                console.log("No settings found in localStorage");
            }
        } catch (error) {
            console.error("Failed to load user settings:", error);
        }
    }, []);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastUserMessageRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to last user message when new messages arrive (so user can see their question + start of AI response)
    useEffect(() => {
        if (lastUserMessageRef.current) {
            lastUserMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [messages]);

    // Autofocus the input field on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = useCallback(
        async (messageText?: string) => {
            const text = messageText || input.trim();
            if (!text || isLoading) return;

            // Debug command to check preferences
            if (text === "/debug-preferences") {
                const userMessage: Message = {
                    id: `user-${Date.now()}`,
                    role: "user",
                    content: "/debug-preferences",
                    timestamp: new Date(),
                };

                const debugMessage: Message = {
                    id: `debug-${Date.now() + 1}`,
                    role: "assistant",
                    content: `**🔍 Debug Info:**\n\n**User Settings Status:** ${userSettings ? "✅ Loaded" : "❌ Not loaded"}\n\n${userSettings ? `**Current Settings:**\n\`\`\`json\n${JSON.stringify(userSettings, null, 2)}\n\`\`\`` : "**localStorage data:** " + localStorage.getItem("veganbnb-user-preferences")}\n\n**How to verify AI sees them:** Check browser console for AI provider messages when you send a regular message.`,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, userMessage, debugMessage]);
                setInput(""); // Clear the input
                return;
            }

            const userMessage: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content: text,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput("");
            setIsLoading(true);

            // Scroll to user message after sending (will be the last user message)
            setTimeout(() => {
                if (lastUserMessageRef.current) {
                    lastUserMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: text,
                        chatHistory: messages.slice(-5), // Send last 5 messages for context
                        userPreferences: userSettings, // Send user settings for AI context
                    }),
                });

                const data = await response.json();

                // Check for rate limit error
                if (!response.ok && data.error === "rate_limit") {
                    // Create a special rate limit message
                    const rateLimitMessage: Message = {
                        id: `ratelimit-${Date.now()}`,
                        role: "assistant",
                        content: `⚠️ **${data.message}**\n\n${data.fallbackResponse || "I can still help with basic questions about vegan travel in Berlin!"}\n\n${data.devModeSuggestions ? `💡 **Developer Tip:**\n\n${data.devModeSuggestions}` : ""}`,
                        timestamp: new Date(),
                        metadata: {
                            isRateLimitError: true,
                            ...data.metadata
                        },
                    };
                    
                    setMessages((prev) => [...prev, rateLimitMessage]);
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to get response");
                }

                const assistantMessage: Message = {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    content: data.response,
                    timestamp: new Date(data.timestamp),
                    metadata: data.metadata,
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Handle interview completion - save preferences automatically
                if (data.metadata?.finalPreferences) {
                    console.log("🎯 Interview completed! Raw finalPreferences:", data.metadata.finalPreferences);
                    console.log("📋 Structure check:", {
                        budgetRange: data.metadata.finalPreferences.budgetRange,
                        eatingStyle: data.metadata.finalPreferences.eatingPreferences?.style,
                        includeBreakfast: data.metadata.finalPreferences.eatingPreferences?.includeBreakfast,
                        transportModes: data.metadata.finalPreferences.mobilityPreferences?.transportModes,
                        wheelchairAccessible: data.metadata.finalPreferences.mobilityPreferences?.wheelchairAccessible,
                        planningStyle: data.metadata.finalPreferences.tripPreferences?.planningStyle,
                        travelDates: data.metadata.finalPreferences.tripPreferences?.travelDates,
                        dietaryRestrictions: data.metadata.finalPreferences.dietaryRestrictions,
                    });

                    // Convert interview responses to user settings format
                    const settings: TravelSettingsType = {
                        budgetRange: data.metadata.finalPreferences.budgetRange || "any",
                        minSafetyScore: 70, // Default safe minimum
                        dietaryRestrictions: data.metadata.finalPreferences.dietaryRestrictions || [],
                        maxDistance: 2000, // Default 2km
                        openNow: false,
                        eatingPreferences: {
                            includeBreakfast: data.metadata.finalPreferences.eatingPreferences?.includeBreakfast ?? true,
                            includeSnacks: false,
                            style: data.metadata.finalPreferences.eatingPreferences?.style || "casual",
                            preferredMealTimes: data.metadata.finalPreferences.eatingPreferences?.preferredMealTimes,
                        },
                        mobilityPreferences: {
                            transportModes: data.metadata.finalPreferences.mobilityPreferences?.transportModes || ["walking", "public_transit"],
                            wheelchairAccessible: data.metadata.finalPreferences.mobilityPreferences?.wheelchairAccessible ?? false,
                            maxWalkingDistance: 15, // 15 minutes default
                            preferredPace: "moderate",
                        },
                        tripPreferences: {
                            planningStyle: data.metadata.finalPreferences.tripPreferences?.planningStyle || "flexible",
                            groupSize: 2, // Default
                            travelDates: data.metadata.finalPreferences.tripPreferences?.travelDates,
                        },
                    };

                    // Save to localStorage and update state
                    localStorage.setItem("veganbnb-user-preferences", JSON.stringify(settings));
                    setUserSettings(settings);

                    console.log("Settings auto-saved from interview:", settings);
                }
            } catch (error) {
                console.error("Chat error:", error);
                const errorMessage: Message = {
                    id: `error-${Date.now()}`,
                    role: "assistant",
                    content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
                // Refocus input after message is processed
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 100);
            }
        },
        [input, isLoading, messages, userSettings],
    );

    // Welcome message for first-time users (after onboarding)
    useEffect(() => {
        if (messages.length === 0 && userSettings) {
            // Send a welcome message now that onboarding is complete
            const welcomeMessage: Message = {
                id: `welcome-${Date.now()}`,
                role: "assistant",
                content: `Welcome to VeganBnB! I see you've completed your preferences. I have comprehensive data for **Berlin** with 32 food venues (restaurants, cafes, bars, ice cream), ${getListingsByCategory("accommodation").length} accommodations, ${getListingsByCategory("tour").length} tours, and ${getListingsByCategory("event").length} events.\n\nWhich city would you like to explore for your ${userSettings.tripPreferences?.planningStyle === "structured" ? "structured itinerary planning" : "flexible travel exploration"}?`,
                timestamp: new Date(),
            };
            setMessages([welcomeMessage]);
        }
    }, [messages.length, userSettings]); // Include all dependencies

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const MessageContent = ({ message }: { message: Message }) => {
        if (message.role === "user") {
            return <div className="whitespace-pre-wrap">{message.content}</div>;
        }

        return (
            <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
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
                        table: ({ children }) => (
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full border border-gray-300 text-xs">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-gray-200">{children}</tr>,
                        th: ({ children }) => <th className="border border-gray-300 px-2 py-1 text-left font-semibold">{children}</th>,
                        td: ({ children }) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
                        a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline font-medium">
                                {children}
                            </a>
                        ),
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        );
    };

    const getUserTextAlign = (role: string) => {
        return role === "user" ? "text-right" : "text-left";
    };

    const getFlexDirection = (role: string) => {
        return role === "user" ? "flex-row-reverse" : "flex-row";
    };

    const getAvatarColor = (role: string) => {
        return role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white";
    };

    const getBubbleColor = (role: string) => {
        return role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900";
    };

    return (
        <div className={`flex flex-col h-full max-w-4xl mx-auto ${className}`}>
            {/* Header */}
            <div className="border-b bg-white px-3 py-2 sm:p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                            <AvatarFallback className="bg-green-500 text-white">
                                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <h2 className="font-semibold text-sm sm:text-lg truncate">VeganBnB</h2>
                            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Your AI guide for complete vegan travel planning</p>
                        </div>
                    </div>

                    {/* Travel Settings Button */}
                    <TravelSettings onSettingsChange={setUserSettings} />
                </div>
            </div>

            {/* Settings Banner */}
            {userSettings && (
                <div className="bg-green-50 border-b border-green-200 px-3 py-2 sm:px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                        <span className="text-green-800">
                            <strong>Settings active:</strong>{" "}
                            {(() => {
                                const settings = [];

                                // Budget
                                if (userSettings.budgetRange !== "any") {
                                    settings.push(`${userSettings.budgetRange} budget`);
                                }

                                // Safety score
                                if (userSettings.minSafetyScore > 70) {
                                    settings.push(`${userSettings.minSafetyScore}+ safety`);
                                }

                                // Eating style
                                if (userSettings.eatingPreferences?.style && userSettings.eatingPreferences.style !== "casual") {
                                    settings.push(`${userSettings.eatingPreferences.style} dining`);
                                }

                                // Planning style
                                if (userSettings.tripPreferences?.planningStyle && userSettings.tripPreferences.planningStyle !== "flexible") {
                                    settings.push(`${userSettings.tripPreferences.planningStyle} planning`);
                                }

                                // Transport modes (show if not default walking + public transit)
                                const transportModes = userSettings.mobilityPreferences?.transportModes || [];
                                if (
                                    transportModes.length > 0 &&
                                    !(transportModes.length === 2 && transportModes.includes("walking") && transportModes.includes("public_transit"))
                                ) {
                                    const humanFriendlyModes = transportModes.map((mode) => {
                                        switch (mode) {
                                            case "public_transit":
                                                return "public transit";
                                            case "walking":
                                                return "walking";
                                            case "taxi":
                                                return "taxi";
                                            default:
                                                return mode;
                                        }
                                    });
                                    settings.push(humanFriendlyModes.join(" + "));
                                }

                                // Dietary restrictions
                                if (userSettings.dietaryRestrictions?.length > 0) {
                                    settings.push(userSettings.dietaryRestrictions.join(", "));
                                }

                                // Travel dates (format nicely)
                                if (userSettings.tripPreferences?.travelDates) {
                                    const dates = userSettings.tripPreferences.travelDates;
                                    // Convert formats like "19-21 nov" to "19-21 Nov"
                                    const formattedDates = dates.replace(
                                        /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi,
                                        (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase(),
                                    );
                                    settings.push(formattedDates);
                                }

                                return settings.length > 0 ? settings.join(" • ") : "Default settings";
                            })()}
                        </span>
                        <span className="text-green-600 text-xs hidden sm:block">Personalizing recommendations</span>
                    </div>
                </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 px-3 py-4 sm:p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((message, index, filteredMessages) => {
                        // Find the last user message for scroll targeting
                        const allMessagesAfterThis = messages.slice(messages.indexOf(message) + 1);
                        const isLastUserMessage = message.role === "user" && !allMessagesAfterThis.some((m) => m.role === "user");

                        return (
                            <div key={message.id}>
                                <div ref={isLastUserMessage ? lastUserMessageRef : null} className={`flex gap-3 ${getFlexDirection(message.role)}`}>
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className={getAvatarColor(message.role)}>
                                            {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className={`flex-1 max-w-[80%] ${getUserTextAlign(message.role)}`}>
                                        <div className={`rounded-lg p-3 ${getBubbleColor(message.role)}`}>
                                            <MessageContent message={message} />
                                        </div>

                                        <div className={`mt-1 text-xs text-gray-500 ${getUserTextAlign(message.role)}`}>{formatTimestamp(message.timestamp)}</div>
                                    </div>
                                </div>

                                {/* Calendar Export Button for itineraries */}
                                {message.role === "assistant" && index === filteredMessages.length - 1 && <CalendarExportButton messages={messages} />}
                            </div>
                        );
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
            <div className="border-t bg-white p-3 sm:p-4 pb-safe">
                <div className="flex gap-2 items-end">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder="Ask about vegan travel..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-11 max-h-[120px]"
                        disabled={isLoading}
                        rows={1}
                        style={{
                            height: "auto",
                            fontSize: "16px",
                            overflowY: input.split("\n").length > 3 ? "scroll" : "hidden",
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                        }}
                    />
                    <Button onClick={() => sendMessage()} disabled={!input.trim() || isLoading} className="bg-green-500 hover:bg-green-600 min-h-11 px-3">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
