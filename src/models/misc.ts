import type { MenuItem } from 'primereact/menuitem';

export type KeyValueObj = Record<string, any>;

export interface BreadCrumbItem extends MenuItem {
  active?: boolean;
}

export interface RouteHandleData {
  breadcrumbs: BreadCrumbItem[];
}
