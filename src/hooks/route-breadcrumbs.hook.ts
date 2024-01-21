import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

import { RouteHandleData } from 'models/misc.ts';

import { BreadcrumbItemTemplate } from '@/components/misc/BreadcrumbItemTemplate';
import { BRIDGE_DETAIL_KEY } from '@/features/bridges/constants';
import { useBridgeBaseInfo } from '@/features/bridges/stores/bridge.store';

export const useRouteBreadcrumbs = () => {
  const matches = useMatches();
  const { bridgeId, bridgeName } = useBridgeBaseInfo();

  // Memoize the result to prevent unnecessary recalculations.
  return useMemo(() => {
    return (
      matches
        // Ignore routes which don't have breadcrumbs defined as part of their handle.
        .filter((match) => {
          return Boolean((match.handle as RouteHandleData | undefined)?.breadcrumbs);
        })
        .flatMap((match) => {
          const handleData = match.handle as RouteHandleData;
          return handleData.breadcrumbs.map((breadcrumb) =>
            breadcrumb.id === BRIDGE_DETAIL_KEY
              ? {
                  label: bridgeName,
                  template: BreadcrumbItemTemplate,
                }
              : breadcrumb,
          );
        })
    );
  }, [matches, bridgeId, bridgeName]);
};
