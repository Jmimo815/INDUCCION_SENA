import React, { useState, useRef, useEffect } from 'react';
import { useInduction } from '../context/InductionContext';
import { SenaLogo } from './SenaLogo';
import { 
  Bot, 
  Send, 
  User, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const SofiaAssistantView: React.FC = () => {
  const { profile } = useInduction();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'model',
      text: `¡Hola, ${profile.nombre.split(' ')[0]}! Soy **Sofia**, tu tutora e Inteligencia Artificial de Inducción del SENA. 😊\n\nEstoy lista para orientarte en todo lo relacionado con la misión del SENA, el Reglamento del Aprendiz, los derechos y deberes, las plataformas SOFIA Plus / Zajuna, la Etapa Productiva y los servicios de Bienestar.\n\n¿En qué te puedo colaborar hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    "¿Cuáles son mis deberes principales según el Reglamento?",
    "¿Cómo funciona el Contrato de Aprendizaje en la Etapa Productiva?",
    "¿Qué es un Resultado de Aprendizaje (RAP) en SOFIA Plus?",
    "¿Cómo me postulo al Fondo Emprender SENA?",
    "¿Qué debo hacer en caso de calamidad o inasistencia médica?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
          apprenticeProfile: profile
        })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        text: data.response || 'Disculpa, no pude procesar la respuesta en este momento.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        text: 'Lo siento, ocurrió un contratiempo al conectar con el servidor. Inténtalo de nuevo en unos momentos.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown bolding before speaking
    const cleanText = text.replace(/\*\*/g, '').replace(/#/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-CO';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    setSpeakingMsgId(id);
    window.speechSynthesis.speak(utterance);
  };

  const formatMarkdownText = (content: string) => {
    // Simple parser for bold text and bullet lists
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const itemText = line.trim().substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <li key={idx} className="ml-4 list-disc my-0.5" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
      }
      return (
        <p key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-extrabold text-2xl shadow-sm">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Sofía — Tutora IA de Inducción SENA</h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Inteligencia Artificial para orientar tus preguntas institucionales, académicas y reglamentarias.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([{
              id: '1',
              sender: 'model',
              text: `¡Hola de nuevo, ${profile.nombre.split(' ')[0]}! Conversación reiniciada. ¿En qué te puedo ayudar?`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          }}
          className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors shrink-0"
          title="Reiniciar Conversación"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Suggestion Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Sugerencias rápidas de consulta:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-700 dark:text-slate-200 hover:text-emerald-900 dark:hover:text-emerald-300 text-xs font-medium rounded-xl transition-all text-left shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Thread */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/60">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <SenaLogo className="w-8 h-8 shrink-0 rounded-xl" />
                )}

                <div className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-xs space-y-2 shadow-2xs ${
                  isUser
                    ? 'bg-emerald-700 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}>
                  <div className="flex items-center justify-between gap-4 border-b pb-1.5 mb-1.5 text-[10px] opacity-80 border-current/10">
                    <span className="font-bold">{isUser ? 'Tú (Aprendiz)' : 'Sofía Tutora SENA'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="leading-relaxed font-normal">
                    {formatMarkdownText(msg.text)}
                  </div>

                  {!isUser && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => speakMessage(msg.text, msg.id)}
                        className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 transition-colors"
                      >
                        {speakingMsgId === msg.id ? <VolumeX className="w-3 h-3 text-red-600" /> : <Volume2 className="w-3 h-3" />}
                        <span>{speakingMsgId === msg.id ? 'Detener' : 'Escuchar respuesta'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <SenaLogo className="w-8 h-8 shrink-0 animate-pulse" />
              <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 flex items-center gap-2">
                <span className="animate-pulse font-semibold">Sofía está consultando el Reglamento SENA...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Escribe tu pregunta sobre la inducción SENA..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>

      </div>

    </div>
  );
};
