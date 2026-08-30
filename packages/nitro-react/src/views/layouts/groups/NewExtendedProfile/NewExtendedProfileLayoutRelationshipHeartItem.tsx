import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `relationship_heart` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipHeartItemProps {
    captionHeartFriendNameLinkText?: string;
    captionHeartTxt?: string;
    heartHead?: ReactNode;
    layout?: BoxLayout;
    onHeartFriendNameLinkRegion?: () => void;
    visibleHeartFriendNameLinkRegion?: boolean;
    visibleHeartFriendNameLinkText?: boolean;
    visibleHeartHead?: boolean;
    visibleHeartTxt?: boolean;
}

export const NewExtendedProfileLayoutRelationshipHeartItem = ({ captionHeartFriendNameLinkText, captionHeartTxt, heartHead, layout, onHeartFriendNameLinkRegion, visibleHeartFriendNameLinkRegion, visibleHeartFriendNameLinkText, visibleHeartHead, visibleHeartTxt }: NewExtendedProfileLayoutRelationshipHeartItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_heart"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_heart.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                {(visibleHeartFriendNameLinkRegion ?? true) && (
                    <Region
                        name="heart_friend_name_link_region"
                        onPointerTap={onHeartFriendNameLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160 }}
                    >
                        {(visibleHeartFriendNameLinkText ?? true) && (
                            <ThemeText
                                text={captionHeartFriendNameLinkText ?? t('extendedprofile.add.friends')}
                                name="heart_friend_name_link_text"
                                layout={{ position: 'absolute', left: 0, width: 151, top: 0, bottom: 0, maxWidth: 160 }}
                            />
                        )}
                    </Region>
                )}
            </Border>
            {(visibleHeartHead ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="heart_head"
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                    layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
                >
                    {heartHead}
                </WidgetSlot>
            )}
            {(visibleHeartTxt ?? true) && (
                <ThemeText
                    text={captionHeartTxt ?? t('extendedprofile.no.friends.in.this.category')}
                    textOptions={{ fill: '#7f7f7f' }}
                    name="heart_txt"
                    layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16 }}
                />
            )}
        </Region>
    );
};
