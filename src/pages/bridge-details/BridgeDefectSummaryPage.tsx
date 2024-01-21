import { useMemo } from 'react';

import { IconWallOff } from '@tabler/icons-react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { DetailContent } from '@/components/DetailContent.tsx';
import { NoteDetails } from '@/components/NoteDetails.tsx';
import { IMAGES } from '@/constants/images.tsx';

export const BridgeDefectSummaryPage = () => {
  const getTitleContent = useMemo(() => {
    return (
      <div>
        {/*<Timeline value={events} layout="horizontal" align="top" content={(item) => item} />*/}
        <div className="text-2xl mb-8 text-gray-700 flex items-center gap-1.5">
          <span className="me-2">
            <IconWallOff size={30} />
          </span>
          Defect Summary
        </div>
      </div>
    );
  }, []);

  return (
    <DetailContent titleContent={getTitleContent}>
      <Accordion activeIndex={0}>
        <AccordionTab header="Difect I">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            <img src={IMAGES.bridgeDefect1} alt=""></img>
            <img src={IMAGES.bridgeDefect2} alt=""></img>
            <img src={IMAGES.bridgeDefect3} alt=""></img>
            <img src={IMAGES.bridgeDefect3} alt=""></img>
            <img src={IMAGES.bridgeDefect3} alt=""></img>
          </div>
          <div className="flex mb-4">
            <div className="flex flex-col me-16">
              <div>Defect</div>
              <div className="font-bold">Crack</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Length</div>
              <div className="font-bold">10</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Orientation</div>
              <div className="font-bold">...</div>
            </div>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
        </AccordionTab>
        <AccordionTab header="Difect II">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <img src={IMAGES.bridgeDefect1} alt=""></img>
            <img src={IMAGES.bridgeDefect2} alt=""></img>
            <img src={IMAGES.bridgeDefect3} alt=""></img>
          </div>
          <div className="flex mb-4">
            <div className="flex flex-col me-16">
              <div>Defect</div>
              <div className="font-bold">Crack</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Length</div>
              <div className="font-bold">10</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Orientation</div>
              <div className="font-bold">...</div>
            </div>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
        </AccordionTab>
        <AccordionTab header="Difect III">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <img src={IMAGES.bridgeDefect1} alt=""></img>
            <img src={IMAGES.bridgeDefect2} alt=""></img>
            <img src={IMAGES.bridgeDefect3} alt=""></img>
          </div>
          <div className="flex mb-4">
            <div className="flex flex-col me-16">
              <div>Defect</div>
              <div className="font-bold">Crack</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Length</div>
              <div className="font-bold">10</div>
            </div>
            <div className="flex flex-col me-16">
              <div>Orientation</div>
              <div className="font-bold">...</div>
            </div>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
          <div className="mb-2">
            <NoteDetails></NoteDetails>
          </div>
        </AccordionTab>
      </Accordion>
    </DetailContent>
  );
};
