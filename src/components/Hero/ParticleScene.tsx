'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance, type PerformanceTier } from '@/hooks/useDevicePerformance';

type ParticleSceneProps = {
  onReady: () => void;
  onComplete: () => void;
  onFailure: () => void;
  onProgress: (time: number) => void;
  timing: {
    duration: number;
    convergeStart: number;
    convergeEnd: number;
    traceStart: number;
    traceEnd: number;
    cityStart: number;
    cityEnd: number;
  };
};

type ArchitectureData = {
  positions: Float32Array;
  sources: Float32Array;
  targets: Float32Array;
  city: Float32Array;
  colors: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  structure: Float32Array;
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uConvergeStart;
  uniform float uConvergeEnd;
  uniform float uTraceStart;
  uniform float uTraceEnd;
  uniform float uCityStart;
  uniform float uCityEnd;
  uniform float uMobile;

  attribute vec3 aSource;
  attribute vec3 aTarget;
  attribute vec3 aCity;
  attribute vec3 aColor;
  attribute float aSeed;
  attribute float aSize;
  attribute float aStructure;

  varying vec3 vColor;
  varying float vAlpha;

  float easeOut(float t) {
    return 1.0 - pow(1.0 - clamp(t, 0.0, 1.0), 3.0);
  }

  void main() {
    float height = clamp((aTarget.y + 3.04) / 6.34, 0.0, 1.0);
    float gather = easeOut(smoothstep(uConvergeStart + height * 0.12, uConvergeEnd, uTime));
    float release = smoothstep(uCityStart + height * 0.1, uCityEnd, uTime);
    float arc = sin(gather * 3.14159265);
    vec3 source = aSource;
    source.x += uTime * 0.008 * (1.0 + source.z * 0.1);

    vec3 architectural = mix(source, aTarget, gather);
    architectural.y -= arc * (0.1 + height * 0.08);
    architectural.z += arc * (0.18 + height * 0.18) * (1.0 - uMobile * 0.6);
    // Horizontal travel leads the descent, so the architecture opens into a city.
    vec3 transformed = mix(architectural, aCity, release);
    transformed.x = mix(architectural.x, aCity.x, easeOut(release));

    float traceProgress = clamp((uTime - uTraceStart) / (uTraceEnd - uTraceStart), 0.0, 1.0);
    float traceY = mix(-3.04, 3.3, traceProgress);
    float trace = aStructure * exp(-abs(aTarget.y - traceY) * 9.0)
      * exp(-abs(aTarget.x - 0.24) * 24.0)
      * step(uTraceStart, uTime)
      * (1.0 - smoothstep(uTraceEnd, uTraceEnd + 0.24, uTime));
    float pinnacle = aStructure * exp(-pow((uTime - uTraceEnd - 0.06) / 0.2, 2.0))
      * smoothstep(3.08, 3.28, aTarget.y);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = min(4.5, (aSize + trace * 0.85 + pinnacle * (1.0 - uMobile * 0.4))
      * uPixelRatio * (7.0 / max(1.0, -mvPosition.z)));

    vColor = mix(aColor, vec3(0.98, 0.95, 0.87), min(1.0, trace + pinnacle * 0.6));
    float formed = smoothstep(0.18, 0.86, gather);
    float starAlpha = smoothstep(0.84, 0.99, aSeed) * 0.22;
    vAlpha = mix(starAlpha, 0.46 + aSeed * 0.18, formed * aStructure);
    vAlpha += trace * 0.28 + pinnacle * 0.18;
    vAlpha *= smoothstep(0.0, 0.3, uTime);
    vAlpha *= mix(1.0, 0.24, smoothstep(0.0, 0.5, release));
    vAlpha *= 1.0 - smoothstep(0.62 + aSeed * 0.16, 1.0, release);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float softPoint = 1.0 - smoothstep(0.14, 0.5, distanceToCenter);
    gl_FragColor = vec4(vColor, vAlpha * softPoint);
  }
`;

function createRandom(seed = 2708) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

// Alternating wing setbacks; the final fifth is a slender mast, not a cone.
const SETBACKS = [0, 0.12, 0.23, 0.34, 0.44, 0.54, 0.63, 0.71, 0.78, 0.84, 0.9, 0.96];
const LEFT = [0.36, 0.36, 0.29, 0.29, 0.22, 0.22, 0.155, 0.155, 0.09, 0.052, 0.025, 0.006];
const RIGHT = [0.34, 0.28, 0.28, 0.215, 0.215, 0.15, 0.15, 0.09, 0.065, 0.035, 0.016, 0.006];

function makeArchitecture(count: number, mobile: boolean, width: number, height: number, crop: number): ArchitectureData {
  const random = createRandom();
  const positions = new Float32Array(count * 3);
  const sources = new Float32Array(count * 3);
  const targets = new Float32Array(count * 3);
  const city = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const structure = new Float32Array(count);
  const ivory = new THREE.Color('#f4f0e7');
  const brass = new THREE.Color('#c7b591');
  const shadowGold = new THREE.Color('#8f8570');
  const color = new THREE.Color();
  const towerCount = Math.floor(count * 0.86);
  const imageWidth = Math.max(width, height * 1376 / 768);
  const imageHeight = imageWidth * 768 / 1376;
  const spineCount = Math.floor(count * 0.045);
  // Photograph landmarks in UV space, matching HeroSection's responsive crop.
  const buildings = [[0.02, 0.1, 0.46], [0.12, 0.21, 0.49], [0.22, 0.25, 0.41], [0.28, 0.32, 0.42], [0.39, 0.42, 0.38], [0.55, 0.61, 0.54], [0.67, 0.7, 0.52], [0.76, 0.8, 0.36], [0.83, 0.9, 0.46], [0.94, 0.98, 0.45]];

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const seed = random();
    seeds[index] = seed;
    sizes[index] = (mobile ? 1.55 : 1.4) + random() * 0.65;

    const sourceDepth = -(index % 3) * (mobile ? 0.35 : 0.65) - random() * 0.15;
    sources[offset] = (random() - 0.5) * width * 1.1;
    sources[offset + 1] = (random() - 0.5) * height;
    sources[offset + 2] = sourceDepth;

    if (index < towerCount) {
      structure[index] = 1;
      const spine = index < spineCount;
      const rawHeight = spine ? index / (spineCount - 1) : index % 19 === 0 ? 0.84 + random() * 0.16 : random() * 0.84;
      const level = Math.round(rawHeight * 160) / 160;
      const h = spine || index % 5 === 0 ? rawHeight : level;
      let tier = SETBACKS.length - 1;
      while (h < SETBACKS[tier]) tier -= 1;
      const side = random() < 0.5 ? -1 : 1;
      const sideWidth = side < 0 ? LEFT[tier] : RIGHT[tier];
      const rib = index % 5 === 0;
      const x = spine ? 0 : rib ? side * sideWidth : side * (Math.floor(random() * 7) / 7) * sideWidth;

      targets[offset] = x * (mobile ? 1.16 : 1) + 0.24;
      targets[offset + 1] = -3.04 + h * 6.34;
      targets[offset + 2] = (random() - 0.5) * sideWidth * 0.3;
      // Correlated heights create a lateral architectural gathering, not a vortex.
      sources[offset + 1] = THREE.MathUtils.lerp(sources[offset + 1], targets[offset + 1], 0.68);
      if (spine) sizes[index] *= 0.76;
      if (h > 0.84) sizes[index] *= 0.8;
    } else {
      targets[offset] = sources[offset] * 0.78;
      targets[offset + 1] = sources[offset + 1] * 0.72;
      targets[offset + 2] = sources[offset + 2] - 0.3;
      sizes[index] *= 0.72;
    }

    let u: number;
    let v: number;
    if (index % 4 === 0 && index < towerCount) {
      u = 0.5 + (targets[offset] - 0.24) * 0.075;
      v = 0.65 - ((targets[offset + 1] + 3.04) / 6.34) * 0.63;
    } else if (index % 3 === 0) {
      u = random();
      v = 0.64 + random() * 0.12;
    } else {
      const building = buildings[Math.floor(random() * buildings.length)];
      u = building[0] + random() * (building[1] - building[0]);
      v = building[2] + random() * (0.64 - building[2]);
    }
    const depth = -random() * (mobile ? 0.2 : 0.55);
    const perspective = (8.4 - depth) / 8.4;
    city[offset] = ((u * imageWidth + (width - imageWidth) * crop - width / 2) * 1.03) * perspective;
    city[offset + 1] = ((0.5 - v) * imageHeight * 1.03) * perspective + 0.22;
    city[offset + 2] = depth;

    const colorChoice = random();
    color.copy(colorChoice > 0.45 ? ivory : colorChoice > 0.16 ? brass : shadowGold);
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;

    positions[offset] = sources[offset];
    positions[offset + 1] = sources[offset + 1];
    positions[offset + 2] = sources[offset + 2];
  }

  return { positions, sources, targets, city, colors, seeds, sizes, structure };
}

function ArchitecturalPoints({ count, onComplete, onReady, onProgress, onFailure, timing }: ParticleSceneProps & {
  count: number;
}) {
  const { viewport, size, gl } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const elapsedRef = useRef(0);
  const completeRef = useRef(false);
  const startedRef = useRef<number | null>(null);
  const mobile = size.width < 768;
  const crop = size.width < 768 ? 0.55 : size.width < 1024 ? 0.52 : 0.5;
  const data = useMemo(() => makeArchitecture(count, mobile, viewport.width, viewport.height, crop), [count, mobile, viewport.width, viewport.height, crop]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', onFailure, { once: true });
    return () => canvas.removeEventListener('webglcontextlost', onFailure);
  }, [gl, onFailure]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: gl.getPixelRatio() },
    uMobile: { value: mobile ? 1 : 0 },
    uConvergeStart: { value: timing.convergeStart },
    uConvergeEnd: { value: timing.convergeEnd },
    uTraceStart: { value: timing.traceStart },
    uTraceEnd: { value: timing.traceEnd },
    uCityStart: { value: timing.cityStart },
    uCityEnd: { value: timing.cityEnd },
  }), [gl, mobile, timing]);

  useFrame(() => {
    if (!materialRef.current || document.hidden) return;
    if (startedRef.current === null) {
      startedRef.current = performance.now();
      onReady();
    }
    elapsedRef.current = (performance.now() - startedRef.current) / 1000;
    materialRef.current.uniforms.uTime.value = elapsedRef.current;
    onProgress(elapsedRef.current);
    if (!completeRef.current && elapsedRef.current >= timing.duration) {
      completeRef.current = true;
      onComplete();
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSource" args={[data.sources, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[data.targets, 3]} />
        <bufferAttribute attach="attributes-aCity" args={[data.city, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aStructure" args={[data.structure, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function particleBudget(tier: PerformanceTier) {
  if (tier === 'high') return 6200;
  if (tier === 'medium') return 4000;
  return 2200;
}

export default function ParticleScene(props: ParticleSceneProps) {
  const tier = useDevicePerformance();
  const count = particleBudget(tier);

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.22, 8.4], fov: tier === 'low' ? 55 : 50 }}
      dpr={tier === 'low' ? 1 : [1, 1.5]}
      fallback={<div className="absolute inset-0" />}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: tier === 'low' ? 'default' : 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#07100f', 0);
        const canvas = gl.domElement;
        canvas.setAttribute('role', 'presentation');
        canvas.setAttribute('tabindex', '-1');
      }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <ArchitecturalPoints count={count} {...props} />
    </Canvas>
  );
}
