import { useEffect, useState } from 'react';

import { IconUmbrella } from '@tabler/icons-react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

import { DetailContent } from '@/components/DetailContent';

export const BridgeEnvironmentalDataPage = () => {
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

  const [chartLineData, setChartLineData] = useState({});
  const [chartLineOptions, setChartLineOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--primary-color'),
          borderColor: documentStyle.getPropertyValue('--primary-color'),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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
        },
      },
    };

    setChartLineData(data);
    setChartLineOptions(options);
  }, []);

  return (
    <DetailContent title="Environmental data" titleIcon={<IconUmbrella />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 adapt-card-heights">
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Rainy days">
            <div className="text-2xl">34</div>
          </Card>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Min. / Max. temperature">
            <div className="text-2xl">-5° C / 39° C</div>
          </Card>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Max. wind speed">
            <div className="text-2xl">34 km/h</div>
          </Card>
        </div>
      </div>
      <div className="pb-5">
        <Card subTitle="River level">
          <Chart type="line" data={chartLineData} options={chartLineOptions} />
        </Card>
      </div>
      <div className="columns-1 lg:columns-2 gap-x-8">
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="Temperature per month">
            <Chart type="line" data={chartLineData} options={chartLineOptions} />
          </Card>
        </div>
        <div className="pb-5 break-inside-avoid-column overflow-hidden">
          <Card subTitle="mm rain per month">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </Card>
        </div>
      </div>
    </DetailContent>
  );
};
