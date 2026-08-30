import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Row template `owner_region` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
    visibleOwnerLink?: boolean;
    visibleOwnerName?: boolean;
}

export const CrackableFurniViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion, visibleOwnerLink, visibleOwnerName }: CrackableFurniViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
            onPointerTap={onOwnerRegion}
            cursor="pointer"
            layout={{ width: 170, height: 17, flexShrink: 0, ...layout }}
        >
            {(visibleOwnerLink ?? true) && (
                <Icon
                    variant="21"
                    name="owner_link"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
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
        </Region>
    );
};
