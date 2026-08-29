import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2952_motd_notification_item_xml` (layout "achievement_notification", 405x95) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MotdNotificationItemLayoutProps {
    itemContainer?: MotdNotificationItemLayoutItemContainerProps;
    layout?: BoxLayout;
}

export const MotdNotificationItemLayout = ({ itemContainer, layout }: MotdNotificationItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 405, height: 95, ...layout }}>
            <MotdNotificationItemLayoutItemContainer {...itemContainer} />
        </Region>
    );
};

/** Named region `item_container` of MotdNotificationItemLayout - configured through the parent's `itemContainer` prop. */
export interface MotdNotificationItemLayoutItemContainerProps {
    captionMessageText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MotdNotificationItemLayoutItemContainer = ({ captionMessageText, layout, tags }: MotdNotificationItemLayoutItemContainerProps) => {
    return (
        <Region
            name="item_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 405, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="message_text"
                layout={{ position: 'absolute', left: 5, width: 395, top: 5, bottom: 5, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessageText ?? ''}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 395 }}
                />
            </Region>
        </Region>
    );
};
