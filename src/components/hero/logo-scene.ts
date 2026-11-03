import type { BufferAttribute } from 'three';
import {
  CanvasTexture,
  Color,
  ExtrudeGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Shape,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LOGO_CORNERS, logoSegments } from '~/lib/logo-shape';

/**
 * The hero scene: the folded N, extruded, standing in front of a wall. A key
 * light falls through window blinds, so soft ribs of light cross the logo and
 * the wall. The ribs slide as the page scrolls; the logo tilts toward the
 * pointer.
 */

const UNIT = 1 / 50; // logo box (100) → about two world units
const DEPTH = 0.36;
const WALL_Z = -1.15;

const BLINDS_GLSL = /* glsl */ `
  uniform vec3 uLight;
  uniform vec2 uStripeDir;
  uniform float uFreq;
  uniform float uPhase;
  uniform float uSoft;
  // Project the point back along the light onto the blinds, so ribs on the
  // logo and on the wall line up the way real light would.
  float blinds(vec3 p) {
    vec3 L = normalize(uLight);
    vec2 q = p.xy - L.xy * (p.z / L.z);
    float s = 0.5 + 0.5 * sin(dot(q, uStripeDir) * uFreq + uPhase);
    return smoothstep(0.5 - uSoft, 0.5 + uSoft, s);
  }
`;

const VERTEX = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const LOGO_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  ${BLINDS_GLSL}
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uLight);
    float rib = blinds(vWorldPos);
    float spot = smoothstep(2.6, 0.0, length(vWorldPos.xy - vec2(-0.35, 0.45)));
    float diffuse = max(dot(N, L), 0.0);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 70.0);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.4);

    vec3 shade = uColor * 0.055;
    shade += uColor * diffuse * mix(0.3, 1.06, rib) * mix(0.5, 1.0, spot);
    shade += vec3(1.0, 1.0, 0.94) * spec * (0.12 + 0.75 * rib);
    shade += mix(uColor, vec3(1.0), 0.35) * fresnel * 0.16;
    gl_FragColor = vec4(shade, 1.0);
    #include <colorspace_fragment>
  }
`;

const WALL_FRAGMENT = /* glsl */ `
  uniform vec3 uTint;
  varying vec3 vWorldPos;
  ${BLINDS_GLSL}
  void main() {
    float rib = blinds(vWorldPos);
    vec2 d = (vWorldPos.xy - vec2(-0.35, 0.3)) * vec2(0.9, 1.0);
    float spot = smoothstep(2.35, 0.1, length(d));
    spot *= spot;
    float a = spot * (0.035 + 0.19 * rib);
    gl_FragColor = vec4(uTint, a);
    #include <colorspace_fragment>
  }
`;

function logoShape(): Shape {
  const shape = new Shape();
  const map = (x: number, y: number) => new Vector2((x - 50) * UNIT, -(y - 50) * UNIT);
  for (const s of logoSegments(LOGO_CORNERS)) {
    if (s.kind === 'move') {
      const p = map(s.x, s.y);
      shape.moveTo(p.x, p.y);
    } else if (s.kind === 'line') {
      const p = map(s.x, s.y);
      shape.lineTo(p.x, p.y);
    } else {
      const c = map(s.cx, s.cy);
      const p = map(s.x, s.y);
      shape.quadraticCurveTo(c.x, c.y, p.x, p.y);
    }
  }
  return shape;
}

function logoGeometry() {
  const raw = new ExtrudeGeometry(logoShape(), {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.075,
    bevelSize: 0.055,
    bevelSegments: 10,
    curveSegments: 30
  });
  raw.translate(0, 0, -DEPTH / 2);
  const geometry = toCreasedNormals(raw, Math.PI / 5);
  raw.dispose();
  // Keep the big front and back faces perfectly flat; only bevels round off.
  const pos = geometry.getAttribute('position') as BufferAttribute;
  const nor = geometry.getAttribute('normal') as BufferAttribute;
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);
    const face = b.clone().sub(a).cross(c.clone().sub(a)).normalize();
    if (Math.abs(face.z) > 0.9995) {
      for (let k = 0; k < 3; k++) nor.setXYZ(i + k, 0, 0, Math.sign(face.z));
    }
  }
  nor.needsUpdate = true;
  return geometry;
}

function shadowTexture(): CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.filter = 'blur(26px)';
    ctx.fillStyle = '#000';
    ctx.translate(size * 0.15, size * 0.15);
    ctx.scale((size * 0.7) / 100, (size * 0.7) / 100);
    ctx.beginPath();
    for (const s of logoSegments(LOGO_CORNERS)) {
      if (s.kind === 'move') ctx.moveTo(s.x, s.y);
      else if (s.kind === 'line') ctx.lineTo(s.x, s.y);
      else ctx.quadraticCurveTo(s.cx, s.cy, s.x, s.y);
    }
    ctx.closePath();
    ctx.fill();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export type LogoSceneInput = {
  /** Pointer position, -1…1 from the center of the viewport. */
  pointer: { x: number; y: number };
  /** 0 at the top of the page, 1 once the hero has scrolled away. */
  scroll: number;
};

export type LogoScene = {
  resize: (width: number, height: number) => void;
  /** Eases toward the input and draws one frame. */
  frame: (input: LogoSceneInput, time: number) => void;
  dispose: () => void;
};

export function createLogoScene(
  canvas: HTMLCanvasElement,
  options: { signal: string; still?: boolean }
): LogoScene {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0, 7);

  const shared = {
    uLight: { value: new Vector3(-0.5, 0.62, 0.62).normalize() },
    uStripeDir: { value: new Vector2(0.28, 1).normalize() },
    uFreq: { value: 21 },
    uPhase: { value: 0 },
    uSoft: { value: 0.46 }
  };

  const logoMaterial = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: LOGO_FRAGMENT,
    uniforms: { ...shared, uColor: { value: new Color(options.signal) } }
  });
  const logo = new Mesh(logoGeometry(), logoMaterial);
  scene.add(logo);

  const wallMaterial = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: WALL_FRAGMENT,
    transparent: true,
    depthWrite: false,
    uniforms: {
      ...shared,
      uTint: { value: new Color(options.signal).lerp(new Color('#ffffff'), 0.55) }
    }
  });
  const wall = new Mesh(new PlaneGeometry(16, 12), wallMaterial);
  wall.position.z = WALL_Z;
  scene.add(wall);

  const shadowMap = shadowTexture();
  const shadow = new Mesh(
    new PlaneGeometry(2.86, 2.86),
    new MeshBasicMaterial({ map: shadowMap, transparent: true, opacity: 0.72, depthWrite: false })
  );
  shadow.position.z = WALL_Z + 0.01;
  scene.add(shadow);

  const state = { rx: 0, ry: 0, phase: 0 };
  const resize = (width: number, height: number) => {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the logo to the shorter side so it keeps one size in any frame.
    const fit = 2.55;
    const vertical = height <= width ? fit : fit / camera.aspect;
    camera.position.z = vertical / 2 / Math.tan((camera.fov * Math.PI) / 360);
    camera.updateProjectionMatrix();
  };

  const frame = (input: LogoSceneInput, time: number) => {
    const still = options.still;
    const idle = still ? 0 : Math.sin(time * 0.00035) * 0.05;
    const tx = still ? 0 : -input.pointer.y * 0.3 + input.scroll * 0.35;
    const ty = still ? 0 : input.pointer.x * 0.45 + idle;
    const ease = still ? 1 : 0.06;
    state.rx += (tx - state.rx) * ease;
    state.ry += (ty - state.ry) * ease;
    const targetPhase = input.scroll * 7.5;
    state.phase += (targetPhase - state.phase) * (still ? 1 : 0.1);

    logo.rotation.set(state.rx - 0.08, state.ry + 0.22, -0.04);
    shared.uPhase.value = state.phase + 1.2;
    // The light swings a little as you scroll, so highlights travel over the bevels.
    shared.uLight.value
      .set(-0.5 + input.scroll * 0.55, 0.62 - input.scroll * 0.2, 0.62)
      .normalize();

    const L = shared.uLight.value;
    const reach = (0 - WALL_Z) / L.z;
    shadow.position.x = -L.x * reach * 0.85 + state.ry * 0.25;
    shadow.position.y = -L.y * reach * 0.85 - state.rx * 0.25;
    shadow.scale.set(1 + Math.abs(state.ry) * 0.15, 1 + Math.abs(state.rx) * 0.12, 1);

    renderer.render(scene, camera);
  };

  const dispose = () => {
    logo.geometry.dispose();
    logoMaterial.dispose();
    wall.geometry.dispose();
    wallMaterial.dispose();
    shadow.geometry.dispose();
    (shadow.material as MeshBasicMaterial).dispose();
    shadowMap.dispose();
    renderer.dispose();
  };

  return { resize, frame, dispose };
}
