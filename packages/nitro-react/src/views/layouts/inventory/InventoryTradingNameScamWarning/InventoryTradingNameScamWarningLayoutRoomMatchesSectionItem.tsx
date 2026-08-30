import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_matches_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutRoomMatchesSectionItemProps {
    captionRoomMatchesHeader?: string;
    captionRoomMatchesText?: string;
    layout?: BoxLayout;
    visibleRoomMatchesHeader?: boolean;
    visibleRoomMatchesText?: boolean;
}

export const InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem = ({ captionRoomMatchesHeader, captionRoomMatchesText, layout, visibleRoomMatchesHeader, visibleRoomMatchesText }: InventoryTradingNameScamWarningLayoutRoomMatchesSectionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_matches_section"
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            {(visibleRoomMatchesHeader ?? true) && (
                <ThemeText
                    text={captionRoomMatchesHeader ?? t('inventory.trading.namescam.similar_in_room')}
                    name="room_matches_header"
                    layout={{ position: 'absolute', left: 0, width: 138, top: 0, height: 17 }}
                />
            )}
            {(visibleRoomMatchesText ?? true) && (
                <ThemeText
                    text={captionRoomMatchesText ?? 'User 1'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    name="room_matches_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 38 }}
                />
            )}
        </Region>
    );
};
