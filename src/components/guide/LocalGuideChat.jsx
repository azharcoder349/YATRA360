import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  MapPin, 
  HelpCircle, 
  ShieldCheck, 
  X,
  ExternalLink,
  Key
} from 'lucide-react';
import { askLocalGuideAi, isGeminiKeyConfigured } from '../../services/gemini';

export default function LocalGuideChat({
  currentDestination = null,
  onClearDestinationContext = null,
  onOpenApiKeyModal = null,
  isDrawer = false,
  onCloseDrawer = null
}) {
  const isKeyActive = isGeminiKeyConfigured();
  const messagesEndRef = useRef(null);

  // Initial greeting
  const [messages, setMessages] = useState(() => [
    {
      id: 'msg-0',
      role: 'assistant',
      content: currentDestination
        ? `Namaste! I am **Local Explorer AI**. You are currently looking at **${currentDestination.name}** in ${currentDestination.city}, ${currentDestination.state}.\n\nAsk me anything about its hidden architecture, oral folklore, visiting timings, or local culinary specialties!`
        : `Namaste! I am **Local Explorer AI**, your companion for discovering India's lesser-known sacred shrines, subterranean stepwells, crater lakes, and living artisan villages.\n\nHow can I help you explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      engine: isKeyActive ? 'gemini_api' : 'rule_based',
      engineLabel: isKeyActive ? 'Google Gemini 1.5 Flash' : 'ExploreLocal Curated Knowledge Base'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Suggested prompt pills
  const samplePrompts = currentDestination ? [
    `What makes ${currentDestination.name} so special?`,
    `Tell me the history and folklore of this place.`,
    `What local food should I try nearby?`,
    `What are the best visiting hours and photography tips?`
  ] : [
    'What is special about the hanging pillar at Lepakshi?',
    'Tell me the history behind Chand Baori stepwell in Rajasthan.',
    'Which hidden places can I explore near Pune or Jaipur?',
    'How do I visit the living root bridges in Meghalaya?',
    'What authentic local dishes should I try in Kumaon?'
  ];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await askLocalGuideAi([...messages, userMsg], currentDestination);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: response.engine,
        engineLabel: response.engineLabel,
        sourceContext: response.sourceContext
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Failed to get assistant response', err);
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an unexpected error processing that question. Please try asking again or select one of the suggested prompts below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: 'rule_based',
        engineLabel: 'System Error Fallback'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `Chat session refreshed. How can I guide your discovery today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: isKeyActive ? 'gemini_api' : 'rule_based',
        engineLabel: isKeyActive ? 'Google Gemini 1.5 Flash' : 'ExploreLocal Curated Knowledge Base'
      }
    ]);
  };

  return (
    <div className={`flex flex-col bg-white rounded-3xl border border-cream-200 shadow-warm overflow-hidden ${
      isDrawer ? 'h-full max-h-[92vh]' : 'max-w-4xl mx-auto my-8 h-[740px]'
    }`}>
      
      {/* Chat Header */}
      <div className="p-4 sm:p-5 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-800 text-amber-300 flex items-center justify-center border border-forest-700">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold">Local Explorer AI</h3>
              <span className="px-2 py-0.2 rounded-md bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                {isKeyActive ? 'Gemini 1.5' : 'Knowledge Base'}
              </span>
            </div>
            <p className="text-[11px] text-forest-200">
              {currentDestination ? `Focusing on: ${currentDestination.name}` : 'Your AI Cultural Guide to India’s Hidden Places'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            className="p-2 rounded-xl text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isDrawer && onCloseDrawer && (
            <button
              type="button"
              onClick={onCloseDrawer}
              className="p-2 rounded-xl text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
              title="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Destination Context Pill (if attached) */}
      {currentDestination && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="truncate">
              Answering with context for: <strong>{currentDestination.name}</strong> ({currentDestination.city})
            </span>
          </div>
          {onClearDestinationContext && (
            <button
              type="button"
              onClick={onClearDestinationContext}
              className="text-amber-800 hover:text-amber-950 font-bold shrink-0 ml-2"
              title="Clear destination focus"
            >
              Clear Focus &times;
            </button>
          )}
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF6F0]/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                isUser
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'bg-forest-800 text-amber-300 shadow-sm'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 shadow-sm ${
                isUser
                  ? 'bg-forest-800 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-cream-200 rounded-tl-none'
              }`}>
                {/* Content */}
                <div className="whitespace-pre-line prose-xs">
                  {msg.content}
                </div>

                {/* Bubble Footer info */}
                <div className={`flex items-center justify-between gap-3 pt-1 border-t text-[10px] ${
                  isUser ? 'border-forest-700/60 text-forest-200' : 'border-gray-100 text-gray-400'
                }`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.engineLabel && (
                    <span className="flex items-center gap-1 text-[9px] font-semibold text-forest-700 bg-forest-50 px-1.5 py-0.5 rounded">
                      <Sparkles className="w-2.5 h-2.5" />
                      {msg.engineLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-forest-800 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-cream-200 shadow-sm flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-ping" />
              <span>Consulting cultural records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="p-3 bg-white border-t border-cream-200 space-y-1.5">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
          Suggested Questions:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-forest-50/80 hover:bg-forest-100 border border-forest-200/80 text-forest-900 text-xs font-medium whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-cream-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about temples, history, folklore, food, or itinerary advice..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Ask Guide</span>
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Factual heritage verified from ASI &amp; living traditions.</span>
          </span>
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="text-forest-700 hover:underline flex items-center gap-1 font-semibold"
          >
            <Key className="w-3 h-3" />
            <span>{isKeyActive ? 'Gemini Active' : 'Switch to Gemini AI'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}

