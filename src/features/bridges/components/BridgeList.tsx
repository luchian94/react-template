import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useBridgeListQuery } from '../api/getBridgeList.ts';

export const BridgeList = () => {
  const { data } = useBridgeListQuery();
  const navigate = useNavigate();

  const goToDetail = (bridgeId: number) => {
    navigate(`/bridge/${bridgeId}`);
  };

  const dateBodyTemplate = (rowData: any) => {
    return dayjs(rowData.date).format('DD/MM/YYYY');
  };

  return (
    <>
      <Card className="w-full">
        <DataTable
          value={data}
          emptyMessage="No bridges found."
          selectionMode="single"
          onSelectionChange={(e) => goToDetail(e.value.id)}
        >
          <Column field="name" header="Structure Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="country" header="Country"></Column>
          <Column
            field="lastInspectionDate"
            dataType="date"
            header="Inspection date"
            body={dateBodyTemplate}
          ></Column>
          <Column field="droneOperator" header="Drone Operator"></Column>
        </DataTable>
      </Card>
    </>
  );
};
