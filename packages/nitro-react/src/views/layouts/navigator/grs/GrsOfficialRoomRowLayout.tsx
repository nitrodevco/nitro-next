import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3084_grs_official_room_row_xml` (layout "grs_official_room_row", 271x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowLayoutProps {
    cont?: GrsOfficialRoomRowLayoutContProps;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowLayout = ({ cont, layout }: GrsOfficialRoomRowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 68, ...layout }}>
            <GrsOfficialRoomRowLayoutCont {...cont} />
        </Region>
    );
};

/** Named region `enter_room` of GrsOfficialRoomRowLayout - configured through the parent's `enterRoom` prop. */
export interface GrsOfficialRoomRowLayoutEnterRoomProps {
    layout?: BoxLayout;
    srcEnterRoomA?: string;
    srcEnterRoomL?: string;
    srcEnterRoomM?: string;
    srcEnterRoomR?: string;
}

export const GrsOfficialRoomRowLayoutEnterRoom = ({ layout, srcEnterRoomA, srcEnterRoomL, srcEnterRoomM, srcEnterRoomR }: GrsOfficialRoomRowLayoutEnterRoomProps) => {
    return (
        <Region
            name="enter_room"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 64, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="enter_room_l"
                src={srcEnterRoomL}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_m"
                src={srcEnterRoomM}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_r"
                src={srcEnterRoomR}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_a"
                src={srcEnterRoomA}
                layout={{ position: 'absolute', width: 48, top: 0, height: 64 }}
            />
        </Region>
    );
};

/** Named region `image_cont` of GrsOfficialRoomRowLayout - configured through the parent's `imageCont` prop. */
export interface GrsOfficialRoomRowLayoutImageContProps {
    captionPicText?: string;
    enterRoom?: GrsOfficialRoomRowLayoutEnterRoomProps;
    layout?: BoxLayout;
    srcRicoRndL?: string;
    srcRicoRndLB?: string;
    srcRicoRndM?: string;
    srcRicoRndR?: string;
    srcRicoRndRB?: string;
    srcRoomImage?: string;
}

export const GrsOfficialRoomRowLayoutImageCont = ({ captionPicText, enterRoom, layout, srcRicoRndL, srcRicoRndLB, srcRicoRndM, srcRicoRndR, srcRicoRndRB, srcRoomImage }: GrsOfficialRoomRowLayoutImageContProps) => {
    return (
        <Region
            name="image_cont"
            layout={{ position: 'absolute', left: 2, right: -5, top: 2, height: 64, ...layout }}
        >
            <ThemeImage
                name="room_image"
                src={srcRoomImage}
                layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 64 }}
            />
            <Border
                variant="2"
                name="picTextContainer"
                tintColor="#000000"
                blend={0.8}
                layout={{ position: 'absolute', left: 5, width: 263, top: 36, height: 24 }}
            >
                <Region
                    name="picText"
                    layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPicText ?? 'Lorengdf def fd df df df df dfdf d'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 246 }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="rico_rnd_l"
                src={srcRicoRndL}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_l_b"
                src={srcRicoRndLB}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_m"
                src={srcRicoRndM}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r"
                src={srcRicoRndR}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r_b"
                src={srcRicoRndRB}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <GrsOfficialRoomRowLayoutEnterRoom {...enterRoom} />
        </Region>
    );
};

/** Named region `details_container` of GrsOfficialRoomRowLayout - configured through the parent's `detailsContainer` prop. */
export interface GrsOfficialRoomRowLayoutDetailsContainerProps {
    captionEntryCaption?: string;
    captionEntryDesc?: string;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowLayoutDetailsContainer = ({ captionEntryCaption, captionEntryDesc, layout }: GrsOfficialRoomRowLayoutDetailsContainerProps) => {
    return (
        <Region
            name="details_container"
            layout={{ position: 'absolute', left: 75, right: 1, top: 0, height: 66, ...layout }}
        >
            <Region
                name="entry_caption"
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionEntryCaption ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <Region
                name="entry_desc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEntryDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 195 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `cont` of GrsOfficialRoomRowLayout - configured through the parent's `cont` prop. */
export interface GrsOfficialRoomRowLayoutContProps {
    captionArrowLabel?: string;
    captionFolderNameText?: string;
    detailsContainer?: GrsOfficialRoomRowLayoutDetailsContainerProps;
    imageCont?: GrsOfficialRoomRowLayoutImageContProps;
    layout?: BoxLayout;
    onCont?: () => void;
    srcArrowDownWhite?: string;
    srcArrowRightWhite?: string;
    srcFolderImage?: string;
    srcRicoRndL?: string;
    srcRicoRndLB?: string;
    srcRicoRndM?: string;
    srcRicoRndR?: string;
    srcRicoRndRB?: string;
}

export const GrsOfficialRoomRowLayoutCont = ({ captionArrowLabel, captionFolderNameText, detailsContainer, imageCont, layout, onCont, srcArrowDownWhite, srcArrowRightWhite, srcFolderImage, srcRicoRndL, srcRicoRndLB, srcRicoRndM, srcRicoRndR, srcRicoRndRB }: GrsOfficialRoomRowLayoutContProps) => {
    return (
        <Region
            name="cont"
            backgroundColor="#ffffff"
            onPointerTap={onCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 68, ...layout }}
        >
            <Border
                variant="1"
                name="folder_cont"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 64 }}
            >
                <ThemeImage
                    name="folder_image"
                    src={srcFolderImage}
                    layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 10 }}
                />
                <Border
                    variant="2"
                    name="folderNameContainer"
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 5, width: 263, top: 5, height: 24 }}
                >
                    <Region
                        name="folder_name_text"
                        layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFolderNameText ?? ''}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 246 }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="arrowContainer"
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', right: 2, width: 50, top: 5, height: 24 }}
                >
                    <Region
                        name="arrow_label"
                        layout={{ position: 'absolute', left: 5, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionArrowLabel ?? 'show'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="arrow_down_white"
                        src={srcArrowDownWhite}
                        layout={{ position: 'absolute', right: 8, width: 6, top: 9, height: 64 }}
                    />
                    <ThemeImage
                        name="arrow_right_white"
                        src={srcArrowRightWhite}
                        layout={{ position: 'absolute', right: 5, width: 6, top: 6, height: 64 }}
                    />
                </Border>
                <ThemeImage
                    name="rico_rnd_l"
                    src={srcRicoRndL}
                    layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_l_b"
                    src={srcRicoRndLB}
                    layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_m"
                    src={srcRicoRndM}
                    layout={{ position: 'absolute', left: 6, right: -1, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_r"
                    src={srcRicoRndR}
                    layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_r_b"
                    src={srcRicoRndRB}
                    layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
                />
            </Border>
            <GrsOfficialRoomRowLayoutImageCont {...imageCont} />
            <GrsOfficialRoomRowLayoutDetailsContainer {...detailsContainer} />
        </Region>
    );
};
