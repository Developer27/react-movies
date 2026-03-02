type ImageFormat = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type ImageType = {
  image_url: string;
};

export type ImagesType = {
  jpg: ImageFormat;
  webp: ImageFormat;
};

export type AiredType = {
  from: string;
  to: string;
};

export type StudiosType = {
  mal_id: number;
  name: string;
  type: string;
  url: string;
};

export type GenreType = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type ThemeType = {
  mal_id: number;
  name: string;
  url: string;
};

export type AnimeCharacterImages = {
  jpg: ImageType;
  webp: ImagesType;
};

export type AnimeItemType = {
  mal_id: number;
  url: string;
  images: ImagesType;
  type: string;
  status: string;
  title_english: string;
  title_japanese: string;
  title: string;
  episodes: string;
  score: string;
  source: string;
  rating: string;
  synopsis: string;
  year:   number;
  aired: AiredType;
  studios: StudiosType[];
  genres: GenreType[];
  themes: ThemeType[];
};

export type AnimeType = {
  mal_id: number;
  title: string;
  images: ImagesType;
};

export type AnimeArrType = {
  role: string;
  anime: AnimeType;
};

type MangaType = {
  mal_id: number;
  title: string;
  images: ImagesType;
};

export type MangaArrType = {
  role: string;
  manga: MangaType;
};


export type VoiceType = {
  language: string;
  person: VoicePersonType;
};

type VoicePersonType = {
  mal_id: number;
  name: string;
  url: string;
  images: { jpg: { image_url: string } };
};



type PaginationItemType = {
  count: number;
  total: number;
  per_page: number;
};

export type PaginationDataType = {
  current_page: number;
  last_visible_page: number;
  items: PaginationItemType;
  has_next_page: boolean;
};
