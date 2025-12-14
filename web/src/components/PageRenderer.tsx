import TextModule from './modules/TextModule';
import TipBoxModule from './modules/TipBox';
import ProductListModule from './modules/ProductList';
import RelatedContentModule from './modules/RelatedContent';
import type { PageModule } from '../../types/types';

type PageRendererProps = {
  modules?: PageModule[];
};

export default function PageRenderer({ modules }: PageRendererProps) {
  if (!modules || modules.length === 0) return null;

  return (
    <div className="page-modules">
      {modules.map((module) => {
        if (!module || !module._type) return null;

        switch (module._type) {
          case 'textModule':
            return <TextModule key={module._key} module={module} />;
          case 'tipBox':
            return <TipBoxModule key={module._key} module={module} />;
          case 'productList':
            return <ProductListModule key={module._key} module={module} />;
          case 'relatedContent':
            return <RelatedContentModule key={module._key} module={module} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

