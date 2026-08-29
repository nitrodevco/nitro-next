import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3043_grs_front_page_search_big_xml` (layout "grs_front_page_search_big", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsFrontPageSearchBigLayoutProps {
    cont?: GrsFrontPageSearchBigLayoutContProps;
    layout?: BoxLayout;
}

export const GrsFrontPageSearchBigLayout = ({ cont, layout }: GrsFrontPageSearchBigLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <GrsFrontPageSearchBigLayoutCont {...cont} />
        </Region>
    );
};

/** Named region `cont` of GrsFrontPageSearchBigLayout - configured through the parent's `cont` prop. */
export interface GrsFrontPageSearchBigLayoutContProps {
    captionCaption?: string;
    layout?: BoxLayout;
    onCont?: () => void;
    srcIcon?: string;
    tags?: string[];
}

export const GrsFrontPageSearchBigLayoutCont = ({ captionCaption, layout, onCont, srcIcon, tags }: GrsFrontPageSearchBigLayoutContProps) => {
    return (
        <Region
            name="cont"
            tags={tags}
            onPointerTap={onCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: -251, top: 0, height: 42, ...layout }}
        >
            <Border
                variant="0"
                name="button_area"
                layout={{ position: 'absolute', left: 0, right: 9, top: 0, height: 36 }}
            >
                <Region
                    name="caption"
                    layout={{ position: 'absolute', left: 44, width: 179, alignSelf: 'center', marginTop: -2, marginBottom: 2, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCaption ?? 'Search Caption Placeholder'}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    layout={{ position: 'absolute', left: 6, width: 32, top: 2, height: 32 }}
                />
            </Border>
        </Region>
    );
};
