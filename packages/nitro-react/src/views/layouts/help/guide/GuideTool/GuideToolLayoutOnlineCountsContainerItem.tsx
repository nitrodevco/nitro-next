import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `online_counts_container` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutOnlineCountsContainerItemProps {
    layout?: BoxLayout;
    srcInfoImg?: string;
    visibleInfoImg?: boolean;
}

export const GuideToolLayoutOnlineCountsContainerItem = ({ layout, srcInfoImg, visibleInfoImg }: GuideToolLayoutOnlineCountsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="online_counts_container"
            layout={{ width: 227, height: 61, flexShrink: 0, ...layout }}
        >
            {(visibleInfoImg ?? true) && (
                <ThemeImage
                    name="info_img"
                    src={srcInfoImg ?? layoutImage('common_info_icon_grey.png')}
                    layout={{ position: 'absolute', left: 4, width: 23, top: 13, height: 24 }}
                />
            )}
            <Region layout={{ position: 'absolute', left: 31, width: 188, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('guide.help.guide.tool.guidesonduty')}
            </Region>
            <Region layout={{ position: 'absolute', left: 31, width: 193, top: 17, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('guide.help.guide.tool.helpersonduty')}
            </Region>
            <Region layout={{ position: 'absolute', left: 31, width: 206, top: 34, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('guide.help.guide.tool.guardiansonduty')}
            </Region>
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 229, top: 54, height: 2 }}
            />
        </Region>
    );
};
