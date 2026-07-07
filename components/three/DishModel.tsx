"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DishArPreview from "@/components/illustrations/DishArPreview";

gsap.registerPlugin(ScrollTrigger);

useGLTF.preload("/models/dish.glb");

const IDLE_TURN_SECONDS = 12;
const TARGET_WIDTH_FRACTION = 0.5;
const GROUND_Y = -0.35;

function CameraAim({ target }: { target: [number, number, number] }) {
  const camera = useThree((state) => state.camera);
  useLayoutEffect(() => {
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  }, [camera, target]);
  return null;
}

function RotatingDish({ scrollProgressRef }: { scrollProgressRef: MutableRefObject<number> }) {
  const { scene } = useGLTF("/models/dish.glb");
  const viewportWidth = useThree((state) => state.viewport.width);
  const spinRef = useRef<THREE.Group>(null);
  const idleRef = useRef(0);

  const { model, footprint } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    clone.position.set(-center.x, -box.min.y, -center.z);
    return { model: clone, footprint: Math.max(size.x, size.z) || 1 };
  }, [scene]);

  const scale = (viewportWidth * TARGET_WIDTH_FRACTION) / footprint;

  useFrame((_, delta) => {
    idleRef.current += (delta * Math.PI * 2) / IDLE_TURN_SECONDS;
    if (spinRef.current) {
      spinRef.current.rotation.y = idleRef.current + scrollProgressRef.current * Math.PI * 2;
    }
  });

  return (
    <group position={[0, GROUND_Y, 0]} scale={scale}>
      <group ref={spinRef}>
        <primitive object={model} />
      </group>
    </group>
  );
}

type DishModelProps = {
  scrollProgressRef: MutableRefObject<number>;
  className?: string;
};

export default function DishModel({ scrollProgressRef, className = "" }: DishModelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<"always" | "demand">("demand");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => setFrameloop("always"),
      onEnterBack: () => setFrameloop("always"),
      onLeave: () => setFrameloop("demand"),
      onLeaveBack: () => setFrameloop("demand"),
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1.3, 2.4], fov: 40 }}
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <CameraAim target={[0, 0, 0]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#FFD9A0" />
        <Suspense
          fallback={
            <Html fullscreen>
              <DishArPreview className="absolute left-1/2 top-[64%] w-[54%] -translate-x-1/2 -translate-y-1/2" />
            </Html>
          }
        >
          <Environment preset="apartment" environmentIntensity={0.3} />
          <RotatingDish scrollProgressRef={scrollProgressRef} />
          <ContactShadows
            position={[0, GROUND_Y, 0]}
            opacity={0.5}
            scale={4}
            blur={2.2}
            far={2.5}
            color="#4A2A12"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
