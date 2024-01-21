import { ILoadedModel } from 'react-babylonjs';

export interface Defect {
  id: string;
  name: string;
  meshUrl: string;
  color: number[];
}

export interface DefectWithModel extends Defect {
  visible: boolean;
  model?: ILoadedModel;
}

export type DefectsObj = Record<string, DefectWithModel>;
