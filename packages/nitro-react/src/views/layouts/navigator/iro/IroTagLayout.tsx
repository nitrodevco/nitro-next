import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3067_iro_tag_xml` (layout "iro_tag", 38x14) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroTagLayoutProps {
    captionTxt?: string;
    layout?: BoxLayout;
    onTag?: () => void;
    srcBgL?: string;
    srcBgM?: string;
    srcBgR?: string;
    tintBgL?: string;
    tintBgM?: string;
    tintBgR?: string;
}

export const IroTagLayout = ({ captionTxt, layout, onTag, srcBgL, srcBgM, srcBgR, tintBgL, tintBgM, tintBgR }: IroTagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 38, height: 14, ...layout }}>
            <Region
                name="tag"
                onPointerTap={onTag}
                cursor="pointer"
                layout={{ position: 'absolute', right: 0, width: 38, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="bg_l"
                    src={srcBgL}
                    tint={tintBgL}
                    layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 14 }}
                />
                <ThemeImage
                    name="bg_m"
                    src={srcBgM}
                    tint={tintBgM}
                    layout={{ position: 'absolute', left: 4, right: 6, top: 0, height: 14 }}
                />
                <ThemeImage
                    name="bg_r"
                    src={srcBgR}
                    tint={tintBgR}
                    layout={{ position: 'absolute', right: 1, width: 5, top: 0, height: 14 }}
                />
                <Region
                    name="txt"
                    layout={{ position: 'absolute', left: 1, width: 9, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTxt ?? '0'}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#0e3139' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
