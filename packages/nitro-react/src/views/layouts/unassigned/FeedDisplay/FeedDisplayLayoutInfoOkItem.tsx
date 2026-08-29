import { BoxLayout, ContainerButton, ThemeText } from '#base/theme';

/** Row template `info_ok` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutInfoOkItemProps {
    captionFeedInfoOkText?: string;
    layout?: BoxLayout;
    onInfoOk?: () => void;
}

export const FeedDisplayLayoutInfoOkItem = ({ captionFeedInfoOkText, layout, onInfoOk }: FeedDisplayLayoutInfoOkItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="info_ok"
            tintColor="#00aa00"
            onPointerTap={onInfoOk}
            layout={{ width: 150, height: 36, flexShrink: 0, minWidth: 150, maxWidth: 150, ...layout }}
        >
            <ThemeText
                text={captionFeedInfoOkText ?? '_info_ok'}
                textOptions={{ fill: '#ffffff', align: 'center' }}
            />
        </ContainerButton>
    );
};
