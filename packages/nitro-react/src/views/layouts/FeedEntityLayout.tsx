import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2983_feed_entity_xml` (layout "feed_entity", 229x172) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedEntityLayoutProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const FeedEntityLayout = ({ layout, onActionButton }: FeedEntityLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 172, ...layout }}>
            <Border
                variant="3"
                name="item"
                params={16528}
                tintColor="#f9f9f9"
                layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 172 }}
            >
                <ThemeImage
                    name="icon"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 4, width: 50, top: 5, height: 60 }}
                />
                <Region
                    name="content_list"
                    params={8538256}
                    layout={{ position: 'absolute', left: 50, width: 178, top: 4, height: 162, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="title"
                        params={8405136}
                        layout={{ width: 170, height: 28, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="001_lorem_idflgkjdl%20fkgjdf%20gdf%20gdfd%F6%20lgk%F6lkfggd%20"
                            textStyle="text-style-u-bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                        />
                    </Region>
                    <Region
                        name="time"
                        params={1168}
                        layout={{ width: 100, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="_time"
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#999999' }}
                        />
                    </Region>
                    <Region
                        name="message"
                        params={8388752}
                        layout={{ width: 168, height: 40, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="_multiline message, whoop whoop whoop whoop whoop whoop dfgdfg dfgdfg dfgdf"
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 168 }}
                        />
                    </Region>
                    <ThemeImage
                        name="decoration"
                        params={8388624}
                        src={undefined}
                        layout={{ width: 178, height: 40, flexShrink: 0 }}
                    />
                    <Button
                        variant="3"
                        name="action_button"
                        params={8536081}
                        onPointerTap={onActionButton}
                        layout={{ width: 65, height: 22, flexShrink: 0 }}
                    >
                        _button
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
