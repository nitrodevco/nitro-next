import { useSystemContext } from "../useSystemContext";

export const useIsWindowVisible = (name: string) => {
    const visibleWindows = useSystemContext(x => x.visibleWindows);

    return visibleWindows.indexOf(name) >= 0;
}