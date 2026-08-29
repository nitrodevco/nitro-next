import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3003_grs_front_page_search_small_xml` (layout "grs_front_page_search_small", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsFrontPageSearchSmallLayoutProps {
    cont?: GrsFrontPageSearchSmallLayoutContProps;
    layout?: BoxLayout;
}

export const GrsFrontPageSearchSmallLayout = ({ cont, layout }: GrsFrontPageSearchSmallLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <GrsFrontPageSearchSmallLayoutCont {...cont} />
        </Region>
    );
};

/** Named region `cont` of GrsFrontPageSearchSmallLayout - configured through the parent's `cont` prop. */
export interface GrsFrontPageSearchSmallLayoutContProps {
    captionCaption?: string;
    layout?: BoxLayout;
    onCont?: () => void;
    srcIcon?: string;
    tags?: string[];
}

export const GrsFrontPageSearchSmallLayoutCont = ({ captionCaption, layout, onCont, srcIcon, tags }: GrsFrontPageSearchSmallLayoutContProps) => {
    return (
        <Region
            name="cont"
            tags={tags}
            onPointerTap={onCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: -251, top: 0, height: 28, ...layout }}
        >
            <Border
                variant="0"
                name="button_area"
                layout={{ position: 'absolute', left: 0, right: 9, top: 0, height: 22 }}
            >
                <Region
                    name="caption"
                    layout={{ position: 'absolute', left: 30, width: 177, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCaption ?? 'Parties Caption Placeholder'}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    layout={{ position: 'absolute', left: 7, width: 16, top: 3, height: 16 }}
                />
            </Border>
        </Region>
    );
};
