import { Defect } from './defect.model';
import { StructureElement } from './structure-element.model.ts';

export interface Bridge {
  id: number;
  name: string;
  meshUrl: string;
  ifcMeshUrl: string;
  description: string;
  country: string;
  droneOperator: string;
  lastInspectionDate: string;
  lat: number;
  lng: number;
  elements: StructureElement[];
}

export interface BridgeWithDefects extends Bridge {
  defects: Defect[];
}

export interface BridgeElement {
  id: number;
  name: string;
  meshUrl: string;
  defects: Defect[];
}
