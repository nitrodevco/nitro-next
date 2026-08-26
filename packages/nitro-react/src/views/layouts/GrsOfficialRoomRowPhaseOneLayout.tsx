import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3014_grs_official_room_row_phase_one_xml` (layout "grs_official_room_row_phase_one", 346x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowPhaseOneLayoutProps {
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowPhaseOneLayout = ({ layout }: GrsOfficialRoomRowPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 68, ...layout }}>
            <Region
                name="cont"
                params={17}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 346, top: 0, height: 68 }}
            >
                <Border
                    variant="1"
                    name="folder_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 43, width: 267, top: 2, height: 64 }}
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
                        layout={{ position: 'absolute', left: 0, width: 268, top: 0, height: 24 }}
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
                        layout={{ position: 'absolute', left: 215, width: 50, top: 35, height: 24 }}
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
                    layout={{ position: 'absolute', left: 43, width: 267, top: 2, height: 64 }}
                >
                    <ThemeImage
                        name="room_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 64 }}
                    />
                    <Border
                        variant="2"
                        name="picTextContainer"
                        params={16}
                        tintColor="#000000"
                        blend={0.8}
                        layout={{ position: 'absolute', left: 0, width: 267, top: 0, height: 24 }}
                    >
                        <Region
                            name="picText"
                            params={16}
                            layout={{ position: 'absolute', left: 8, width: 250, top: 5, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Lorengdf def fd df df df df dfdf d"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 250 }}
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
                        layout={{ position: 'absolute', left: 6, width: 255, top: 0, height: 64 }}
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
                    <Region
                        name="enter_room"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 267, top: 0, height: 64 }}
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
                            layout={{ position: 'absolute', left: 6, width: 255, top: 0, height: 64 }}
                        />
                        <ThemeImage
                            name="enter_room_r"
                            params={80}
                            src={undefined}
                            layout={{ position: 'absolute', left: 261, width: 6, top: 0, height: 64 }}
                        />
                        <ThemeImage
                            name="enter_room_a"
                            params={786640}
                            src={undefined}
                            layout={{ position: 'absolute', left: 109, width: 48, top: 0, height: 64 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="details_container"
                    params={144}
                    layout={{ position: 'absolute', left: 115, width: 190, top: 0, height: 66 }}
                >
                    <Region
                        name="entry_caption"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 190, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="PH Room Name: Neque porro quisquam est que" />
                    </Region>
                    <Region
                        name="entry_desc"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 190, top: 15, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
                            textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 190 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
