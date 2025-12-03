import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '../../../../utils/client';
import { GET_TUTORIAL_BY_SLUG } from '../../../../api/queries/tutorial';
import Tabs from '../../../components/Tabs';
import { urlFor } from '../../../../utils/imageUrl';
import type { Tutorial } from '../../../../types/types';

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = await client.fetch<Tutorial>(GET_TUTORIAL_BY_SLUG, { slug });

  if (!tutorial) {
    notFound();
  }

  const imageUrl = urlFor(tutorial.mainImage)?.width(800).height(500).url();

  return (
    <div className="container">
      <Tabs />
      <div className="tutorial-content">
        <article className="tutorial-detail">
          {imageUrl && (
            <div className="tutorial-image-wrapper">
              <Image
                src={imageUrl}
                alt={tutorial.title}
                width={800}
                height={500}
                className="tutorial-image"
              />
            </div>
          )}
          <h1 className="tutorial-title">{tutorial.title}</h1>
          {tutorial.intro && <p className="tutorial-intro">{tutorial.intro}</p>}
          {tutorial.author && (
            <p className="tutorial-author">Skrevet av {tutorial.author.name}</p>
          )}
        </article>
      </div>
    </div>
  );
}
