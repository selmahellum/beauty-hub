import BlockContent from '../BlockContent';
import type { TextModule } from '../../../types/types';

type TextModuleProps = {
  module: TextModule;
};

export default function TextModule({ module }: TextModuleProps) {
  if (!module.content) return null;

  return (
    <div className="text-module">
      <BlockContent content={module.content} />
    </div>
  );
}

