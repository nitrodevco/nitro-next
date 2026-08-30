import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `friend_matches_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutFriendMatchesSectionItemProps {
    captionFriendMatchesHeader?: string;
    captionFriendMatchesText?: string;
    layout?: BoxLayout;
    visibleFriendMatchesHeader?: boolean;
    visibleFriendMatchesText?: boolean;
}

export const InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem = ({ captionFriendMatchesHeader, captionFriendMatchesText, layout, visibleFriendMatchesHeader, visibleFriendMatchesText }: InventoryTradingNameScamWarningLayoutFriendMatchesSectionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friend_matches_section"
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            {(visibleFriendMatchesHeader ?? true) && (
                <ThemeText
                    text={captionFriendMatchesHeader ?? t('inventory.trading.namescam.similar_in_friends')}
                    name="friend_matches_header"
                    layout={{ position: 'absolute', left: 0, width: 172, top: 0, height: 17 }}
                />
            )}
            {(visibleFriendMatchesText ?? true) && (
                <ThemeText
                    text={captionFriendMatchesText ?? 'Friend 1'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    name="friend_matches_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 38 }}
                />
            )}
        </Region>
    );
};
