import { client } from '../../../utils/client';
import { GET_ARTICLES } from '../../../api/queries/article';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import type { Article } from '../../../types/types';

export default async function ArticlesPage() {
  const articles = await client.fetch<Article[]>(GET_ARTICLES);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Alle artikler</h1>
        {articles && articles.length > 0 ? (
          <div className="cards-grid">
            {articles.map((article) => (
              <Card key={article._id} item={article} type="article" />
            ))}
          </div>
        ) : (
          <p className="empty-state">No articles found.</p>
        )}
      </div>
    </div>
  );
}
