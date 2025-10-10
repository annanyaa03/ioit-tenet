export { type VideoProps } from './video';

export interface MusicConfig {
  route: string;
  music: string[];
}

export type Organizer = {
  name: string;
  phone?: string;
  email?: string;
};

export type Speaker = {
  id: string;
  name: string;
  url: string;
  image: string;
  title: string;
  bio?: string;
  domain?: string;
  sessionid: string;
};

export type EventType = {
  title: string;
  id: string;
  domain: string;
  description?: string;
  image: string;
  imp: boolean;
  date: string;
  location: string;
  organizers?: Organizer[];
  speakers?: string[];
  color: string;
  start: Date;
  time: string;
  registration?: string;
  icon?: string;
  munpage?: string;
  gallery?: string;
  schedule?: {
    title: string;
    time: string;
  }[];
};

export interface Sponsor {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  type?: string;
}

export interface navbarType {
  name: string;
  path: string;
}
