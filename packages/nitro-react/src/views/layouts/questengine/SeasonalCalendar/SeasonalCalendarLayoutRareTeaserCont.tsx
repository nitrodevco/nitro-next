import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `rare_teaser_cont` of SeasonalCalendarLayout - configured through the parent's `rareTeaserCont` prop. */
export interface SeasonalCalendarLayoutRareTeaserContProps {
    bg?: ReactNode;
    bottom?: ReactNode;
    captionTeaserHeader?: string;
    captionTeaserInfo?: string;
    clickRegion?: ReactNode;
    clickRegion2?: ReactNode;
    clickRegion3?: ReactNode;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    onClickRegion2?: () => void;
    onClickRegion3?: () => void;
    onRareTeaserCont?: () => void;
    srcFurniPic?: string;
    srcRareCont2FurniPic?: string;
    srcRareCont3FurniPic?: string;
    top?: ReactNode;
}

export const SeasonalCalendarLayoutRareTeaserCont = ({ bg, bottom, captionTeaserHeader, captionTeaserInfo, clickRegion, clickRegion2, clickRegion3, layout, onClickRegion, onClickRegion2, onClickRegion3, onRareTeaserCont, srcFurniPic, srcRareCont2FurniPic, srcRareCont3FurniPic, top }: SeasonalCalendarLayoutRareTeaserContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rare_teaser_cont"
            onPointerTap={onRareTeaserCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 395, width: 235, top: 1, height: 97, justifyContent: 'center', ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#9cb0b6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {bg}
            </Region>
            <Region
                name="top"
                backgroundColor="#d4e4e8"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
            >
                {top}
            </Region>
            <Region
                name="bottom"
                backgroundColor="#c6d7dd"
                layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
            >
                {bottom}
            </Region>
            <Region
                name="rare_cont_1"
                layout={{ position: 'absolute', left: 57, width: 36, top: 28, height: 36 }}
            >
                <Border
                    variant="2"
                    name="locked_bg"
                    tintColor="#9cb0b6"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Border
                    variant="2"
                    name="open_bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Icon
                    variant="28"
                    name="locked_icon"
                    layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                />
                <ThemeImage
                    name="furni_pic"
                    src={srcFurniPic}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {clickRegion}
                </Region>
            </Region>
            <Region
                name="rare_cont_2"
                layout={{ position: 'absolute', left: 99, width: 36, top: 28, height: 36 }}
            >
                <Border
                    variant="2"
                    name="locked_bg"
                    tintColor="#9cb0b6"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Border
                    variant="2"
                    name="open_bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Icon
                    variant="28"
                    name="locked_icon"
                    layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                />
                <ThemeImage
                    name="furni_pic"
                    src={srcRareCont2FurniPic}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion2}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {clickRegion2}
                </Region>
            </Region>
            <Region
                name="rare_cont_3"
                layout={{ position: 'absolute', left: 141, width: 36, top: 28, height: 36 }}
            >
                <Border
                    variant="2"
                    name="locked_bg"
                    tintColor="#9cb0b6"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Border
                    variant="2"
                    name="open_bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Icon
                    variant="28"
                    name="locked_icon"
                    layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                />
                <ThemeImage
                    name="furni_pic"
                    src={srcRareCont3FurniPic}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion3}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {clickRegion3}
                </Region>
            </Region>
            <Region
                name="teaser_header"
                layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 230, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTeaserHeader ?? t('quests.seasonalcalendar.rareteaser.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="teaser_info"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 212, top: 71, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTeaserInfo ?? t('quests.seasonalcalendar.rareteaser.info')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
