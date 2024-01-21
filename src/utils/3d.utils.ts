import {
  Animation,
  CubicEase,
  EasingFunction,
  ArcRotateCamera,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  Color3,
  HighlightLayer,
  AbstractMesh,
  ActionEvent,
} from '@babylonjs/core';

export const degreesToRadians = (deg: number) => (deg * Math.PI) / 180.0;

export const cameraMoveToTarget = (camera: ArcRotateCamera, newPos: any, speed: number) => {
  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  Animation.CreateAndStartAnimation(
    'at5',
    camera,
    'target',
    speed,
    120,
    camera.target,
    newPos,
    0,
    ease,
  );
  // Animation.CreateAndStartAnimation('at5', camera, 'radius', speed, 240, camera.radius, 3, 0, ease);
};

export const cameraAnimateRadius = (
  camera: ArcRotateCamera | undefined,
  radiusValue: any,
  speed: number,
) => {
  if (!camera) {
    return;
  }
  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  Animation.CreateAndStartAnimation(
    'at5',
    camera,
    'radius',
    speed,
    240,
    camera.radius,
    radiusValue,
    0,
    ease,
  );
};

export const cameraSpinTo = (
  camera: ArcRotateCamera,
  prop: keyof ArcRotateCamera,
  targetval: any,
  speed = 50,
) => {
  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  Animation.CreateAndStartAnimation(
    'at4',
    camera,
    prop,
    speed,
    120,
    camera[prop],
    targetval,
    0,
    ease,
  );
};

export const addEventListenerToMesh = (
  mesh: Mesh | AbstractMesh,
  action: ActionManager | number,
  callback: (event: ActionEvent) => void,
) => {
  if (!mesh.actionManager) {
    mesh.actionManager = new ActionManager(mesh.getScene());
  }

  mesh.actionManager.registerAction(new ExecuteCodeAction(action, callback));
};

export const addHighlightToMesh = (
  mesh: Mesh | AbstractMesh,
  layer: HighlightLayer,
  highlightColor = Color3.FromHexString('#156082'),
) => {
  if (!mesh.actionManager) {
    mesh.actionManager = new ActionManager(mesh.getScene());
  }

  mesh.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
      layer.addMesh(ev.source, highlightColor);
    }),
  );
  mesh.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (ev) => {
      layer.removeMesh(ev.source);
    }),
  );
};
