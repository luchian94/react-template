import React from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { IconInfoCircle } from '@tabler/icons-react';
import { Card } from 'primereact/card';

import { DetailContent } from '@/components/DetailContent.tsx';
import { useCurrentBridgeGuarded } from '@/features/bridges/api/getBridge.ts';

export const BridgeGeneralDataPage = () => {
  const bridge = useCurrentBridgeGuarded();
  const generalData = [
    {
      label: 'Owner',
      value: 'Admin',
    },
    {
      label: 'Structure',
      value: 'Bridge',
    },
    {
      label: 'Council',
      value: 'Albano di Lucania',
    },
    {
      label: 'Province',
      value: 'Potenza',
    },
    {
      label: 'Region',
      value: 'Basilicata',
    },
    {
      label: 'Country',
      value: 'Italy',
    },
    {
      label: 'Code',
      value: '85010',
    },
    {
      label: 'Year',
      value: '1967',
    },
  ];

  return (
    <>
      <DetailContent title="General data" titleIcon={<IconInfoCircle />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 flex-grow">
            {generalData.map((data) => (
              <Card key={data.label}>
                <div className="grid grid-cols-2">
                  <div className="text-primary font-bold">{data.label}</div>
                  <div>{data.value}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="h-[300px]">
            <GoogleMap
              zoom={12}
              center={{ lat: bridge.lat, lng: bridge.lng }}
              mapContainerStyle={{ width: '100%', height: '100%' }}
            >
              <MarkerF position={{ lat: bridge.lat, lng: bridge.lng }}></MarkerF>
            </GoogleMap>
          </div>
        </div>
      </DetailContent>
    </>
  );
};
