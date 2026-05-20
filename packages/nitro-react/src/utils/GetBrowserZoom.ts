import { IsRetinaDisplay } from "./IsRetinaDisplay";

export const GetBrowserZoom = () => window.devicePixelRatio / (IsRetinaDisplay() ? 2 : 1);