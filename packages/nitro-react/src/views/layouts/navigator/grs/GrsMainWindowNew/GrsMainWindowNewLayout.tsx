import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { GrsMainWindowNewLayoutTabbedview, GrsMainWindowNewLayoutTabbedviewProps } from './GrsMainWindowNewLayoutTabbedview';

/** Generated from `3041_grs_main_window_new_xml` (layout "grs_main_window_new", 400x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowNewLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowNewLayoutTabbedviewProps;
    visibleLoadingText?: boolean;
}

export const GrsMainWindowNewLayout = ({ captionLoadingText, layout, onClose, tabbedview, visibleLoadingText }: GrsMainWindowNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="grs_main_window"
            name="grs_main_window"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 400, height: 474, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowNewLayoutTabbedview {...tabbedview} />
                {(visibleLoadingText ?? false) && (
                    <Region
                        name="loading_text"
                        layout={{ position: 'absolute', marginLeft: -67, marginRight: 67, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionLoadingText ?? t('navigator.loading')}
                    </Region>
                )}
            </Region>
        </Frame>
    );
};
