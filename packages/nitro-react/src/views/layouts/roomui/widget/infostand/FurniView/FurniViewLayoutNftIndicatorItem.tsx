import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `nft_indicator` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNftIndicatorItemProps {
    layout?: BoxLayout;
    srcNftIcon?: string;
    tintNftIcon?: string;
    visibleNftIcon?: boolean;
}

export const FurniViewLayoutNftIndicatorItem = ({ layout, srcNftIcon, tintNftIcon, visibleNftIcon }: FurniViewLayoutNftIndicatorItemProps) => {
    return (
        <Region
            name="nft_indicator"
            layout={{ width: 170, height: 18, flexShrink: 0, ...layout }}
        >
            {(visibleNftIcon ?? true) && (
                <ThemeImage
                    name="nft_icon"
                    src={srcNftIcon}
                    tint={tintNftIcon}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                />
            )}
        </Region>
    );
};
