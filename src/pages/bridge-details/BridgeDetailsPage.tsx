import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { DefaultSuspense } from '@/components/misc/Suspense.tsx';
import { useCurrentBridgeQuery } from '@/features/bridges/api/getBridge.ts';
import { useStructureInspectionsQuery } from '@/features/bridges/api/getStructureInspections.ts';
import { BridgeSidebar } from '@/features/bridges/components/BridgeSidebar.tsx';
import { bridgeStoreActions } from '@/features/bridges/stores/bridge.store.ts';
import { inspectionStoreActions } from '@/features/bridges/stores/inspections.store.ts';

export const BridgeDetailsPage = () => {
  const { bridgeId } = useParams();

  const { data: inspectionsData } = useStructureInspectionsQuery(bridgeId);
  const { data: bridgeData } = useCurrentBridgeQuery();

  const { setBridge } = bridgeStoreActions;
  const { setCurrentInspection } = inspectionStoreActions;

  useEffect(() => {
    if (inspectionsData?.lastInspection) {
      setCurrentInspection(inspectionsData.lastInspection);
    }
  }, [inspectionsData]);

  useEffect(() => {
    setBridge(bridgeData);

    return () => {
      setBridge(null);
    };
  }, [bridgeData?.id]); // TODO: CHECK IF THIS IS OK

  return (
    <div className="block md:flex h-[calc(100vh-108px)]">
      <div className="w-full md:max-w-[300px] px-10 md:py-8 pt-4 border-r-2 border-neutral-200 md:overflow-auto bg-neutral-100 md:bg-white">
        <BridgeSidebar />
      </div>
      <div className="w-full md:w-[calc(100%-300px)]">
        <DefaultSuspense>
          <Outlet />
        </DefaultSuspense>
      </div>
    </div>
  );
};
