import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosClient } from '@/core/axios-client.ts';

import { Document } from '../models/document.model.ts';

const QUERY_KEY_DRAWING = ['DrawingsList'];
const QUERY_KEY_REPORT = ['ReportsList'];

export const getDrawingsList = async (lazyState: any): Promise<Document[]> => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 250));
  const response = await axiosClient.get(`mock/drawings-list.json`);

  const start = lazyState.first;
  const end = lazyState.first + lazyState.rows;
  const data = response.data.slice(start, end);

  return data;
};

export const useDrawingsList = (lazyState: any) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY_DRAWING, lazyState],
    queryFn: () => getDrawingsList(lazyState),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const getReportsListQuery = async (lazyState: any): Promise<Document[]> => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 250));
  const response = await axiosClient.get(`mock/inspections-report-list.json`);

  const start = lazyState.first;
  const end = lazyState.first + lazyState.rows;
  const data = response.data.slice(start, end);

  return data;
};

export const useReportsList = (lazyState: any) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY_REPORT, lazyState],
    queryFn: () => getReportsListQuery(lazyState),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
