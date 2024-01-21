import { ChangeEvent, useState, useEffect } from 'react';

import { IconRuler3 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { DetailContent } from '@/components/DetailContent';
import { useTableFilters } from '@/hooks/table-global-filters.hook';
import {getDrawingsList, useDrawingsList} from "@/features/bridges/api/getDocumentList.ts";
import {Document} from "@/features/bridges/models/document.model.ts";


export const BridgeTechnicalDrawingsPage = () => {
  const { filters, updateGlobalFilter } = useTableFilters();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: null
  });

  const {data: documents} = useDrawingsList(lazyState);

 /* const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    updateGlobalFilter(value);
  };*/

  const actionsTemplate = (rowData: any) => {
    return (
      <div className="flex">
        <i className="pi pi-download text-2xl mr-3" onClick={() => download(rowData)}></i>
        <i className="pi pi-trash text-2xl" onClick={() => deleteRow(rowData)}></i>
      </div>
    );
  };

  const totalRecords = 10; //temporaneo, deve poi essere aggiornato in base alla quantità di documenti sul db

  const download = (data: any) => {
    console.log('download ' + data);
  };

  const deleteRow = (data: any) => {
    console.log('delete ' + data);
  };

  const dateBodyTemplate = (rowData: any) => {
    return dayjs(rowData.lastUpdate).format('DD/MM/YYYY');
  };

  const onPage = (event: any) => {
    setlazyState(event);
  };

  const [loading, setLoading] = useState(false);
  const [doc, setDocuments] = useState<Document[] | null>(null);

  let networkTimeout: any = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    setLoading(true);

    if (networkTimeout) {
      clearTimeout(networkTimeout);
    }

    //imitate delay of a backend call
    networkTimeout = setTimeout(() => {
      getDrawingsList(lazyState).then((data) => {
        setDocuments(data);
        setLoading(false);
      });
    }, Math.random() * 1000 + 250);
  };

  return (
      <DetailContent title="Technical drawings" titleIcon={<IconRuler3 />}>
        <div className="inline-block w-full p-1">
          <Card className="inline-block w-full pb-3">
            <div className="flex justify-end items-center">
            </div>
            <DataTable value={documents} lazy first={lazyState.first} paginator rows={5} totalRecords={totalRecords} onPage={onPage} loading={loading}>
              <Column field="name" header="Name" />
              <Column field="lastUpdate" header="Last update" body={dateBodyTemplate} />
              <Column field="type" header="Type" />
              <Column body={actionsTemplate} header="Actions" className="w-[80px]" />
            </DataTable>
          </Card>
        </div>
      </DetailContent>
  );
};
