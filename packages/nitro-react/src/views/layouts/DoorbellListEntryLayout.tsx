import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `963_doorbell_list_entry_xml` (layout "list_entry", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DoorbellListEntryLayoutProps {
    layout?: BoxLayout;
}

export const DoorbellListEntryLayout = ({ layout }: DoorbellListEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                params={144}
                backgroundColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20 }}
            >
                <Region
                    name="user_name"
                    params={3088}
                    layout={{ position: 'absolute', left: 3, width: 58, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="username" />
                </Region>
                <Region
                    name="accept"
                    params={17}
                    layout={{ position: 'absolute', left: 155, width: 18, top: 4, height: 15 }}
                >
                    <Icon
                        variant="8"
                        params={16}
                        tintColor="#00bb00"
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    name="deny"
                    params={17}
                    layout={{ position: 'absolute', left: 180, width: 15, top: 4, height: 13 }}
                >
                    <Icon
                        variant="9"
                        params={16}
                        tintColor="#ff0000"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
