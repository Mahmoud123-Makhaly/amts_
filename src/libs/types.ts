export type DefaultTemplateString = {
  default: string;
  template: string;
};
export type AbsoluteTemplateString = {
  absolute: string;
  template: string | null;
};
export type AbsoluteString = {
  absolute: string;
};
export type TemplateString = DefaultTemplateString | AbsoluteTemplateString | AbsoluteString;
type RobotsInfo = {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  nocache?: boolean;
  notranslate?: boolean;
  indexifembedded?: boolean;
  nositelinkssearchbox?: boolean;
  unavailable_after?: string;
  'max-video-preview'?: number | string;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
};
export type FormatDetection = {
  telephone?: boolean;
  date?: boolean;
  address?: boolean;
  email?: boolean;
  url?: boolean;
};
export enum OGTypes {
  Website = 'website',
  Article = 'article',
  Book = 'book',
  Profile = 'profile',
  MusicSong = 'music.song',
  MusicAlbum = 'music.album',
  MusicPlaylist = 'music.playlist',
  RadioStation = 'music.radio_station',
  VideoMovie = 'video.movie',
  VideoEpisode = 'video.episode',
  VideoTVShow = 'video.tv_show',
  VideoOther = 'video.other',
}
