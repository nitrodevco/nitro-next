import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `begin_helper_no_citizenship` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginHelperNoCitizenshipItemProps {
    avatarImage?: ReactNode;
    layout?: BoxLayout;
    visibleAvatarImage?: boolean;
}

export const TalentTrackLayoutBeginHelperNoCitizenshipItem = ({ avatarImage, layout, visibleAvatarImage }: TalentTrackLayoutBeginHelperNoCitizenshipItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_helper_no_citizenship"
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, width: 259, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.helper.begin.title')}
                    textStyle="text-style-il-heading-title"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.helper.begin.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                />
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
                    text={t('talent.track.helper.begin.register')}
                    textStyle="text-style-il-button"
                    textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
        </Region>
    );
};
