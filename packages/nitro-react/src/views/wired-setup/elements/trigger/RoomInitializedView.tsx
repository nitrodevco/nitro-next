/**
 * `triggerconfs/RoomInitialized.buildInputs` - the usage info (expanded): when a room initializes
 * and why a game should reset itself then.
 */
import { WiredElementView } from '#base/wired';

import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

export const RoomInitializedView: WiredElementView<Record<string, never>> = () => (
    <WiredUsageInfoSection text="${wiredfurni.params.room_initialized.usage_info}" />
);
