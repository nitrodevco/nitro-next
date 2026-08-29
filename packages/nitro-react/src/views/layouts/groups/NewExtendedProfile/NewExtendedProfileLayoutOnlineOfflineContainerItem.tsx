import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `online_offline_container` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutOnlineOfflineContainerItemProps {
    layout?: BoxLayout;
    srcHiddenIcon?: string;
    srcOfflineIcon?: string;
    srcOnlineIcon?: string;
    visibleHiddenIcon?: boolean;
    visibleOfflineIcon?: boolean;
    visibleOnlineIcon?: boolean;
}

export const NewExtendedProfileLayoutOnlineOfflineContainerItem = ({ layout, srcHiddenIcon, srcOfflineIcon, srcOnlineIcon, visibleHiddenIcon, visibleOfflineIcon, visibleOnlineIcon }: NewExtendedProfileLayoutOnlineOfflineContainerItemProps) => {
    return (
        <Region
            name="online_offline_container"
            layout={{ width: 40, height: 23, flexShrink: 0, ...layout }}
        >
            {(visibleOfflineIcon ?? true) && (
                <ThemeImage
                    name="offline_icon"
                    src={srcOfflineIcon ?? '${image.library.url}guilds/offline_icon.png'}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 3, height: 18 }}
                />
            )}
            {(visibleOnlineIcon ?? true) && (
                <ThemeImage
                    name="online_icon"
                    src={srcOnlineIcon ?? '${image.library.url}guilds/online_icon.png'}
                    layout={{ position: 'absolute', left: 1, width: 37, top: 3, height: 18 }}
                />
            )}
            {(visibleHiddenIcon ?? false) && (
                <ThemeImage
                    name="hidden_icon"
                    src={srcHiddenIcon ?? '${image.library.url}guilds/hidden_icon.png'}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 3, height: 18 }}
                />
            )}
        </Region>
    );
};
