import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3043_grs_front_page_search_big_xml` (layout "grs_front_page_search_big", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsFrontPageSearchBigLayoutProps {
    captionCaption?: string;
    layout?: BoxLayout;
    onCont?: () => void;
    srcIcon?: string;
    tintIcon?: string;
}

export const GrsFrontPageSearchBigLayout = ({ captionCaption, layout, onCont, srcIcon, tintIcon }: GrsFrontPageSearchBigLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="cont"
                onPointerTap={onCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: -251, top: 0, height: 42 }}
            >
                <Border
                    variant="0"
                    name="button_area"
                    layout={{ position: 'absolute', left: 0, right: 9, top: 0, height: 36 }}
                >
                    <ThemeText
                        text={captionCaption ?? 'Search Caption Placeholder'}
                        textOptions={{ fill: '#000000' }}
                        name="caption"
                        layout={{ position: 'absolute', left: 44, width: 179, alignSelf: 'center', marginTop: -2, marginBottom: 2, height: 12 }}
                    />
                    <ThemeImage
                        name="icon"
                        src={srcIcon}
                        tint={tintIcon}
                        layout={{ position: 'absolute', left: 6, width: 32, top: 2, height: 32 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
