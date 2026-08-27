import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1812_illumina_dark_header_xml` (layout "illumina_dark_header", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkHeaderLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
}

export const IlluminaDarkHeaderLayout = ({ captionHeaderTitleText, layout }: IlluminaDarkHeaderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <Region
                name="header_container"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 30 }}
            >
                <Region
                    name="header_title_text"
                    tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                    layout={{ position: 'absolute', left: 20, width: 12, top: 2, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#24211c"
                >
                    <ThemeText
                        text={captionHeaderTitleText ?? ''}
                        textStyle="text-style-u-frame-title"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
