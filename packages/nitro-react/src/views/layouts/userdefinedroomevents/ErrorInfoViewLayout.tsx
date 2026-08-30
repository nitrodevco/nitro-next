import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1154_error_info_view_xml` (layout "error_info_view", 337x148) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorInfoViewLayoutProps {
    captionErrorName?: string;
    captionErrorText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    srcTypeIcon?: string;
}

export const ErrorInfoViewLayout = ({ captionErrorName, captionErrorText, layout, onClose, srcTypeIcon }: ErrorInfoViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="error_info_frame"
            name="error_info_frame"
            caption={t('wiredmenu.error_info.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 337, height: 148, minWidth: 300, minHeight: 148, ...layout }}
        >
            <Region
                name="contents"
                layout={{ position: 'absolute', left: 8, right: -3, top: 3, height: 100, minHeight: 100, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="type_icon"
                    src={srcTypeIcon}
                    layout={{ position: 'absolute', left: 280, width: 40, top: 0, height: 40 }}
                />
                <ThemeText
                    text={captionErrorName ?? 'EXECUTION_CAP'}
                    name="error_name"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 101, alignSelf: 'center', marginTop: -30.5, marginBottom: 30.5, height: 17 }}
                />
                <ThemeText
                    text={captionErrorText ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 319 }}
                    name="error_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 319, top: 46, height: 50, minHeight: 50 }}
                />
            </Region>
        </Frame>
    );
};
