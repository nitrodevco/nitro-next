import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `txt_time_left` of TargetedOfferMinimizedLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferMinimizedLayoutTxtTimeLeftItemProps {
    captionTxtTimeLeft?: string;
    layout?: BoxLayout;
}

export const TargetedOfferMinimizedLayoutTxtTimeLeftItem = ({ captionTxtTimeLeft, layout }: TargetedOfferMinimizedLayoutTxtTimeLeftItemProps) => {
    return (
        <ThemeText
            text={captionTxtTimeLeft ?? ''}
            textStyle="text-style-il-regular-white"
            name="txt_time_left"
            layout={{ width: 138, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
