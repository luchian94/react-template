import { useState } from 'react';

import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta, DataTableFilterMetaData } from 'primereact/datatable';

export const useTableFilters = (matchMode = FilterMatchMode.CONTAINS) => {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: matchMode },
  });

  const updateGlobalFilter = (value: string | null | undefined, matchMode?: FilterMatchMode) => {
    setFilters((prevState) => {
      const globalFilter = prevState.global as DataTableFilterMetaData;
      return {
        ...filters,
        global: {
          value,
          matchMode: matchMode ?? globalFilter['matchMode'],
        },
      };
    });
  };

  return { filters, setFilters, updateGlobalFilter };
};
