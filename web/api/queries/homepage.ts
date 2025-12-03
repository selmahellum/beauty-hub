import { groq } from 'next-sanity';

const GET_HOMEPAGE = groq`*[_id == "homePage"][0]{title, intro, articles[]->{_id, title, slug, intro, image}, tutorials[]->{_id, title, slug, intro, mainImage}}`;

export default GET_HOMEPAGE;
