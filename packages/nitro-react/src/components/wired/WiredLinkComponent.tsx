/**
 * Mounts the WIRED Link windows - Flash `WiredLinkController`'s `WiredLinkView` and the
 * `WiredLinkConnectionsView` it opens over it. Each shows while the store says it is up.
 */
import { useWiredStore } from '#base/context/wired';
import { WiredLinkConnectionsView } from '#base/views/wired-link/WiredLinkConnectionsView';
import { WiredLinkView } from '#base/views/wired-link/WiredLinkView';

export const WiredLinkComponent = () => {
    const visible = useWiredStore(x => x.linkVisible && (x.linkFurniId !== 0));
    const connections = useWiredStore(x => x.linkConnections);

    return (
        <>
            {visible && <WiredLinkView />}
            {visible && connections && <WiredLinkConnectionsView view={connections} />}
        </>
    );
};
