import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Named region `pane_settings` of FeedDisplayLayout - configured through the parent's `paneSettings` prop. */
export interface FeedDisplayLayoutPaneSettingsProps {
    layout?: BoxLayout;
    visiblePaneSettings?: boolean;
}

export const FeedDisplayLayoutPaneSettings = ({ layout, visiblePaneSettings }: FeedDisplayLayoutPaneSettingsProps) => {
    return (
        (visiblePaneSettings ?? false) && (
            <Region
                name="pane_settings"
                layout={{ position: 'absolute', left: 0, right: 0, top: 25, bottom: 2, ...layout }}
            >
                <Border
                    variant="3"
                    name="modal_overlay"
                    tintColor="#000000"
                    blend={0.6}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -2 }}
                />
                <Border
                    variant="3"
                    name="item_list_border"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 220 }}
                />
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 252, flexDirection: 'column' }}>
                    <Region
                        name="settings_all"
                        layout={{ width: 260, height: 50, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="_show_all"
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Icon
                            variant="8"
                            name="selected"
                            layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                        />
                    </Region>
                    <Region
                        name="settings_friends"
                        layout={{ width: 260, height: 50, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="_show_friends"
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Icon
                            variant="8"
                            name="selected"
                            layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                        />
                    </Region>
                    <Region
                        name="settings_me"
                        layout={{ width: 260, height: 50, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="_show_me"
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Icon
                            variant="8"
                            name="selected"
                            layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                        />
                    </Region>
                    <Region
                        name="settings_hotel"
                        layout={{ width: 260, height: 50, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="_show_hotel"
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Icon
                            variant="8"
                            name="selected"
                            layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                        />
                    </Region>
                </Region>
            </Region>
        )
    );
};
