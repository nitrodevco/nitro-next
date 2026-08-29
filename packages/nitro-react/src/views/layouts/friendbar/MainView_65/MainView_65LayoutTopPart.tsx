import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `top_part` of MainView_65Layout - configured through the parent's `topPart` prop. */
export interface MainView_65LayoutTopPartProps {
    captionTopHeaderText?: string;
    captionTopText?: string;
    groupIcon?: ReactNode;
    layout?: BoxLayout;
    onTopClickArea?: () => void;
    onTopPart?: () => void;
    srcHeaderIcon?: string;
    topClickArea?: ReactNode;
}

export const MainView_65LayoutTopPart = ({ captionTopHeaderText, captionTopText, groupIcon, layout, onTopClickArea, onTopPart, srcHeaderIcon, topClickArea }: MainView_65LayoutTopPartProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_part"
            backgroundColor="#0e3f52"
            onPointerTap={onTopPart}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80, ...layout }}
        >
            <Region
                name="top_click_area"
                onPointerTap={onTopClickArea}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
            >
                {topClickArea}
            </Region>
            <Region
                name="icon_background"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_icon"
                    layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
                >
                    {groupIcon}
                </WidgetSlot>
                <ThemeImage
                    name="header_icon"
                    src={srcHeaderIcon}
                    layout={{ position: 'absolute', left: 18, width: 44, top: 18, height: 43 }}
                />
            </Region>
            <Region
                name="top_header_text"
                layout={{ position: 'absolute', left: 90, width: 678, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopHeaderText ?? 'Super-duper long group title'}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="top_text"
                layout={{ position: 'absolute', left: 90, right: 4, top: 40, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopText ?? 'Super-duper long goup description, maybe even multiline, but takes a few lines anyway'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 456 }}
                />
            </Region>
            <Border
                variant="1"
                name="settings_button"
                tintColor="#000000"
                layout={{ position: 'absolute', right: 1, width: 65, top: 60, height: 18, minHeight: 18 }}
            >
                <ThemeImage
                    src={layoutImage('pursearea_settings_icon.png')}
                    layout={{ position: 'absolute', left: 3, width: 15, top: 2, height: 15 }}
                />
                <Region layout={{ position: 'absolute', left: 17, width: 48, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('groupforum.view.settings.header')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
