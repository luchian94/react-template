import { FC, Suspense } from 'react';
import { ILoadedModel, Model } from 'react-babylonjs';

import { ActionManager, Color3, Color4, HighlightLayer, StandardMaterial } from '@babylonjs/core';

import { addEventListenerToMesh, addHighlightToMesh } from '@/utils/3d.utils.ts';

import { Defect, DefectsObj, DefectWithModel } from '../models/defect.model';

type ModelDefectsProps = {
  defects: Defect[];
  highlightDefects?: boolean;
  onDefectsLoaded?: (defects: DefectsObj) => void;
  onDefectClick?: (defect: DefectWithModel) => void;
};

export const ModelDefects: FC<ModelDefectsProps> = (props) => {
  let loadedDefectsCount = 0;
  const defectsObj: DefectsObj = {};

  const onDefectLoaded = (defect: Defect, defectModel: ILoadedModel) => {
    if (defectModel.meshes && defectModel.meshes.length > 0) {
      loadedDefectsCount++;
      const defectWithModel = {
        ...defect,
        model: defectModel,
        visible: false,
      };
      defectsObj[defect.id] = defectWithModel;

      const mainMesh = defectModel.meshes[0];

      const scene = mainMesh.getScene();
      const mat = new StandardMaterial('mat-def', scene);
      mat.specularColor = mat.diffuseColor = mat.emissiveColor = Color3.FromArray(defect.color);
      mat.alpha = 0.5;

      mainMesh.material = mat;
      mainMesh.edgesWidth = 2;
      mainMesh.edgesColor = new Color4(0, 0, 1, 1); // Gray edge color

      if (props.highlightDefects) {
        const highlightLayer = new HighlightLayer('defectHL', scene);
        addHighlightToMesh(mainMesh, highlightLayer, Color3.Black());
      }

      if (props.onDefectClick) {
        addEventListenerToMesh(mainMesh, ActionManager.OnPickTrigger, () => {
          props.onDefectClick!(defectWithModel);
        });
      }
    }

    if (loadedDefectsCount === props.defects.length && props.onDefectsLoaded) {
      props.onDefectsLoaded(defectsObj);
    }
  };

  return (
    <Suspense>
      {props.defects.map((defect) => {
        return (
          <Model
            key={defect.id}
            name={defect.name}
            rootUrl="/3d-models/moliano/"
            setEnabled={false}
            sceneFilename={defect.meshUrl}
            onModelLoaded={(model) => onDefectLoaded(defect, model)}
          />
        );
      })}
    </Suspense>
  );
};
