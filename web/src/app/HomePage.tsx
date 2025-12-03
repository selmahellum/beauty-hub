import { client } from '../../utils/client';
import GET_HOMEPAGE from '../../api/queries/homepage';
import Tabs from '../components/Tabs';
import Card from '../components/Card';
import type { HomePage } from '../../types/types';

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

  const { title, intro, articles = [], tutorials = [] } = homepage;

  return (
    <div className="container">
      <Tabs />
      <div className="homepage-content">
        {title && <h1 className="title">{title}</h1>}
        {intro && <p className="intro">{intro}</p>}

        <div className="featured-section">
          {articles.length > 0 && (
            <section className="featured-items">
              <h2 className="section-title">Aktuelt</h2>
              <div className="cards-grid">
                {articles.slice(0, 3).map((article) => (
                  <Card key={article._id} item={article} type="article" />
                ))}
              </div>
            </section>
          )}

          {tutorials.length > 0 && (
            <section className="featured-items">
              <h2 className="section-title">Populære tutorials</h2>
              <div className="cards-grid">
                {tutorials.slice(0, 3).map((tutorial) => (
                  <Card key={tutorial._id} item={tutorial} type="tutorial" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
