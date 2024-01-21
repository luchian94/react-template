/* eslint-disable react/no-unknown-property */
import { FC, Suspense, useContext } from 'react';
import {
  ILoadedModel,
  Model,
  SceneLoaderContext,
  SceneLoaderContextProvider,
} from 'react-babylonjs';

import { Color3, Matrix, Vector3 } from '@babylonjs/core/Maths/math';

export type ProgressFallbackProps = {
  rotation?: Vector3;
  center: Vector3;
  scaleTo: number;
  progressBarColor: Color3;
};

const ProgressFallback: FC<ProgressFallbackProps> = (props) => {
  const sceneLoaderContext = useContext(SceneLoaderContext);

  let loadProgress = 0;
  if (sceneLoaderContext && sceneLoaderContext.lastProgress) {
    const progress = sceneLoaderContext.lastProgress;
    loadProgress = progress.lengthComputable
      ? progress.loaded / progress.total
      : progress.loaded / 10000; // TODO: provide option to input file size for proper loading.
  }

  return (
    <transformNode name="load-mesh" rotation={props.rotation} position={props.center}>
      <box
        key="progress"
        name="boxProgress"
        height={props.scaleTo / 15}
        width={props.scaleTo}
        depth={props.scaleTo / 30}
        scaling={new Vector3(loadProgress, 1, 1)}
        position={new Vector3(props.scaleTo / 2, 0, props.scaleTo / 60)}
        setPivotMatrix={[Matrix.Translation(-props.scaleTo, 0, 0)]}
        setPreTransformMatrix={[Matrix.Translation(-props.scaleTo / 2, 0, 0)]}
      >
        <standardMaterial
          name="progress-mat"
          diffuseColor={props.progressBarColor}
          specularColor={Color3.Black()}
        />
      </box>
      <box
        key="back"
        name="boxBack"
        height={props.scaleTo / 15}
        width={props.scaleTo}
        depth={props.scaleTo / 30}
        position={new Vector3(0, 0, props.scaleTo / -60)}
      />
    </transformNode>
  );
};

export type ScaledModelWithProgressType = {
  rootUrl: string;
  sceneFilename: string;
  modelName: string;
  progressBarColor: Color3;
  progressScale?: number;
  progressRotation?: Vector3;
  center?: Vector3;
  onModelLoaded?: (model: ILoadedModel) => void;
};

export const ModelWithProgress: FC<ScaledModelWithProgressType> = (props) => {
  return (
    <SceneLoaderContextProvider>
      <Suspense
        fallback={
          <ProgressFallback
            progressBarColor={props.progressBarColor}
            rotation={props.progressRotation ?? new Vector3(0, 0, 0)}
            center={props.center ?? new Vector3(0, 0, 0)}
            scaleTo={props.progressScale ?? 1}
          />
        }
      >
        <Model
          reportProgress
          name={props.modelName}
          rootUrl={props.rootUrl}
          sceneFilename={props.sceneFilename}
          onModelLoaded={props.onModelLoaded}
        />
      </Suspense>
    </SceneLoaderContextProvider>
  );
};
