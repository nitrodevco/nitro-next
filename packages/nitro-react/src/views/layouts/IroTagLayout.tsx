import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3067_iro_tag_xml` (layout "iro_tag", 38x14) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroTagLayoutProps {
    layout?: BoxLayout;
}

export const IroTagLayout = ({ layout }: IroTagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 38, height: 14, ...layout }}>
            <Region
                name="tag"
                params={81}
                layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 14 }}
            >
                <ThemeImage
                    name="bg_l"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 14 }}
                />
                <ThemeImage
                    name="bg_m"
                    params={144}
                    src={undefined}
                    layout={{ position: 'absolute', left: 4, width: 28, top: 0, height: 14 }}
                />
                <ThemeImage
                    name="bg_r"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 32, width: 5, top: 0, height: 14 }}
                />
                <Region
                    name="txt"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="0"
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#0e3139' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
