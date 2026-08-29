import { BoxLayout, Icon, Region } from '#base/theme';

/** Generated from `963_doorbell_list_entry_xml` (layout "list_entry", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DoorbellListEntryLayoutProps {
    captionUserName?: string;
    layout?: BoxLayout;
    onAccept?: () => void;
    onDeny?: () => void;
}

export const DoorbellListEntryLayout = ({ captionUserName, layout, onAccept, onDeny }: DoorbellListEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                backgroundColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="user_name"
                    layout={{ position: 'absolute', left: 3, width: 58, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionUserName ?? 'username'}
                </Region>
                <Region
                    name="accept"
                    onPointerTap={onAccept}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 155, width: 18, top: 4, height: 15 }}
                >
                    <Icon
                        variant="8"
                        tintColor="#00bb00"
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    name="deny"
                    onPointerTap={onDeny}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 180, width: 15, top: 4, height: 13 }}
                >
                    <Icon
                        variant="9"
                        tintColor="#ff0000"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
