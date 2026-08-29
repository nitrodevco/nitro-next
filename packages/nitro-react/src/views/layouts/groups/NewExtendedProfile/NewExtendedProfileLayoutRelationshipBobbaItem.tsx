import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `relationship_bobba` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipBobbaItemProps {
    bobbaHead?: ReactNode;
    captionBobbaFriendNameLinkText?: string;
    captionBobbaTxt?: string;
    layout?: BoxLayout;
    onBobbaFriendNameLinkRegion?: () => void;
    visibleBobbaFriendNameLinkRegion?: boolean;
    visibleBobbaFriendNameLinkText?: boolean;
    visibleBobbaHead?: boolean;
    visibleBobbaTxt?: boolean;
}

export const NewExtendedProfileLayoutRelationshipBobbaItem = ({ bobbaHead, captionBobbaFriendNameLinkText, captionBobbaTxt, layout, onBobbaFriendNameLinkRegion, visibleBobbaFriendNameLinkRegion, visibleBobbaFriendNameLinkText, visibleBobbaHead, visibleBobbaTxt }: NewExtendedProfileLayoutRelationshipBobbaItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_bobba"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_bobba.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                {(visibleBobbaFriendNameLinkRegion ?? true) && (
                    <Region
                        name="bobba_friend_name_link_region"
                        onPointerTap={onBobbaFriendNameLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160 }}
                    >
                        {(visibleBobbaFriendNameLinkText ?? true) && (
                            <Region
                                name="bobba_friend_name_link_text"
                                layout={{ position: 'absolute', left: 0, width: 151, top: 0, bottom: 0, maxWidth: 160, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {captionBobbaFriendNameLinkText ?? t('extendedprofile.add.friends')}
                            </Region>
                        )}
                    </Region>
                )}
            </Border>
            {(visibleBobbaHead ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="bobba_head"
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                    layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
                >
                    {bobbaHead}
                </WidgetSlot>
            )}
            {(visibleBobbaTxt ?? true) && (
                <Region
                    name="bobba_txt"
                    layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBobbaTxt ?? t('extendedprofile.no.friends.in.this.category')}
                        textOptions={{ fill: '#7f7f7f' }}
                    />
                </Region>
            )}
        </Region>
    );
};
