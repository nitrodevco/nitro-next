import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CalendarLayoutSpinnerContainer, CalendarLayoutSpinnerContainerProps } from './CalendarLayoutSpinnerContainer';

/** Generated from `1260_calendar_xml` (layout "calendar", 1033x607) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CalendarLayoutProps {
    captionInfoBody?: string;
    captionInfoHeading?: string;
    layout?: BoxLayout;
    onBtnBack?: () => void;
    onBtnForceOpen?: () => void;
    onBtnForward?: () => void;
    onClose?: () => void;
    spinnerContainer?: CalendarLayoutSpinnerContainerProps;
    visibleBtnForceOpen?: boolean;
}

export const CalendarLayout = ({ captionInfoBody, captionInfoHeading, layout, onBtnBack, onBtnForceOpen, onBtnForward, onClose, spinnerContainer, visibleBtnForceOpen }: CalendarLayoutProps) => {
    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 1033, height: 607, minWidth: 1033, minHeight: 607, ...layout }}
        >
            <Region
                backgroundColor="#0e0f1f"
                layout={{ position: 'absolute', left: 0, right: -12, top: 0, bottom: -41 }}
            >
                <CalendarLayoutSpinnerContainer {...spinnerContainer} />
            </Region>
            <ThemeImage
                src={layoutImage('campaign_calendar_icon.png')}
                layout={{ position: 'absolute', left: 31, width: 47, top: 32, height: 51 }}
            />
            <Region layout={{ position: 'absolute', left: 95, width: 500, top: 28, height: 50, maxHeight: 120, flexDirection: 'column', gap: 3 }}>
                <Region
                    name="info_heading"
                    layout={{ width: 500, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoHeading ?? 'December 20th'}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ fill: '#7ecaed', wordWrap: true, wordWrapWidth: 500 }}
                    />
                </Region>
                <Region
                    name="info_body"
                    layout={{ width: 500, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoBody ?? 'This spell will produce xxxxxx xxx xxxxx'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 500 }}
                    />
                </Region>
            </Region>
            <Region
                name="btn_forward"
                onPointerTap={onBtnForward}
                cursor="pointer"
                layout={{ position: 'absolute', left: 991, width: 33, top: 325, height: 34 }}
            >
                <ThemeImage
                    src={layoutImage('icons_forward.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                />
            </Region>
            <Region
                name="btn_back"
                onPointerTap={onBtnBack}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 33, top: 325, height: 34 }}
            >
                <ThemeImage
                    src={layoutImage('icons_back.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                />
            </Region>
            {(visibleBtnForceOpen ?? false) && (
                <Button
                    variant="6"
                    name="btn_force_open"
                    tintColor="#299f3a"
                    onPointerTap={onBtnForceOpen}
                    layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 30, minWidth: 120, maxWidth: 120 }}
                >
                    FORCE OPEN
                </Button>
            )}
        </Frame>
    );
};
