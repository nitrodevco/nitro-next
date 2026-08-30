import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, Shape, ThemeImage, ThemeText } from '#base/theme';

/** Row template `set_row_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutSetRowTemplateItemProps {
    captionSetRowProgressText?: string;
    captionSetRowTitle?: string;
    highlight?: ReactNode;
    layout?: BoxLayout;
    onSetRowTemplate?: () => void;
    srcSetIcon?: string;
    tintSetIcon?: string;
    visibleBackground?: boolean;
    visibleFill?: boolean;
    visibleHighlight?: boolean;
    visibleProgress?: boolean;
    visibleSetIcon?: boolean;
    visibleSetRowBackground?: boolean;
    visibleSetRowProgressBar?: boolean;
    visibleSetRowProgressText?: boolean;
    visibleSetRowTitle?: boolean;
}

export const HabbiconHubLayoutSetRowTemplateItem = ({ captionSetRowProgressText, captionSetRowTitle, highlight, layout, onSetRowTemplate, srcSetIcon, tintSetIcon, visibleBackground, visibleFill, visibleHighlight, visibleProgress, visibleSetIcon, visibleSetRowBackground, visibleSetRowProgressBar, visibleSetRowProgressText, visibleSetRowTitle }: HabbiconHubLayoutSetRowTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="set_row_template"
            onPointerTap={onSetRowTemplate}
            cursor="pointer"
            layout={{ width: 145, height: 50, flexShrink: 0, ...layout }}
        >
            {(visibleSetRowBackground ?? true) && (
                <Border
                    variant="10"
                    name="set_row_background"
                    tintColor="#f8ebd6"
                    layout={{ position: 'absolute', left: 1, right: -1, top: 1, bottom: 0 }}
                />
            )}
            {(visibleSetIcon ?? true) && (
                <ThemeImage
                    name="set_icon"
                    src={srcSetIcon}
                    tint={tintSetIcon}
                    layout={{ position: 'absolute', left: 7, width: 40, top: 4, height: 40 }}
                />
            )}
            {(visibleSetRowTitle ?? true) && (
                <ThemeText
                    text={captionSetRowTitle ?? t('habbicon_set_name')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                    name="set_row_title"
                    layout={{ position: 'absolute', left: 50, width: 115, top: 7, height: 17 }}
                />
            )}
            {(visibleSetRowProgressBar ?? true) && (
                <Region
                    name="set_row_progress_bar"
                    layout={{ position: 'absolute', left: 53, right: 23, top: 28, height: 12 }}
                >
                    {(visibleBackground ?? true) && (
                        <Shape
                            name="background"
                            shape="round_rectangle"
                            color="#4d5d66"
                            strokeThickness={1}
                            radius={4}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12 }}
                        />
                    )}
                    {(visibleProgress ?? true) && (
                        <Region
                            name="progress"
                            layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0 }}
                        >
                            {(visibleFill ?? true) && (
                                <Shape
                                    name="fill"
                                    shape="round_rectangle"
                                    color="#54a8e8"
                                    strokeThickness={1}
                                    radius={4}
                                    layout={{ position: 'absolute', left: 0, right: -68, top: 0, height: 12 }}
                                />
                            )}
                            {(visibleHighlight ?? true) && (
                                <Region
                                    name="highlight"
                                    blendMode="add"
                                    layout={{ position: 'absolute', left: 1, right: -67, top: 1, height: 4 }}
                                >
                                    {highlight}
                                </Region>
                            )}
                        </Region>
                    )}
                </Region>
            )}
            {(visibleSetRowProgressText ?? false) && (
                <ThemeText
                    text={captionSetRowProgressText ?? '0/0'}
                    textOptions={{ fill: '#2b2b2b', align: 'right' }}
                    name="set_row_progress_text"
                    layout={{ position: 'absolute', left: 104, width: 34, top: 27, height: 15 }}
                />
            )}
        </Region>
    );
};
