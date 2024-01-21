import { IconDatabase } from '@tabler/icons-react';
import { Message } from 'primereact/message';

import { ModelViewer } from '@/components/3D/ModelViewer.tsx';
import { DetailContent } from '@/components/DetailContent.tsx';
import { BridgeElementsTable } from '@/features/bridges/components/BridgeElementsTable.tsx';
import { useBridge } from '@/features/bridges/stores/bridge.store.ts';

export const BridgeMasterDataPage = () => {
  const bridge = useBridge();

  if (!bridge || !bridge.ifcMeshUrl) {
    return (
      <Message
        className="w-full"
        severity="warn"
        title="Attention"
        text="Could not get 3D Model file of the bridge."
      />
    );
  }

  return (
    <>
      <DetailContent title="Master Data" titleIcon={<IconDatabase />}>
        <div className="h-2/3 relative overflow-hidden">
          <ModelViewer
            rootUrl="/3d-models/moliano/"
            fileName={bridge.ifcMeshUrl}
            modelName={bridge.name}
            canvasId={`bridge-${bridge.name}`}
            highlightMeshes={true}
          />
        </div>

        <div className="mt-6">
          <BridgeElementsTable />
        </div>
      </DetailContent>
    </>
  );
};
