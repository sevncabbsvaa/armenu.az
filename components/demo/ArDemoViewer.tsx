"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import type { HTMLModelViewerElement } from "@/types/model-viewer";

const MODEL_VIEWER_SRC = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js";
const MESHOPT_DECODER_SRC = "https://cdn.jsdelivr.net/npm/meshoptimizer@0.22.0/meshopt_decoder.js";
const MAX_AR_CHECK_ATTEMPTS = 20;
const AR_CHECK_INTERVAL_MS = 300;

export default function ArDemoViewer() {
  const viewerRef = useRef<HTMLModelViewerElement>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);

  const handleModelViewerLoaded = () => {
    // The CDN build doesn't expose a global; grab the named export from the
    // module the <Script> tag already fetched (resolves from the module cache).
    import(/* webpackIgnore: true */ MODEL_VIEWER_SRC).then(({ ModelViewerElement }) => {
      ModelViewerElement.meshoptDecoderLocation = MESHOPT_DECODER_SRC;
      viewerRef.current?.setAttribute("src", "/models/dish.glb");
    });
  };

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const check = () => {
      if (cancelled) return;
      // canActivateAR is `undefined` until the custom element upgrades and
      // finishes its AR-capability probe; once it's a real boolean, it's settled.
      if (typeof el.canActivateAR === "boolean") {
        setArSupported(el.canActivateAR);
        return;
      }
      attempts += 1;
      if (attempts > MAX_AR_CHECK_ATTEMPTS) {
        setArSupported(false);
        return;
      }
      timer = setTimeout(check, AR_CHECK_INTERVAL_MS);
    };

    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const handleActivateAR = () => {
    viewerRef.current?.activateAR();
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center min-h-0">
      <Script
        src={MODEL_VIEWER_SRC}
        type="module"
        strategy="afterInteractive"
        onLoad={handleModelViewerLoaded}
      />

      <div className="relative w-full flex-1 min-h-0 rounded-3xl overflow-hidden bg-sand/40">
        <model-viewer
          ref={viewerRef}
          ios-src="/models/dish.usdz"
          alt="Sac içi — 3D dolma modeli"
          poster="/images/dish-poster.jpg"
          ar=""
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          camera-controls=""
          auto-rotate=""
          shadow-intensity="1"
          exposure="1"
          className="block w-full h-full"
        >
          <button slot="ar-button" style={{ display: "none" }} />
        </model-viewer>
      </div>

      <div className="flex flex-col items-center gap-3 mt-6 px-4 shrink-0">
        {arSupported === true && (
          <CtaButton onClick={handleActivateAR} className="text-[16px] px-8 py-4">
            Masanda gör (AR)
          </CtaButton>
        )}

        {arSupported === false && (
          <span className="inline-flex items-center gap-2 border border-saffron/50 text-clay font-heading text-[13px] font-medium px-4 py-2 rounded-full bg-porcelain/70">
            Telefonda aç — AR aktivləşsin
          </span>
        )}

        <p className="text-clay text-center text-[14px] leading-[1.6] max-w-[300px] m-0">
          Yeməyi 360° fırlat və ya AR ilə öz masanda gör.
        </p>
      </div>
    </div>
  );
}
