import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ThemeText } from '#base/theme';

import { HabboWindowAlertLayoutAlertButtonCancelItem } from './HabboWindowAlertLayoutAlertButtonCancelItem';
import { HabboWindowAlertLayoutAlertButtonCustomItem } from './HabboWindowAlertLayoutAlertButtonCustomItem';
import { HabboWindowAlertLayoutAlertButtonOkItem } from './HabboWindowAlertLayoutAlertButtonOkItem';

/** Generated from `2424_habbo_window_alert_xml` (layout "habbo_window_alert", 278x141) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWindowAlertLayoutProps {
    captionAlertSummary?: string;
    itemsAlertButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HabboWindowAlertLayout = ({ captionAlertSummary, itemsAlertButtonList, layout, onClose }: HabboWindowAlertLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="_alert_frame"
            name="_alert_frame"
            caption="Alert"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 278, height: 141, minWidth: 278, minHeight: 141, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="_alert_summary"
                    layout={{ position: 'absolute', left: 27, width: 210, top: 14, minHeight: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlertSummary ?? 'Alert'}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <Region
                    name="_alert_button_list"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 215, bottom: -5, height: 24, minHeight: 22, flexDirection: 'row', gap: 32 }}
                >
                    {itemsAlertButtonList ?? (
                        <>
                            <HabboWindowAlertLayoutAlertButtonCancelItem />
                            <HabboWindowAlertLayoutAlertButtonCustomItem />
                            <HabboWindowAlertLayoutAlertButtonOkItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
