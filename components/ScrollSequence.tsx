"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export const FRAME_COUNT = 81;
const FRAME_WIDTH = 720;
const FRAME_HEIGHT = 893;

const framePath = (index: number) => `/frames/cheesecake/f_${String(index + 1).padStart(3, "0")}.webp`;

export type ScrollSequenceHandle = {
  setFrame: (index: number) => void;
};

type ScrollSequenceProps = {
  className?: string;
};

const ScrollSequence = forwardRef<ScrollSequenceHandle, ScrollSequenceProps>(function ScrollSequence(
  { className },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const scale = Math.min(cssW / FRAME_WIDTH, cssH / FRAME_HEIGHT);
    const drawW = FRAME_WIDTH * scale;
    const drawH = FRAME_HEIGHT * scale;
    ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setFrame: (index: number) => {
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        currentFrameRef.current = clamped;
        draw(clamped);
      },
    }),
    [draw]
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialIndex = prefersReduced ? FRAME_COUNT - 1 : 0;
    currentFrameRef.current = initialIndex;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loadFrame = (index: number) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (currentFrameRef.current === index) draw(index);
      };
      img.src = framePath(index);
      images[index] = img;
    };

    loadFrame(initialIndex);
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (i !== initialIndex) loadFrame(i);
    }
    imagesRef.current = images;

    const onResize = () => draw(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%", display: "block" }} />;
});

export default ScrollSequence;
