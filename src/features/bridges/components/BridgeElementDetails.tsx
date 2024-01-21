import { Panel } from 'primereact/panel';

export const BridgeElementDetails = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Panel header="General information">
          <div className="flex flex-col gap-3 pt-4">
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Type</span>
              <span>Pillar</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Description</span>
              <span>Best pillar in Lombardy</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Source of Description</span>
              <span>Notes</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">The span number</span>
              <span>002</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Unique Identifier</span>
              <span>P01.02</span>
            </div>
          </div>
        </Panel>

        <Panel header="Component">
          <div className="flex flex-col gap-3 pt-4">
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Bridge relative location (LxWxH)</span>
              <span>103m x 12m x 1m</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Size of the box (XxYxZ)</span>
              <span>10m x 3m x 24m</span>
            </div>
          </div>
        </Panel>

        <Panel header="General information">
          <div className="flex flex-col gap-3 pt-4">
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Contains metals</span>
              <span>No</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-primary font-bold">Has previous damages</span>
              <span>Yes</span>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
};
