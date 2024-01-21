import { ReactNode } from 'react';

type BridgeContainerProps = {
  title?: string;
  beforeTitleContent?: ReactNode | undefined;
  titleIcon?: ReactNode | undefined;
  titleContent?: ReactNode | undefined;
  children?: ReactNode | undefined;
};

export const DetailContent = ({
  title,
  titleIcon,
  beforeTitleContent,
  titleContent,
  children,
}: BridgeContainerProps) => {
  return (
    <div className="w-full h-full px-12 py-4 bg-neutral-100 relative">
      {beforeTitleContent}
      {titleContent || (
        <div className="text-2xl mb-6 text-gray-700 flex items-center">
          {titleIcon && <span className="me-2">{titleIcon}</span>}
          {title}
        </div>
      )}
      <div className="h-[calc(100vh-296px)] md:h-[calc(100vh-236px)] overflow-auto">{children}</div>
    </div>
  );
};
