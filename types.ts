
export interface Profile {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Resource {
  title: string;
  category: string;
  link: string;
  icon: string;
}

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}
