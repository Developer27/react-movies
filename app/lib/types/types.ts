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

export type AnimeCharacterImages = {
  jpg: ImageType;
  webp: ImagesType;
};