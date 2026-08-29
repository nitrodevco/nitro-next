import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { GrsMainWindowLayoutTabbedview, GrsMainWindowLayoutTabbedviewProps } from './GrsMainWindowLayoutTabbedview';

/** Generated from `3015_grs_main_window_xml` (layout "grs_main_window", 325x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowLayoutTabbedviewProps;
    visibleLoadingText?: boolean;
}

export const GrsMainWindowLayout = ({ captionLoadingText, layout, onClose, tabbedview, visibleLoadingText }: GrsMainWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="grs_main_window"
            name="grs_main_window"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 474, minWidth: 325, minHeight: 215, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowLayoutTabbedview {...tabbedview} />
                {(visibleLoadingText ?? false) && (
                    <Region
                        name="loading_text"
                        layout={{ position: 'absolute', marginLeft: -23.5, marginRight: 23.5, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionLoadingText ?? t('navigator.loading')}
                    </Region>
                )}
            </Region>
        </Frame>
    );
};
