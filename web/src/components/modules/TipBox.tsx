import Image from 'next/image';
import { urlFor } from '../../../utils/imageUrl';
import type { TipBox } from '../../../types/types';
import { LuMessageCircleHeart } from 'react-icons/lu';

type TipBoxProps = {
  module: TipBox;
};

export default function TipBoxModule({ module }: TipBoxProps) {
  const imageUrl = module.image
    ? urlFor(module.image)?.width(600).height(400).url()
    : null;

  return (
    <div className="tip-box">
      <div className="tip-box-inner">
        {imageUrl && (
          <div className="tip-box-image-wrapper">
            <Image
              src={imageUrl}
              alt={module.title || 'Tipsboks bilde'}
              width={120}
              height={120}
              className="tip-box-image"
            />
          </div>
        )}
        <div className="tip-box-content">
          {module.title && (
            <h3 className="tip-box-title">
              <LuMessageCircleHeart className="tip-box-icon" />
              {module.title}
            </h3>
          )}
          {module.intro && <p className="tip-box-intro">{module.intro}</p>}
        </div>
      </div>
    </div>
  );
}
