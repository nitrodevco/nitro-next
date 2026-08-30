import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `extend_title` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutExtendTitleItemProps {
    captionExtendTitle?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutExtendTitleItem = ({ captionExtendTitle, layout }: ClubExtendConfirmationLayoutExtendTitleItemProps) => {
    return (
        <ThemeText
            text={captionExtendTitle ?? ''}
            textStyle="text-style-u-headline-big"
            textOptions={{ wordWrap: true, wordWrapWidth: 266 }}
            name="extend_title"
            verticalAlign="top"
            layout={{ width: 266, height: 14, flexShrink: 0, ...layout }}
        />
    );
};
