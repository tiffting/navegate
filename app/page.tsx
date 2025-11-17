import Link from "next/link";
import { Bot, MapPin, Utensils, Hotel, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">VeganBnB</h1>
                                <p className="text-sm text-gray-600">AI-Powered Vegan Travel Intelligence</p>
                            </div>
                        </div>
                        <Link href="/chat">
                            <Button className="bg-green-500 hover:bg-green-600">
                                <Bot className="w-4 h-4 mr-2" />
                                Chat Assistant
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Vegan Travel Intelligence</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Stop juggling multiple apps. Get AI-powered safety scores and recommendations across restaurants, accommodations, tours, and events.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/chat">
                            <Button size="lg" className="bg-green-500 hover:bg-green-600">
                                <Bot className="w-5 h-5 mr-2" />
                                Start Planning My Trip
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" disabled className="relative cursor-not-allowed opacity-60" title="Coming Soon: Interactive map with venue discovery, filtering by safety scores, budget, and distance. Perfect for spontaneous explorers!">
                            <MapPin className="w-5 h-5 mr-2" />
                            Explore & Discover
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Soon</span>
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <Utensils className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Restaurants</h3>
                        <p className="text-gray-600 text-sm">Cross-contamination safety, staff knowledge, ingredient transparency</p>
                        <div className="mt-3 text-sm text-green-600 font-medium">36 listings • 0-98 safety scores</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Hotel className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Accommodations</h3>
                        <p className="text-gray-600 text-sm">Kitchen safety, vegan breakfast, bedding materials, host knowledge</p>
                        <div className="mt-3 text-sm text-green-600 font-medium">5 listings • 48-84 safety scores</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Tours</h3>
                        <p className="text-gray-600 text-sm">Guide expertise, meal handling, group dynamics, hidden animal exploitation</p>
                        <div className="mt-3 text-sm text-green-600 font-medium">4 listings • 75-94 safety scores</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Events</h3>
                        <p className="text-gray-600 text-sm">Food quality, accessibility, community atmosphere, inclusivity</p>
                        <div className="mt-3 text-sm text-green-600 font-medium">4 listings • 88-92 safety scores</div>
                    </div>
                </div>

                {/* Demo Section */}
                <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Try Our AI Assistant</h3>
                        <p className="text-gray-600">Ask me anything about vegan travel in Berlin. I have complete intelligence across all categories.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Sample Questions:</h4>
                            <div className="space-y-2">
                                <div className="bg-gray-50 rounded-lg p-3 text-sm">&quot;Berlin&quot;</div>
                                <div className="bg-gray-50 rounded-lg p-3 text-sm">&quot;I&apos;m planning to visit Amsterdam&quot;</div>
                                <div className="bg-gray-50 rounded-lg p-3 text-sm">&quot;What about Barcelona?&quot;</div>
                                <div className="bg-gray-50 rounded-lg p-3 text-sm">&quot;I&apos;m going to Berlin next month&quot;</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">AI Features:</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="text-sm text-gray-600">Category-adaptive safety analysis with explainable scores</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="text-sm text-gray-600">Multi-category trip planning in one conversation</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="text-sm text-gray-600">Review citations and reasoning for every recommendation</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="text-sm text-gray-600">Context-aware responses based on your preferences</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="text-sm text-gray-600">Actionable logistics with booking links and schedules</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/chat">
                            <Button size="lg" className="bg-green-500 hover:bg-green-600">
                                <Bot className="w-5 h-5 mr-2" />
                                Start Chatting Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
