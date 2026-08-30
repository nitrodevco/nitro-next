import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `owner_region` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
    srcBcwIcon?: string;
    srcTempIcon?: string;
    visibleBcwIcon?: boolean;
    visibleOwnerLink?: boolean;
    visibleOwnerName?: boolean;
    visibleTempIcon?: boolean;
}

export const FurniViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion, srcBcwIcon, srcTempIcon, visibleBcwIcon, visibleOwnerLink, visibleOwnerName, visibleTempIcon }: FurniViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
            onPointerTap={onOwnerRegion}
            cursor="pointer"
            layout={{ width: 170, height: 17, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleOwnerLink ?? true) && (
                <Icon
                    variant="21"
                    name="owner_link"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
                />
            )}
            {(visibleBcwIcon ?? false) && (
                <ThemeImage
                    name="bcw_icon"
                    src={srcBcwIcon ?? '${image.library.url}/catalogue/icon_193.png'}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                />
            )}
            {(visibleOwnerName ?? true) && (
                <ThemeText
                    text={captionOwnerName ?? ''}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                    name="owner_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15 }}
                />
            )}
            {(visibleTempIcon ?? false) && (
                <ThemeImage
                    name="temp_icon"
                    src={srcTempIcon ?? '${image.library.url}catalogue/icon_80.png'}
                    layout={{ position: 'absolute', marginLeft: -77.5, marginRight: 77.5, width: 15, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 15 }}
                />
            )}
        </Region>
    );
};
