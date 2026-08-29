import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `cnt_history` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutCntHistoryItemProps {
    layout?: BoxLayout;
    onButtonHistory?: () => void;
    onButtonHistoryBack?: () => void;
    onButtonHistoryForward?: () => void;
    visibleButtonHistory?: boolean;
    visibleButtonHistoryBack?: boolean;
    visibleButtonHistoryForward?: boolean;
}

export const RoomToolsToolbarLayoutCntHistoryItem = ({ layout, onButtonHistory, onButtonHistoryBack, onButtonHistoryForward, visibleButtonHistory, visibleButtonHistoryBack, visibleButtonHistoryForward }: RoomToolsToolbarLayoutCntHistoryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cnt_history"
            layout={{ width: 115, height: 43, flexShrink: 0, ...layout }}
        >
            {(visibleButtonHistoryBack ?? true) && (
                <Region
                    name="button_history_back"
                    tooltip={t('room.history.button.back.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onButtonHistoryBack}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 37, top: 3, height: 34 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_history_forward_bg.png')}
                        tint="#44a88d"
                        layout={{ position: 'absolute', left: 3, width: 34, top: 2, height: 31 }}
                    />
                    <ThemeImage
                        src={layoutImage('roomtools_history_back_icon.png')}
                        layout={{ position: 'absolute', left: 4, width: 30, top: 3, height: 30 }}
                    />
                </Region>
            )}
            {(visibleButtonHistory ?? true) && (
                <Region
                    name="button_history"
                    tooltip={t('room.history.button.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onButtonHistory}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 38, width: 35, top: 0, height: 38 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_history_open_bg.png')}
                        tint="#44a88d"
                        layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 35 }}
                    />
                    <ThemeImage
                        src={layoutImage('roomtools_history_open_icon.png')}
                        layout={{ position: 'absolute', left: 2, width: 32, top: 3, height: 35 }}
                    />
                </Region>
            )}
            {(visibleButtonHistoryForward ?? true) && (
                <Region
                    name="button_history_forward"
                    tooltip={t('room.history.button.forward.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onButtonHistoryForward}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 74, width: 34, top: 5, height: 32 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_history_forward_bg.png')}
                        tint="#44a88d"
                        layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 31 }}
                    />
                    <ThemeImage
                        src={layoutImage('roomtools_history_back_icon.png')}
                        layout={{ position: 'absolute', left: 3, width: 30, top: 1, height: 30 }}
                    />
                </Region>
            )}
        </Region>
    );
};
