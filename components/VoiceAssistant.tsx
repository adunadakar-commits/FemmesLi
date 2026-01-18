
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { 
  SYSTEM_INSTRUCTION, 
  decodeAudioData, 
  decode, 
  createPcmBlob 
} from '../services/geminiLive';
// Fix: ConnectionStatus is defined in types.ts, not geminiLive.ts
import { ConnectionStatus } from '../types';

interface VoiceAssistantProps {
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setStatus(ConnectionStatus.DISCONNECTED);
    setIsListening(false);
  }, []);

  const connect = async () => {
    try {
      setStatus(ConnectionStatus.CONNECTING);
      // Fix: Always use the direct process.env.API_KEY as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setStatus(ConnectionStatus.CONNECTED);
            setIsListening(true);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              // CRITICAL: Solely rely on sessionPromise resolves to send input
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            // Audio Output handling
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const oCtx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, oCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), oCtx, 24000, 1);
              const source = oCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(oCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Transcription handling
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => [...prev.slice(-4), `IA: ${text}`]);
            } else if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscription(prev => [...prev.slice(-4), `Vous: ${text}`]);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            setStatus(ConnectionStatus.ERROR);
          },
          onclose: () => {
            cleanup();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Connection failed:', err);
      setStatus(ConnectionStatus.ERROR);
    }
  };

  useEffect(() => {
    connect();
    return () => cleanup();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-6">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-xl w-full text-center space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Amira l'Assistante</h2>
          <p className="text-slate-400">Posez vos questions sur la carrière, vos droits ou déconstruisez les clichés ensemble.</p>
        </div>

        {/* Visualizer Circle */}
        <div className="relative flex items-center justify-center">
          <div className={`absolute w-48 h-48 rounded-full bg-emerald-500/20 animate-ping ${status !== ConnectionStatus.CONNECTED && 'hidden'}`}></div>
          <div className={`absolute w-32 h-32 rounded-full bg-emerald-500/40 animate-pulse ${status !== ConnectionStatus.CONNECTED && 'hidden'}`}></div>
          <div className="relative w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>

        <div className="h-32 flex flex-col items-center justify-center space-y-2">
          {status === ConnectionStatus.CONNECTING && <p className="text-emerald-400 animate-pulse">Initialisation de la connexion sécurisée...</p>}
          {status === ConnectionStatus.ERROR && <p className="text-red-400">Erreur de connexion. Veuillez réessayer.</p>}
          {status === ConnectionStatus.CONNECTED && (
            <div className="w-full space-y-2 overflow-hidden">
              {transcription.map((line, i) => (
                <p key={i} className={`text-sm ${line.startsWith('Vous:') ? 'text-slate-400' : 'text-emerald-300 font-medium'}`}>
                  {line}
                </p>
              ))}
              {transcription.length === 0 && <p className="text-emerald-400">Je vous écoute...</p>}
            </div>
          )}
        </div>

        <div className="pt-8">
          <button 
            onClick={cleanup}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Terminer la session
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
