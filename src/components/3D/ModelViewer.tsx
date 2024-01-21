/* eslint-disable react/no-unknown-property */
import { FC, ReactNode, useRef } from 'react';
import { Engine, ILoadedModel, Scene } from 'react-babylonjs';
import { SceneEventArgs } from 'react-babylonjs/dist/Scene';

import {
  AbstractMesh,
  ActionManager,
  ArcRotateCamera,
  BoundingInfo,
  Color3,
  Color4,
  HighlightLayer,
  Mesh,
  Scene as BabylonScene,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/OBJ';
import '@babylonjs/loaders/glTF';
import { IconRestore } from '@tabler/icons-react';
import { Button } from 'primereact/button';

import { ModelWithProgress } from '@/components/3D/ModelWithProgress.tsx';
import {
  addEventListenerToMesh,
  addHighlightToMesh,
  cameraAnimateRadius,
  cameraMoveToTarget,
  cameraSpinTo,
  degreesToRadians,
} from '@/utils/3d.utils.ts';

const DEFAULT_RADIUS = 10;
const DEFAULT_ALPHA = 85;
const DEFAULT_BETA = 70;

type ModelViewerProps = {
  rootUrl: string;
  fileName: string;
  modelName: string;
  canvasId: string;
  highlightMeshes?: boolean;
  topOverlay?: ReactNode;
  bottomOverlay?: ReactNode;
  sceneChildren?: ReactNode;
  initialRadius?: number;
  initialAlpha?: number;
  initialBeta?: number;
  onSceneMount?: (scene: BabylonScene) => void;
  onModelLoaded?: (model: ILoadedModel) => void;
  onMeshClick?: (mesh: Mesh) => void;
};

export const ModelViewer: FC<ModelViewerProps> = (props) => {
  const scene = useRef<BabylonScene>();
  const highlightLayer = useRef<HighlightLayer>(null);

  const model = useRef<ILoadedModel>();
  const modelMeshes = useRef<AbstractMesh[]>([]);

  const onSceneMount = (e: SceneEventArgs) => {
    scene.current = e.scene;
    if (props.onSceneMount) {
      props.onSceneMount(e.scene);
    }
  };

  const getActiveCamera = () => {
    return scene.current?.activeCamera as ArcRotateCamera | undefined;
  };

  const moveCameraToMesh = (boundingInfo: BoundingInfo | undefined | null) => {
    const activeCamera = getActiveCamera();
    if (activeCamera && boundingInfo) {
      cameraMoveToTarget(activeCamera, boundingInfo.boundingBox.center, 100);
    }
  };

  const onModelLoaded = (bridgeModel: ILoadedModel) => {
    model.current = bridgeModel;
    modelMeshes.current = bridgeModel.meshes || [];

    moveCameraToMesh(bridgeModel.boundingInfo);

    if (props.onModelLoaded) {
      props.onModelLoaded(bridgeModel);
    }

    if (props.onMeshClick || props.highlightMeshes) {
      modelMeshes.current.forEach((mesh) => {
        if (highlightLayer.current && props.highlightMeshes) {
          addHighlightToMesh(mesh, highlightLayer.current);
        }
        if (props.onMeshClick) {
          addEventListenerToMesh(mesh, ActionManager.OnPickTrigger, (ev) => {
            const sourceMesh = ev.source as Mesh;
            props.onMeshClick!(sourceMesh);
          });
        }
      });
    }
  };

  const resetCamera = () => {
    const activeCamera = getActiveCamera();
    if (activeCamera) {
      cameraSpinTo(
        activeCamera,
        'alpha',
        degreesToRadians(props.initialAlpha || DEFAULT_ALPHA),
        100,
      );
      cameraSpinTo(activeCamera, 'beta', degreesToRadians(props.initialBeta || DEFAULT_BETA), 100);
      cameraAnimateRadius(activeCamera, props.initialRadius ?? DEFAULT_RADIUS, 400);
      moveCameraToMesh(model.current?.boundingInfo);
    }
  };

  return (
    <div className="relative h-full">
      <div className="w-full absolute top-4 left-0 px-4 z-10">{props.topOverlay}</div>
      <div className="w-full flex items-center flex-wrap gap-2 absolute bottom-4 left-0 px-4 z-10">
        {props.bottomOverlay}

        <Button className="sm:ml-auto" severity="secondary" onClick={resetCamera}>
          <IconRestore />
        </Button>
      </div>

      <Engine antialias adaptToDeviceRatio canvasId={props.canvasId}>
        <Scene
          useRightHandedSystem={true}
          ambientColor={new Color3(1, 3, 1)}
          clearColor={new Color4(0.9, 0.9, 0.9)}
          onSceneMount={onSceneMount}
        >
          <arcRotateCamera
            name="arcRotateCamera"
            radius={props.initialRadius ?? DEFAULT_RADIUS}
            alpha={degreesToRadians(props.initialAlpha ?? DEFAULT_ALPHA)}
            beta={degreesToRadians(props.initialBeta ?? DEFAULT_BETA)}
            minZ={0.01}
            wheelPrecision={50}
            useFramingBehavior={true}
            target={Vector3.Zero()}
          />
          <hemisphericLight name="mainLight" intensity={0.7} direction={new Vector3(0, 1, 0)} />
          <highlightLayer name="hl" ref={highlightLayer} />

          <ModelWithProgress
            rootUrl={props.rootUrl}
            modelName={props.modelName}
            sceneFilename={props.fileName}
            progressScale={4}
            progressBarColor={Color3.FromHexString('#156082')}
            onModelLoaded={onModelLoaded}
          />

          {props.sceneChildren}
        </Scene>
      </Engine>
    </div>
  );
};
