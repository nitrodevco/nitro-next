import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `963_doorbell_list_entry_xml` (layout "list_entry", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DoorbellListEntryLayoutProps {
    accept?: DoorbellListEntryLayoutAcceptProps;
    captionUserName?: string;
    deny?: DoorbellListEntryLayoutDenyProps;
    layout?: BoxLayout;
}

export const DoorbellListEntryLayout = ({ accept, captionUserName, deny, layout }: DoorbellListEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                params={144}
                backgroundColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
            >
                <Region
                    name="user_name"
                    params={3088}
                    layout={{ position: 'absolute', left: 3, width: 58, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionUserName ?? 'username'} />
                </Region>
                <DoorbellListEntryLayoutAccept {...accept} />
                <DoorbellListEntryLayoutDeny {...deny} />
            </Region>
        </Region>
    );
};

/** Named region `accept` of DoorbellListEntryLayout - configured through the parent's `accept` prop. */
export interface DoorbellListEntryLayoutAcceptProps {
    layout?: BoxLayout;
    onAccept?: () => void;
}

export const DoorbellListEntryLayoutAccept = ({ layout, onAccept }: DoorbellListEntryLayoutAcceptProps) => {
    return (
        <Region
            name="accept"
            params={17}
            onPointerTap={onAccept}
            cursor="pointer"
            layout={{ position: 'absolute', left: 155, width: 18, top: 4, height: 15, ...layout }}
        >
            <Icon
                variant="8"
                params={16}
                tintColor="#00bb00"
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `deny` of DoorbellListEntryLayout - configured through the parent's `deny` prop. */
export interface DoorbellListEntryLayoutDenyProps {
    layout?: BoxLayout;
    onDeny?: () => void;
}

export const DoorbellListEntryLayoutDeny = ({ layout, onDeny }: DoorbellListEntryLayoutDenyProps) => {
    return (
        <Region
            name="deny"
            params={17}
            onPointerTap={onDeny}
            cursor="pointer"
            layout={{ position: 'absolute', left: 180, width: 15, top: 4, height: 13, ...layout }}
        >
            <Icon
                variant="9"
                params={16}
                tintColor="#ff0000"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
            />
        </Region>
    );
};
