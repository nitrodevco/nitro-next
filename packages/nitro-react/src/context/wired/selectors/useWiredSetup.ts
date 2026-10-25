import { useWiredStore } from '../useWiredStore';

/** The wired box being edited, `undefined` while the setup dialog is closed. */
export const useWiredSetup = () => useWiredStore(x => x.setup);
