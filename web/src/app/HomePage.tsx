import { client } from '../../utils/client';
import GET_HOMEPAGE from '../../api/queries/homepage';
import Tabs from '../components/Tabs';
import Card from '../components/Card';
import type { HomePage, Article, Tutorial } from '../../types/types';

async function getHomepageData() {
  try {
    const homepage = await client.fetch<HomePage>(GET_HOMEPAGE);
    return homepage;
  } catch (err) {
    console.error('Sanity fetch homepage error:', err);
    return null;
  }
}

export default async function HomePage() {
  const homepage = await getHomepageData();

  if (!homepage) {
    return (
      <div className="container">
        <Tabs />
        <h1>Homepage not found</h1>
      </div>
    );
  }

  const { title, intro, featuredContent = [] } = homepage;

  return (
    <div className="container">
      <Tabs />
      <div className="homepage-content">
        {title && <h1 className="title">{title}</h1>}
        {intro && <p className="intro">{intro}</p>}

        {featuredContent.length > 0 && (
          <div className="featured-section">
            <section className="featured-items">
              <h2 className="section-title">Fremhevet innhold</h2>
              <div className="cards-grid">
                {featuredContent.map((item) => (
                  <Card
                    key={item._id}
                    item={item as Article | Tutorial}
                    type={item._type === 'article' ? 'article' : 'tutorial'}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
