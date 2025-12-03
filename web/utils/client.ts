import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'kyj4zlry',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
});
