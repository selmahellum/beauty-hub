import { groq } from 'next-sanity';

const GET_HOMEPAGE = groq`*[_id == "homePage"][0]{
  title, 
  intro, 
  featuredContent[]->{
    _id,
    _type,
    title, 
    slug, 
    intro, 
    image,
    mainImage,
    category
  }
}`;

export default GET_HOMEPAGE;
