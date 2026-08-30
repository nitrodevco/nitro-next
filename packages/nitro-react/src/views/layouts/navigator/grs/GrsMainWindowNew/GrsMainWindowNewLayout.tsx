import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeText } from '#base/theme';

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
            layout={{ width: 400, height: 474, minWidth: 400, minHeight: 215, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowNewLayoutTabbedview {...tabbedview} />
                {(visibleLoadingText ?? false) && (
                    <ThemeText
                        text={captionLoadingText ?? t('navigator.loading')}
                        name="loading_text"
                        layout={{ position: 'absolute', marginLeft: -61, marginRight: 61, width: 104, top: 210, height: 13 }}
                    />
                )}
            </Region>
        </Frame>
    );
};
