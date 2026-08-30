import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
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
            layout={{ alignSelf: 'stretch', height: 61, flexShrink: 0, ...layout }}
        >
            {(visibleInfoImg ?? true) && (
                <ThemeImage
                    name="info_img"
                    src={srcInfoImg ?? layoutImage('common_info_icon_grey.png')}
                    layout={{ position: 'absolute', left: 4, width: 23, top: 13, height: 24 }}
                />
            )}
            <ThemeText
                text={t('guide.help.guide.tool.guidesonduty')}
                layout={{ position: 'absolute', right: 8, width: 188, top: 0, height: 16 }}
            />
            <ThemeText
                text={t('guide.help.guide.tool.helpersonduty')}
                layout={{ position: 'absolute', right: 3, width: 193, top: 17, height: 16 }}
            />
            <ThemeText
                text={t('guide.help.guide.tool.guardiansonduty')}
                layout={{ position: 'absolute', right: -10, width: 206, bottom: 11, height: 16 }}
            />
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 229, bottom: 5, height: 2 }}
            />
        </Region>
    );
};
