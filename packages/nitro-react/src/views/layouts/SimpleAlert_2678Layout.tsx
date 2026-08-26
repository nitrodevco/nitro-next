import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2678_simple_alert_xml` (layout "simple_alert", 310x163) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleAlert_2678LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    onLink?: () => void;
}

export const SimpleAlert_2678Layout = ({ layout, onClose, onCloseButton, onLink }: SimpleAlert_2678LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={163841}
            caption="caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 310, height: 163, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="illustration"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 10, width: 1, top: 8, height: 1 }}
                />
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 290, top: 8, height: 118, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="list_top"
                        params={147472}
                        layout={{ width: 290, height: 43, flexShrink: 0, flexDirection: 'column' }}
                    >
                        <Region
                            name="subtitle"
                            params={16}
                            layout={{ width: 54, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="subtitle"
                                textStyle="text-style-il-heading-1"
                                textOptions={{ fill: '#c30000' }}
                            />
                        </Region>
                        <Region
                            name="message"
                            params={16}
                            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="message"
                                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="list_bottom"
                        params={147472}
                        layout={{ width: 290, height: 72, flexShrink: 0, flexDirection: 'column', gap: 5 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('illumina_horizontal_separator.png')}
                            layout={{ width: 1000, height: 13, flexShrink: 0 }}
                        />
                        <ButtonThick
                            variant="3"
                            name="close_button"
                            params={131281}
                            tintColor="#efefef"
                            onPointerTap={onCloseButton}
                            layout={{ width: 126, height: 28, flexShrink: 0 }}
                        >
                            {t('alert.close.button')}
                        </ButtonThick>
                        <Region
                            name="link"
                            params={193}
                            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            onPointerTap={onLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text="link"
                                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
