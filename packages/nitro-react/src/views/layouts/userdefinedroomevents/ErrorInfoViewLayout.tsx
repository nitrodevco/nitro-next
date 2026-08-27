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
            params={1073790977}
            caption={t('wiredmenu.error_info.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 337, height: 148, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="contents"
                    params={147600}
                    layout={{ position: 'absolute', left: 8, right: 9, top: 3, height: 100, minHeight: 100 }}
                >
                    <ThemeImage
                        name="type_icon"
                        params={16}
                        src={srcTypeIcon}
                        layout={{ position: 'absolute', left: 280, width: 40, top: 0, height: 40 }}
                    />
                    <Region
                        name="error_name"
                        params={3932176}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -51, width: 101, top: '50%', marginTop: -39, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionErrorName ?? 'EXECUTION_CAP'} />
                    </Region>
                    <Region
                        name="error_text"
                        params={16400}
                        layout={{ position: 'absolute', left: 0, width: 319, top: 46, height: 50, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionErrorText ?? ''}
                            textOptions={{ wordWrap: true, wordWrapWidth: 319 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
