import { DetailContent } from '@/components/DetailContent.tsx';
import { RetryErrorBoundary } from '@/components/misc/ErrorBoundary';

import { BridgeList } from '../features/bridges/components/BridgeList.tsx';
import { BridgeListMap } from '../features/bridges/components/BridgeListMap.tsx';

export const BridgeListPage = () => {
  return (
    <DetailContent title="Bridges">
      <RetryErrorBoundary>
        <BridgeListMap />
        <div className="mt-6">
          <BridgeList />
        </div>
      </RetryErrorBoundary>
    </DetailContent>
  );
};
