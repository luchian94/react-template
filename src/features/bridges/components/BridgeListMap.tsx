import React, { memo, useCallback, useState } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { Card } from 'primereact/card';

import { useBridgeListQuery } from '../api/getBridgeList.ts';

export const BridgeListMap = memo(() => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { data } = useBridgeListQuery();

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const onLoad = useCallback((callbackMap: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();

    data.forEach((bridge) => {
      bounds.extend(new google.maps.LatLng(bridge.lat, bridge.lng));
    });

    callbackMap.fitBounds(bounds);
    setMap(callbackMap);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Card>
      <div className="h-[300px]">
        <GoogleMap
          zoom={3}
          center={{ lat: 12, lng: 0 }}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {data.map((bridge) => (
            <MarkerF key={bridge.id} position={{ lat: bridge.lat, lng: bridge.lng }}></MarkerF>
          ))}
        </GoogleMap>
      </div>
    </Card>
  );
});

BridgeListMap.displayName = 'BridgeListMap';
