import { BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `1803_illumina_dark_frame_xml` (layout "illumina_dark_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkFrameLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onTitlebar?: () => void;
    visibleFRAMESCALER?: boolean;
}

export const IlluminaDarkFrameLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose, onTitlebar, visibleFRAMESCALER }: IlluminaDarkFrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', width: 50, height: 50, ...layout }}
        >
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1 }}
            />
            <Region
                name="titlebar"
                onPointerTap={onTitlebar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-id-frame-title"
                />
            </Region>
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 9, height: 20 }}
            />
            {(visibleFRAMESCALER ?? false) && (
                <Scaler
                    name="_FRAME_SCALER"
                    layout={{ position: 'absolute', right: -5, width: 20, bottom: 5, height: 10 }}
                />
            )}
        </Region>
    );
};
