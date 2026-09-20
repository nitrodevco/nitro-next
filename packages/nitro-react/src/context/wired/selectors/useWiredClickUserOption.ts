import { WIRED_CLICK_USER_DEFAULT } from '../store/WiredEnvironmentSlice';
import { useWiredStore } from '../useWiredStore';

/** `WiredEnvironment.clickUserOption`: the room's user click setting, unless this user switched the click settings off for themselves. */
export const useWiredClickUserOption = () => {
    const clickUserSetting = useWiredStore(x => x.clickUserSetting);
    const clickSettingsIgnored = useWiredStore(x => x.clickSettingsIgnored);

    return clickSettingsIgnored ? WIRED_CLICK_USER_DEFAULT : clickUserSetting;
};
