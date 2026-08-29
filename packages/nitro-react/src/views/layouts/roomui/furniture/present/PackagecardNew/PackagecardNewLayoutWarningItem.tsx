import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `warning` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutWarningItemProps {
    bottomSpacer?: ReactNode;
    captionWarningText?: string;
    layout?: BoxLayout;
    srcWarningIcon?: string;
    topSpacer?: ReactNode;
    visibleBottomSpacer?: boolean;
    visibleTopSpacer?: boolean;
    visibleWarningBackgroundBorder?: boolean;
    visibleWarningForegroundBorder?: boolean;
    visibleWarningIcon?: boolean;
    visibleWarningIconContainer?: boolean;
    visibleWarningText?: boolean;
}

export const PackagecardNewLayoutWarningItem = ({ bottomSpacer, captionWarningText, layout, srcWarningIcon, topSpacer, visibleBottomSpacer, visibleTopSpacer, visibleWarningBackgroundBorder, visibleWarningForegroundBorder, visibleWarningIcon, visibleWarningIconContainer, visibleWarningText }: PackagecardNewLayoutWarningItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warning"
            layout={{ width: 306, height: 56, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleWarningBackgroundBorder ?? true) && (
                <Border
                    variant="3"
                    name="warning_background_border"
                    tintColor="#000000"
                    layout={{ position: 'absolute', width: 306, alignSelf: 'center', height: 56, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', alignSelf: 'center', flexDirection: 'column' }}>
                        {(visibleTopSpacer ?? true) && (
                            <Region
                                name="top-spacer"
                                layout={{ width: 300, height: 3, flexShrink: 0 }}
                            >
                                {topSpacer}
                            </Region>
                        )}
                        {(visibleWarningForegroundBorder ?? true) && (
                            <Border
                                variant="3"
                                name="warning_foreground_border"
                                tintColor="#186e09"
                                layout={{ width: 300, height: 50, flexShrink: 0 }}
                            >
                                {(visibleWarningText ?? true) && (
                                    <Region
                                        name="warning_text"
                                        layout={{ position: 'absolute', left: 65, width: 235, alignSelf: 'center', height: 30, minWidth: 235, maxWidth: 235, minHeight: 30, maxHeight: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionWarningText ?? t('gift.trusted.banner.text')}
                                            textStyle="text-style-id-regular"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 235 }}
                                        />
                                    </Region>
                                )}
                                {(visibleWarningIconContainer ?? true) && (
                                    <Region
                                        name="warning_icon_container"
                                        layout={{ position: 'absolute', left: 0, width: 70, alignSelf: 'center', height: 50, maxWidth: 70, justifyContent: 'center' }}
                                    >
                                        {(visibleWarningIcon ?? true) && (
                                            <ThemeImage
                                                name="warning_icon"
                                                src={srcWarningIcon ?? layoutImage('catalogue_ui2_checkmark_m.png')}
                                                layout={{ position: 'absolute', width: 30, alignSelf: 'center', height: 24 }}
                                            />
                                        )}
                                    </Region>
                                )}
                            </Border>
                        )}
                        {(visibleBottomSpacer ?? true) && (
                            <Region
                                name="bottom-spacer"
                                layout={{ width: 300, height: 3, flexShrink: 0 }}
                            >
                                {bottomSpacer}
                            </Region>
                        )}
                    </Region>
                </Border>
            )}
        </Region>
    );
};
