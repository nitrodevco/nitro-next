import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `begin_citizenship` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginCitizenshipItemProps {
    avatarImage?: ReactNode;
    layout?: BoxLayout;
    visibleAvatarImage?: boolean;
}

export const TalentTrackLayoutBeginCitizenshipItem = ({ avatarImage, layout, visibleAvatarImage }: TalentTrackLayoutBeginCitizenshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_citizenship"
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, minWidth: 228, top: 20, minHeight: 66, flexDirection: 'column', gap: 6 }}>
                <Region layout={{ width: 228, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('talent.track.citizenship.begin.title')}
                        textStyle="text-style-il-heading-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 228 }}
                    />
                </Region>
                <Region layout={{ width: 230, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('talent.track.citizenship.begin.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                    />
                </Region>
            </Region>
            {(visibleAvatarImage ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    layout={{ position: 'absolute', left: 169, width: 90, top: 144, height: 130 }}
                >
                    {avatarImage}
                </WidgetSlot>
            )}
            <ThemeImage
                src={layoutImage('talent_check_mark_circle.png')}
                layout={{ position: 'absolute', left: 216, width: 17, top: 172, height: 18 }}
            />
            <Region layout={{ position: 'absolute', left: 113, width: 76, top: 201, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                <ThemeText
                    text={t('talent.track.citizenship.begin.register')}
                    textStyle="text-style-il-button"
                    textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
        </Region>
    );
};
