import { ChangeEvent, FC, useState } from 'react';

import { IconFile } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { formatDate } from 'utils/date.utils.ts';

import { useTableFilters } from '@/hooks/table-global-filters.hook.ts';
import { AppDocument } from '@/models/document.model.ts';

type DocumentsProps = {
  documents?: AppDocument[];
};

export const Documents: FC<DocumentsProps> = () => {
  const { filters, updateGlobalFilter } = useTableFilters();

  const [currentDocuments] = useState([
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 1' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 2' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 3' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 4' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 5' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 6' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 7' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 8' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 9' },
    { type: 'PDF', lastUpdate: '2024-04-10T14:48:00.000Z', name: 'Planimetry of bridge area 10' },
  ]);

  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    updateGlobalFilter(value);
  };

  const download = (data: any) => {
    console.log('download ' + data);
  };

  const deleteRow = (data: any) => {
    console.log('delete ' + data);
  };

  const dateBodyTemplate = (rowData: any) => {
    return formatDate(rowData.lastUpdate);
  };

  const actionsTemplate = (rowData: any) => {
    return (
      <div className="flex">
        <i className="pi pi-download text-2xl mr-3" onClick={() => download(rowData)}></i>
        <i className="pi pi-trash text-2xl" onClick={() => deleteRow(rowData)}></i>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-lg flex items-center">
          <IconFile className="me-2" />
          Documents
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={onGlobalFilterChange} placeholder="Search" />
        </span>
      </div>
      <DataTable
        className="pt-5 max-h-[calc(100vh-177px)]"
        value={currentDocuments}
        scrollable
        scrollHeight="flex"
        filters={filters}
        globalFilterFields={['name', 'type', 'lastUpdate']}
        emptyMessage="No documents found."
      >
        <Column field="name" header="Name"></Column>
        <Column field="lastUpdate" header="Last update" body={dateBodyTemplate}></Column>
        <Column field="type" header="Type"></Column>
        <Column body={actionsTemplate} header="Actions" className="w-[80px]"></Column>
      </DataTable>
    </>
  );
};
