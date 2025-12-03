import { client } from '../../../utils/client';
import { GET_TUTORIALS } from '../../../api/queries/tutorial';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import type { Tutorial } from '../../../types/types';

export default async function TutorialsPage() {
  const tutorials = await client.fetch<Tutorial[]>(GET_TUTORIALS);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Alle tutorials</h1>
        {tutorials && tutorials.length > 0 ? (
          <div className="cards-grid">
            {tutorials.map((tutorial) => (
              <Card key={tutorial._id} item={tutorial} type="tutorial" />
            ))}
          </div>
        ) : (
          <p className="empty-state">No tutorials found.</p>
        )}
      </div>
    </div>
  );
}
