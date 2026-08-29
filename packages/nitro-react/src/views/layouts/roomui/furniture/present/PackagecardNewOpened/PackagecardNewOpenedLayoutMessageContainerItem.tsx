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
                <Region
                    name="gift_message"
                    layout={{ position: 'absolute', left: 0, width: 184, top: 20, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGiftMessage ?? ''}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 184 }}
                    />
                </Region>
            )}
        </Region>
    );
};
