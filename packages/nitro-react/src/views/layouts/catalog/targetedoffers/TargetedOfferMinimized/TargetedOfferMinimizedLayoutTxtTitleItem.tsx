import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `txt_title` of TargetedOfferMinimizedLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferMinimizedLayoutTxtTitleItemProps {
    captionTxtTitle?: string;
    layout?: BoxLayout;
}

export const TargetedOfferMinimizedLayoutTxtTitleItem = ({ captionTxtTitle, layout }: TargetedOfferMinimizedLayoutTxtTitleItemProps) => {
    return (
        <ThemeText
            text={captionTxtTitle ?? ''}
            textStyle="text-style-il-regular-white"
            textOptions={{ wordWrap: true, wordWrapWidth: 138 }}
            name="txt_title"
            verticalAlign="top"
            layout={{ width: 138, flexShrink: 0, maxWidth: 162, ...layout }}
        />
    );
};
