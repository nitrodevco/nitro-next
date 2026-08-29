import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `relationship_smile` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipSmileItemProps {
    captionSmileFriendNameLinkText?: string;
    captionSmileTxt?: string;
    layout?: BoxLayout;
    onSmileFriendNameLinkRegion?: () => void;
    smileHead?: ReactNode;
    visibleSmileFriendNameLinkRegion?: boolean;
    visibleSmileFriendNameLinkText?: boolean;
    visibleSmileHead?: boolean;
    visibleSmileTxt?: boolean;
}

export const NewExtendedProfileLayoutRelationshipSmileItem = ({ captionSmileFriendNameLinkText, captionSmileTxt, layout, onSmileFriendNameLinkRegion, smileHead, visibleSmileFriendNameLinkRegion, visibleSmileFriendNameLinkText, visibleSmileHead, visibleSmileTxt }: NewExtendedProfileLayoutRelationshipSmileItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_smile"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_smile.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                {(visibleSmileFriendNameLinkRegion ?? true) && (
                    <Region
                        name="smile_friend_name_link_region"
                        onPointerTap={onSmileFriendNameLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160 }}
                    >
                        {(visibleSmileFriendNameLinkText ?? true) && (
                            <Region
                                name="smile_friend_name_link_text"
                                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 16, maxWidth: 160, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {captionSmileFriendNameLinkText ?? t('extendedprofile.add.friends')}
                            </Region>
                        )}
                    </Region>
                )}
            </Border>
            {(visibleSmileHead ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="smile_head"
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                    layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
                >
                    {smileHead}
                </WidgetSlot>
            )}
            {(visibleSmileTxt ?? true) && (
                <Region
                    name="smile_txt"
                    layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSmileTxt ?? t('extendedprofile.no.friends.in.this.category')}
                        textOptions={{ fill: '#7f7f7f' }}
                    />
                </Region>
            )}
        </Region>
    );
};
