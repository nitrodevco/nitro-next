import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { HabbiconHubLayoutTrayGroupList, HabbiconHubLayoutTrayGroupListProps } from './HabbiconHubLayoutTrayGroupList';

/** Named region `tray_container` of HabbiconHubLayout - configured through the parent's `trayContainer` prop. */
export interface HabbiconHubLayoutTrayContainerProps {
    captionTraySummary?: string;
    captionTrayTitle?: string;
    layout?: BoxLayout;
    trayGroupList?: HabbiconHubLayoutTrayGroupListProps;
    visibleTrayContainer?: boolean;
}

export const HabbiconHubLayoutTrayContainer = ({ captionTraySummary, captionTrayTitle, layout, trayGroupList, visibleTrayContainer }: HabbiconHubLayoutTrayContainerProps) => {
    const t = useTranslation();

    return (
        (visibleTrayContainer ?? false) && (
            <Region
                name="tray_container"
                layout={{ position: 'absolute', left: 7, width: 540, top: 146, bottom: 44, ...layout }}
            >
                <Border
                    variant="3"
                    name="tray_background"
                    tintColor="#f6ebd7"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="tray_title"
                    layout={{ position: 'absolute', left: 12, width: 60, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTrayTitle ?? t('habbicon_book.tab.owned')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#2b2b2b' }}
                    />
                </Region>
                <Region
                    name="tray_summary"
                    layout={{ position: 'absolute', left: 12, width: 510, top: 34, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTraySummary ?? t('habbicon_book.tray.summary')}
                        textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 510 }}
                    />
                </Region>
                <HabbiconHubLayoutTrayGroupList {...trayGroupList} />
            </Region>
        )
    );
};
