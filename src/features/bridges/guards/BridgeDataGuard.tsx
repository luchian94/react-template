import React, { FC, ReactNode } from 'react';

import { Message } from 'primereact/message';

import { DetailContent } from '@/components/DetailContent.tsx';
import { AppSpinner } from '@/components/misc/AppSpinner.tsx';
import { useCurrentBridgeQuery } from '@/features/bridges/api/getBridge.ts';

type BridgeDataWrapperProps = {
  children: ReactNode;
};

export const BridgeDataGuard: FC<BridgeDataWrapperProps> = (props) => {
  const { data: bridge, isPending } = useCurrentBridgeQuery();

  if (isPending) {
    return <AppSpinner />;
  }

  if (!bridge) {
    return (
      <DetailContent>
        <Message severity="error" text="Could not get bridge data" className="w-full" />
      </DetailContent>
    );
  }

  return props.children;
};
