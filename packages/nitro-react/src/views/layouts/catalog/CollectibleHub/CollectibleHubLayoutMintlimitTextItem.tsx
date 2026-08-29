import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `mintlimit_text` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutMintlimitTextItemProps {
    captionMintlimitText?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutMintlimitTextItem = ({ captionMintlimitText, layout }: CollectibleHubLayoutMintlimitTextItemProps) => {
    return (
        <Region
            name="mintlimit_text"
            layout={{ width: 80, height: 25, flexShrink: 0, minHeight: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', ...layout }}
        >
            <ThemeText
                text={captionMintlimitText ?? '100/1000'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', align: 'right' }}
            />
        </Region>
    );
};
