import { useEffect, useMemo } from 'react';

import { IconBuildingBridge2, IconCircleArrowLeft } from '@tabler/icons-react';
import { InspectionsTimeline } from 'features/bridges/components/InspectionsTimeline.tsx';

import { DetailContent } from '@/components/DetailContent.tsx';
import { GlobalErrorBoundary } from '@/components/misc/ErrorBoundary.tsx';
import { DefaultSuspense } from '@/components/misc/Suspense.tsx';
import { BridgeElementViewer } from '@/features/bridges/components/BridgeElementViewer.tsx';
import { BridgeViewer } from '@/features/bridges/components/BridgeViewer.tsx';
import {
  bridgeStoreActions,
  useSelectedBridgeElement,
} from '@/features/bridges/stores/bridge.store.ts';
import { DefectsProvider } from '@/features/bridges/stores/defects.store';
import { ModelViewerProvider } from '@/stores/model-viewer.store.tsx';

export const BridgeVisualizationPage = () => {
  const selectedElement = useSelectedBridgeElement();
  const { setBridgeElement } = bridgeStoreActions;

  useEffect(() => {
    return () => {
      setBridgeElement(null);
    };
  }, []);

  const getTitleContent = useMemo(() => {
    if (selectedElement) {
      return (
        <div className="text-2xl mb-8 text-gray-700 flex items-center gap-1.5">
          <IconCircleArrowLeft
            size={30}
            className="cursor-pointer hover:text-primary mr-2"
            onClick={() => setBridgeElement(null)}
          />
          {selectedElement}
        </div>
      );
    }

    return (
      <div className="text-2xl mb-8 text-gray-700 flex items-center gap-1.5">
        <span className="me-2">
          <IconBuildingBridge2 size={30} />
        </span>
        Bridge 3D Model
      </div>
    );
  }, [selectedElement]);

  return (
    <>
      <DetailContent
        titleContent={getTitleContent}
        beforeTitleContent={
          <div className="mb-6">
            <InspectionsTimeline />
          </div>
        }
      >
        <GlobalErrorBoundary>
          <DefaultSuspense>
            <span className={selectedElement ? 'hidden' : ''}>
              <ModelViewerProvider>
                <DefectsProvider>
                  <BridgeViewer />
                </DefectsProvider>
              </ModelViewerProvider>
            </span>
            {selectedElement && (
              <ModelViewerProvider>
                <DefectsProvider>
                  <BridgeElementViewer />
                </DefectsProvider>
              </ModelViewerProvider>
            )}
          </DefaultSuspense>
        </GlobalErrorBoundary>
      </DetailContent>
    </>
  );
};
