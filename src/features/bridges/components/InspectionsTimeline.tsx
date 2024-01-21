import { useParams } from 'react-router-dom';

import { Timeline } from 'primereact/timeline';

import { formatDate } from '@/utils/date.utils.ts';

import { useStructureInspectionsQuery } from '../api/getStructureInspections.ts';
import { Inspection } from '../models/inspection.model.ts';
import { inspectionStoreActions, useCurrentInspection } from '../stores/inspections.store.ts';

export const InspectionsTimeline = () => {
  const { bridgeId } = useParams();

  const { data: inspectionsData } = useStructureInspectionsQuery(bridgeId);
  const currentInspection = useCurrentInspection();

  const { setCurrentInspection } = inspectionStoreActions;

  const inspections = inspectionsData?.inspections || [];

  const onInspectionClick = (inspection: Inspection) => {
    setCurrentInspection(inspection);
  };

  return (
    <Timeline
      value={inspections}
      layout="horizontal"
      marker={(item: Inspection) => {
        const isActive = currentInspection?.id === item.id;
        const activeClass = isActive ? 'bg-primary border-transparent' : 'bg-white';

        return (
          <div
            onClick={() => onInspectionClick(item)}
            className={`cursor-pointer rounded-full w-[20px] min-w-[20px] h-[20px] min-h-[20px] border-2 border-primary transition-all ease-in-out duration-300 ${activeClass}`}
          ></div>
        );
      }}
      content={(item: Inspection) => {
        const isActive = currentInspection?.id === item.id;
        const activeClass = isActive ? 'text-primary font-bold' : 'text-gray-600';

        return (
          <div
            className={`cursor-pointer transition-all ease-in-out duration-300 ${activeClass}`}
            onClick={() => onInspectionClick(item)}
          >
            {formatDate(item.date)}
          </div>
        );
      }}
    />
  );
};
