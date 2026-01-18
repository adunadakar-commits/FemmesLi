
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

export const SYSTEM_INSTRUCTION = `
Tu es "Amira", l'assistante vocale du portail des femmes de la Ligue Islamique.
Ton rôle est de valoriser la femme musulmane comme étant une actrice compétente, travailleuse et autonome de la société française.
Tu aides les utilisatrices à :
1. Déconstruire les clichés de "femme soumise".
2. Donner des conseils de carrière et d'entrepreneuriat.
3. Informer sur les droits des femmes en France.
4. Apporter un soutien bienveillant et professionnel.
Parle d'un ton dynamique, assuré et respectueux. Évite les réponses trop longues.
`;

export function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
