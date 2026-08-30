import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `message_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutMessageContainerItemProps {
    captionGiftMessage?: string;
    layout?: BoxLayout;
    visibleGiftMessage?: boolean;
}

export const PackagecardNewOpenedLayoutMessageContainerItem = ({ captionGiftMessage, layout, visibleGiftMessage }: PackagecardNewOpenedLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
            layout={{ width: 184, height: 81, flexShrink: 0, ...layout }}
        >
            {(visibleGiftMessage ?? true) && (
                <ThemeText
                    text={captionGiftMessage ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 184 }}
                    name="gift_message"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 4 }}
                />
            )}
        </Region>
    );
};
