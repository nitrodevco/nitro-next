import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3084_grs_official_room_row_xml` (layout "grs_official_room_row", 271x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowLayoutProps {
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowLayout = ({ layout }: GrsOfficialRoomRowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 68, ...layout }}>
            <Region
                name="cont"
                params={17}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 68 }}
            >
                <Border
                    variant="1"
                    name="folder_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 2, width: 267, top: 2, height: 64 }}
                >
                    <ThemeImage
                        name="folder_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 10 }}
                    />
                    <Border
                        variant="2"
                        name="folderNameContainer"
                        params={16}
                        tintColor="#000000"
                        blend={0.8}
                        layout={{ position: 'absolute', left: 5, width: 263, top: 5, height: 24 }}
                    >
                        <Region
                            name="folder_name_text"
                            params={16}
                            layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                    </Border>
                    <Border
                        variant="2"
                        name="arrowContainer"
                        params={262160}
                        tintColor="#000000"
                        blend={0.8}
                        layout={{ position: 'absolute', left: 215, width: 50, top: 5, height: 24 }}
                    >
                        <Region
                            name="arrow_label"
                            params={4194320}
                            layout={{ position: 'absolute', left: 5, width: 29, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="show"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <ThemeImage
                            name="arrow_down_white"
                            params={80}
                            src={undefined}
                            layout={{ position: 'absolute', left: 36, width: 6, top: 9, height: 64 }}
                        />
                        <ThemeImage
                            name="arrow_right_white"
                            params={80}
                            src={undefined}
                            layout={{ position: 'absolute', left: 39, width: 6, top: 6, height: 64 }}
                        />
                    </Border>
                    <ThemeImage
                        name="rico_rnd_l"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_l_b"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_m"
                        params={144}
                        src={undefined}
                        layout={{ position: 'absolute', left: 6, width: 262, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_r"
                        params={80}
                        src={undefined}
                        layout={{ position: 'absolute', left: 261, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_r_b"
                        params={80}
                        src={undefined}
                        layout={{ position: 'absolute', left: 261, width: 6, top: 0, height: 64 }}
                    />
                </Border>
                <Region
                    name="image_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 2, width: 274, top: 2, height: 64 }}
                >
                    <ThemeImage
                        name="room_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 64 }}
                    />
                    <Border
                        variant="2"
                        name="picTextContainer"
                        params={16}
                        tintColor="#000000"
                        blend={0.8}
                        layout={{ position: 'absolute', left: 5, width: 263, top: 36, height: 24 }}
                    >
                        <Region
                            name="picText"
                            params={16}
                            layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Lorengdf def fd df df df df dfdf d"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 246 }}
                            />
                        </Region>
                    </Border>
                    <ThemeImage
                        name="rico_rnd_l"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_l_b"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_m"
                        params={144}
                        src={undefined}
                        layout={{ position: 'absolute', left: 6, width: 262, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_r"
                        params={80}
                        src={undefined}
                        layout={{ position: 'absolute', left: 268, width: 6, top: 0, height: 64 }}
                    />
                    <ThemeImage
                        name="rico_rnd_r_b"
                        params={80}
                        src={undefined}
                        layout={{ position: 'absolute', left: 268, width: 6, top: 0, height: 64 }}
                    />
                    <Region
                        name="enter_room"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 64 }}
                    >
                        <ThemeImage
                            name="enter_room_l"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                        />
                        <ThemeImage
                            name="enter_room_m"
                            params={144}
                            src={undefined}
                            layout={{ position: 'absolute', left: 6, width: 262, top: 0, height: 64 }}
                        />
                        <ThemeImage
                            name="enter_room_r"
                            params={80}
                            src={undefined}
                            layout={{ position: 'absolute', left: 268, width: 6, top: 0, height: 64 }}
                        />
                        <ThemeImage
                            name="enter_room_a"
                            params={786640}
                            src={undefined}
                            layout={{ position: 'absolute', left: 113, width: 48, top: 0, height: 64 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="details_container"
                    params={144}
                    layout={{ position: 'absolute', left: 75, width: 195, top: 0, height: 66 }}
                >
                    <Region
                        name="entry_caption"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 195, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="PH Room Name: Neque porro quisquam est que" />
                    </Region>
                    <Region
                        name="entry_desc"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 195, top: 15, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
                            textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 195 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
