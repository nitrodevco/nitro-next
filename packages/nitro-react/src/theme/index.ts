/**
 * The client's theme: `@nitrodevco/nitro-theme` - the window skins, buttons, text and the rest, shared
 * with Nitro Studio - wired into the client (`themeHost`: its asset bundles, config and window
 * manager), with what only the client has: the room stage under the UI (`PixiApplicationRoot`) and
 * the window manager's widgets that read its translations, ticker or templates (countdown, updating
 * timestamp, running number, progress indicator).
 */
import './themeHost';

export * from './CountdownWidget';
export * from './ProgressIndicatorWidget';
export * from './RunningNumberWidget';
export * from './TemplateWindow';
export * from './UpdatingTimeStampWidget';
export * from './useTemplate';
export * from './useTemplateFrame';
export * from '@nitrodevco/nitro-theme';
// Over the theme's own: the client's puts its room stage under the UI.
export { PixiApplicationRoot } from './PixiApplicationRoot';
