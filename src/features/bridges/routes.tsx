import { Navigate } from 'react-router-dom';

import { BreadcrumbItemTemplate } from '@/components/misc/BreadcrumbItemTemplate';
import { RouteHandleData } from '@/models/misc.ts';
import { lazyImport } from '@/utils/lazy-import.ts';

import { BridgeDataGuard } from './guards/BridgeDataGuard';

const { BridgeGeneralDataPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeGeneralDataPage'),
  'BridgeGeneralDataPage',
);
const { BridgeMasterDataPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeMasterDataPage'),
  'BridgeMasterDataPage',
);
const { BridgeVisualizationPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeVisualizationPage'),
  'BridgeVisualizationPage',
);
const { BridgeEnvironmentalDataPage } = lazyImport(
  () => import('pages/bridge-details/BridgeEnvironmentalDataPage'),
  'BridgeEnvironmentalDataPage',
);
const { BridgeTechnicalDrawingsPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeTechnicalDrawingsPage'),
  'BridgeTechnicalDrawingsPage',
);
const { BridgeInspectionsReportsPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeInspectionsReportsPage'),
  'BridgeInspectionsReportsPage',
);
const { BridgeDefectSummaryPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeDefectSummaryPage'),
  'BridgeDefectSummaryPage',
);

export const bridgeRoutes = [
  {
    path: 'general-data',
    element: (
      <BridgeDataGuard>
        <BridgeGeneralDataPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [{ label: 'General Data', active: true, template: BreadcrumbItemTemplate }],
    } as RouteHandleData,
  },
  {
    path: 'master-data',
    element: (
      <BridgeDataGuard>
        <BridgeMasterDataPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [{ label: 'Master Data', active: true, template: BreadcrumbItemTemplate }],
    } as RouteHandleData,
  },
  {
    path: 'environmental-data',
    element: (
      <BridgeDataGuard>
        <BridgeEnvironmentalDataPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [
        { label: 'Environmental Data', active: true, template: BreadcrumbItemTemplate },
      ],
    } as RouteHandleData,
  },
  {
    path: 'technical-drawings',
    element: (
      <BridgeDataGuard>
        <BridgeTechnicalDrawingsPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [
        { label: 'Technical Drawings', active: true, template: BreadcrumbItemTemplate },
      ],
    } as RouteHandleData,
  },
  {
    path: 'inspections-reports',
    element: (
      <BridgeDataGuard>
        <BridgeInspectionsReportsPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [
        { label: 'Inspection Reports', active: true, template: BreadcrumbItemTemplate },
      ],
    } as RouteHandleData,
  },
  {
    path: 'visualization',
    element: (
      <BridgeDataGuard>
        <BridgeVisualizationPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [{ label: '3D Model', active: true, template: BreadcrumbItemTemplate }],
    } as RouteHandleData,
  },
  {
    path: 'defect-summary',
    element: (
      <BridgeDataGuard>
        <BridgeDefectSummaryPage />
      </BridgeDataGuard>
    ),
    handle: {
      breadcrumbs: [{ label: 'Defect Summary', active: true, template: BreadcrumbItemTemplate }],
    } as RouteHandleData,
  },
  {
    path: '',
    element: <Navigate to="general-data" />,
  },
];
