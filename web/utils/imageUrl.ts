import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';
import type { SanityImage } from '../types/types';

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage | undefined) {
  if (!source) return null;
  return builder.image(source);
}
