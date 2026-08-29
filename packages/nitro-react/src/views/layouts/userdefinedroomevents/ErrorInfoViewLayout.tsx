import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1154_error_info_view_xml` (layout "error_info_view", 337x148) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorInfoViewLayoutProps {
    contents?: ErrorInfoViewLayoutContentsProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ErrorInfoViewLayout = ({ contents, layout, onClose }: ErrorInfoViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="error_info_frame"
            name="error_info_frame"
            caption={t('wiredmenu.error_info.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 337, height: 148, ...layout }}
        >
            <ErrorInfoViewLayoutContents {...contents} />
        </Frame>
    );
};

/** Named region `contents` of ErrorInfoViewLayout - configured through the parent's `contents` prop. */
export interface ErrorInfoViewLayoutContentsProps {
    captionErrorName?: string;
    captionErrorText?: string;
    layout?: BoxLayout;
    srcTypeIcon?: string;
}

export const ErrorInfoViewLayoutContents = ({ captionErrorName, captionErrorText, layout, srcTypeIcon }: ErrorInfoViewLayoutContentsProps) => {
    return (
        <Region
            name="contents"
            layout={{ position: 'absolute', left: 8, right: 9, top: 3, height: 100, minHeight: 100, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="type_icon"
                src={srcTypeIcon}
                layout={{ position: 'absolute', left: 280, width: 40, top: 0, height: 40 }}
            />
            <Region
                name="error_name"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 101, alignSelf: 'center', marginTop: -30.5, marginBottom: 30.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionErrorName ?? 'EXECUTION_CAP'} />
            </Region>
            <Region
                name="error_text"
                layout={{ position: 'absolute', left: 0, width: 319, top: 46, height: 50, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionErrorText ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 319 }}
                />
            </Region>
        </Region>
    );
};
