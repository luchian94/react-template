import { IconCirclePlus } from '@tabler/icons-react';
import { IMAGES } from 'constants/images.tsx';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

import { NoteDetails } from '@/components/NoteDetails.tsx';

import { useSelectedDefect } from '../stores/defects.store.tsx';

export const BridgeDefectDetails = () => {
  const defect = useSelectedDefect();

  if (!defect) {
    return (
      <Message className="w-full" severity="warn" title="Attention" text="No defect was set" />
    );
  }

  return (
    <>
      <div className="text-2xl">{defect.name}</div>

      <Divider />

      <div className="mt-4">
        <img src={IMAGES.bridgeDefect1} alt={defect.name} />
      </div>

      <Card className="mt-6 bg-primary text-white">
        <div className="grid grid-cols-4">
          <div className="flex flex-col gap-1">
            <span>Defect</span>
            <span className="font-bold">Crack</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Length</span>
            <span className="font-bold">10</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Orientation</span>
            <span className="font-bold">Unknown</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-2 mt-6">
        <IconCirclePlus className="ml-auto" size={40} />
        <NoteDetails />
        <NoteDetails />
      </div>
    </>
  );
};
