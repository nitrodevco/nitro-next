import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3067_iro_tag_xml` (layout "iro_tag", 38x14) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroTagLayoutProps {
    layout?: BoxLayout;
    tag?: IroTagLayoutTagProps;
}

export const IroTagLayout = ({ layout, tag }: IroTagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 38, height: 14, ...layout }}>
            <IroTagLayoutTag {...tag} />
        </Region>
    );
};

/** Named region `tag` of IroTagLayout - configured through the parent's `tag` prop. */
export interface IroTagLayoutTagProps {
    captionTxt?: string;
    layout?: BoxLayout;
    onTag?: () => void;
    srcBgL?: string;
    srcBgM?: string;
    srcBgR?: string;
    tags?: string[];
}

export const IroTagLayoutTag = ({ captionTxt, layout, onTag, srcBgL, srcBgM, srcBgR, tags }: IroTagLayoutTagProps) => {
    return (
        <Region
            name="tag"
            tags={tags}
            onPointerTap={onTag}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 38, top: 0, height: 14, ...layout }}
        >
            <ThemeImage
                name="bg_l"
                src={srcBgL}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 14 }}
            />
            <ThemeImage
                name="bg_m"
                src={srcBgM}
                layout={{ position: 'absolute', left: 4, right: 6, top: 0, height: 14 }}
            />
            <ThemeImage
                name="bg_r"
                src={srcBgR}
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
    );
};
