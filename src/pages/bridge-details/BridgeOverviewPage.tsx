import { useEffect, useState } from 'react';

import { IconLayoutDashboard } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { DetailContent } from '@/components/DetailContent';

export const BridgeOverviewPage = () => {
  const [documents] = useState([
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

  const actionsTemplate = (rowData: any) => {
    return (
      <div className="flex justify-center">
        <i className="pi pi-download text-xl" onClick={() => download(rowData)}></i>
      </div>
    );
  };

  const download = (data: any) => {
    console.log('download ' + data);
  };

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Rain',
          backgroundColor: documentStyle.getPropertyValue('--primary-color'),
          borderColor: documentStyle.getPropertyValue('--primary-color'),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [10, 10],
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <DetailContent title="Overview" titleIcon={<IconLayoutDashboard />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 adapt-card-heights pb-5">
        <div className="break-inside-avoid-column overflow-hidden">
          <Card subTitle="Total defects">
            <div className="text-2xl">34</div>
          </Card>
        </div>
        <div className="break-inside-avoid-column overflow-hidden">
          <Card subTitle="Component with defects">
            <div className="text-2xl">34</div>
          </Card>
        </div>
        <div className="break-inside-avoid-column overflow-hidden">
          <Card subTitle="Final Report">
            <Button className="w-full" label="Generate" disabled></Button>
          </Card>
        </div>
      </div>

      <div className="pb-4">Diseases summary</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 adapt-card-heights">
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Bending">
            <div className="text-2xl mb-5">78% max</div>
            <div className="text-sm">4 pillar</div>
            <div className="text-sm">3 Abutment</div>
          </Card>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Freeze Thaw">
            <div className="text-2xl mb-5">78% max</div>
            <div className="text-sm">4 pillar</div>
            <div className="text-sm">3 Abutment</div>
          </Card>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Delamination">
            <div className="text-2xl mb-5">78% max</div>
            <div className="text-sm">4 pillar</div>
            <div className="text-sm">3 Abutment</div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 adapt-card-heights">
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <div className="inline-block w-full">
            <Card className="inline-block w-full pb-3">
              <div className="flex justify-between items-center">
                <span>List of documents</span>
              </div>
              <DataTable
                className="max-h-[calc(100vh-358px)]"
                value={documents}
                scrollable
                scrollHeight="flex"
                emptyMessage="No documents found."
              >
                <Column field="name" header="Name"></Column>
                <Column field="type" header="Type"></Column>
                <Column body={actionsTemplate} header="Actions" className="w-[80px]"></Column>
              </DataTable>
            </Card>
          </div>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Inspection progress per year">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </Card>
        </div>
      </div>
    </DetailContent>
  );
};
