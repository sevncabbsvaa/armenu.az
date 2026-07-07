export interface HTMLModelViewerElement extends HTMLElement {
  activateAR(): Promise<void>;
  canActivateAR: boolean;
}

type ModelViewerJSX = React.DetailedHTMLProps<React.HTMLAttributes<HTMLModelViewerElement>, HTMLModelViewerElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  ar?: string;
  "ar-modes"?: string;
  "ar-scale"?: string;
  "ios-src"?: string;
  "camera-controls"?: string;
  "auto-rotate"?: string;
  "shadow-intensity"?: string;
  exposure?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "model-viewer": HTMLModelViewerElement;
  }
}
