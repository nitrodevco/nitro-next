import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `extend_title` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutExtendTitleItemProps {
    captionExtendTitle?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutExtendTitleItem = ({ captionExtendTitle, layout }: ClubExtendConfirmationLayoutExtendTitleItemProps) => {
    return (
        <Region
            name="extend_title"
            layout={{ width: 266, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExtendTitle ?? ''}
                textStyle="text-style-u-headline-big"
                textOptions={{ wordWrap: true, wordWrapWidth: 266 }}
            />
        </Region>
    );
};
