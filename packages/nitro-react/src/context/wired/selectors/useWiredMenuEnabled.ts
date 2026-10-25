import { useConfigBoolean } from '#base/context/system';

/** `WiredMenuController.isEnabled` - the `wired.menu.enabled` config flag; Flash's `getBoolean` is `false` when the key is missing. */
export const useWiredMenuEnabled = () => useConfigBoolean('wired.menu.enabled');
