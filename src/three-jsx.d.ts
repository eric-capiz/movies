import { ThreeElements } from "@react-three/fiber";

/* @react-three/fiber v8 augments the global JSX namespace, which no longer
   exists under @types/react v19. Bridge it to React.JSX instead. */
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

export {};
