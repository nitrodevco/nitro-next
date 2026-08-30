import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `special_content_postit` of ClubCenterLayout - configured through the parent's `specialContentPostit` prop. */
export interface ClubCenterLayoutSpecialContentPostitProps {
    captionSpecialAmountContent?: string;
    captionSpecialAmountTitle?: string;
    captionSpecialBreakdownLink?: string;
    captionSpecialTimeContent?: string;
    captionSpecialTimeTitle?: string;
    layout?: BoxLayout;
    onSpecialBreakdownLink?: () => void;
    srcHcPostitBg?: string;
    srcSpecialAmountIcon?: string;
    srcSpecialTimeIcon?: string;
}

export const ClubCenterLayoutSpecialContentPostit = ({ captionSpecialAmountContent, captionSpecialAmountTitle, captionSpecialBreakdownLink, captionSpecialTimeContent, captionSpecialTimeTitle, layout, onSpecialBreakdownLink, srcHcPostitBg, srcSpecialAmountIcon, srcSpecialTimeIcon }: ClubCenterLayoutSpecialContentPostitProps) => {
    const t = useTranslation();

    return (
        <Region
            name="special_content_postit"
            layout={{ position: 'absolute', left: 218, width: 222, top: 204, height: 150, ...layout }}
        >
            <ThemeImage
                name="hc_postit_bg"
                src={srcHcPostitBg ?? layoutImage('hc_center_hc_postit_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 150 }}
            />
            <ThemeText
                text={captionSpecialTimeTitle ?? t('hccenter.special.time.title')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#683203' }}
                name="special_time_title"
                layout={{ position: 'absolute', left: 13, width: 190, top: 16, height: 22 }}
            />
            <ThemeText
                text={captionSpecialTimeContent ?? ''}
                textOptions={{ fill: '#683203' }}
                name="special_time_content"
                layout={{ position: 'absolute', left: 47, width: 153, top: 41, height: 22 }}
            />
            <ThemeText
                text={captionSpecialAmountTitle ?? t('hccenter.special.amount.title')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#683203' }}
                name="special_amount_title"
                layout={{ position: 'absolute', left: 13, width: 190, top: 68, height: 22 }}
            />
            <ThemeText
                text={captionSpecialAmountContent ?? ''}
                textOptions={{ fill: '#683203' }}
                name="special_amount_content"
                layout={{ position: 'absolute', left: 47, width: 153, top: 95, height: 22 }}
            />
            <Region
                name="special_breakdown_link"
                layout={{ position: 'absolute', right: 15, width: 190, top: 120, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                onPointerTap={onSpecialBreakdownLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionSpecialBreakdownLink ?? t('hccenter.breakdown.infolink')}
                    textOptions={{ fill: '#4a8eb1', wordWrap: true, wordWrapWidth: 190, align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="special_time_icon"
                src={srcSpecialTimeIcon ?? layoutImage('hc_center_hc_center_timer.png')}
                layout={{ position: 'absolute', left: 7, width: 24, top: 41, height: 24 }}
            />
            <ThemeImage
                name="special_amount_icon"
                src={srcSpecialAmountIcon ?? layoutImage('hc_center_icon_credits.png')}
                layout={{ position: 'absolute', left: 17, width: 24, top: 94, height: 24 }}
            />
        </Region>
    );
};
