import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3014_grs_official_room_row_phase_one_xml` (layout "grs_official_room_row_phase_one", 346x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowPhaseOneLayoutProps {
    cont?: GrsOfficialRoomRowPhaseOneLayoutContProps;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowPhaseOneLayout = ({ cont, layout }: GrsOfficialRoomRowPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 68, ...layout }}>
            <GrsOfficialRoomRowPhaseOneLayoutCont {...cont} />
        </Region>
    );
};

/** Named region `enter_room` of GrsOfficialRoomRowPhaseOneLayout - configured through the parent's `enterRoom` prop. */
export interface GrsOfficialRoomRowPhaseOneLayoutEnterRoomProps {
    layout?: BoxLayout;
    srcEnterRoomA?: string;
    srcEnterRoomL?: string;
    srcEnterRoomM?: string;
    srcEnterRoomR?: string;
}

export const GrsOfficialRoomRowPhaseOneLayoutEnterRoom = ({ layout, srcEnterRoomA, srcEnterRoomL, srcEnterRoomM, srcEnterRoomR }: GrsOfficialRoomRowPhaseOneLayoutEnterRoomProps) => {
    return (
        <Region
            name="enter_room"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 64, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="enter_room_l"
                params={16}
                src={srcEnterRoomL}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_m"
                params={144}
                src={srcEnterRoomM}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_r"
                params={80}
                src={srcEnterRoomR}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="enter_room_a"
                params={786640}
                src={srcEnterRoomA}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 48, top: 0, height: 64 }}
            />
        </Region>
    );
};

/** Named region `image_cont` of GrsOfficialRoomRowPhaseOneLayout - configured through the parent's `imageCont` prop. */
export interface GrsOfficialRoomRowPhaseOneLayoutImageContProps {
    captionPicText?: string;
    enterRoom?: GrsOfficialRoomRowPhaseOneLayoutEnterRoomProps;
    layout?: BoxLayout;
    srcRicoRndL?: string;
    srcRicoRndLB?: string;
    srcRicoRndM?: string;
    srcRicoRndR?: string;
    srcRicoRndRB?: string;
    srcRoomImage?: string;
}

export const GrsOfficialRoomRowPhaseOneLayoutImageCont = ({ captionPicText, enterRoom, layout, srcRicoRndL, srcRicoRndLB, srcRicoRndM, srcRicoRndR, srcRicoRndRB, srcRoomImage }: GrsOfficialRoomRowPhaseOneLayoutImageContProps) => {
    return (
        <Region
            name="image_cont"
            params={144}
            layout={{ position: 'absolute', left: 43, right: 36, top: 2, height: 64, ...layout }}
        >
            <ThemeImage
                name="room_image"
                params={16}
                src={srcRoomImage}
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
                        text={captionPicText ?? 'Lorengdf def fd df df df df dfdf d'}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 250 }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="rico_rnd_l"
                params={16}
                src={srcRicoRndL}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_l_b"
                params={16}
                src={srcRicoRndLB}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_m"
                params={144}
                src={srcRicoRndM}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r"
                params={80}
                src={srcRicoRndR}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r_b"
                params={80}
                src={srcRicoRndRB}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <GrsOfficialRoomRowPhaseOneLayoutEnterRoom {...enterRoom} />
        </Region>
    );
};

/** Named region `details_container` of GrsOfficialRoomRowPhaseOneLayout - configured through the parent's `detailsContainer` prop. */
export interface GrsOfficialRoomRowPhaseOneLayoutDetailsContainerProps {
    captionEntryCaption?: string;
    captionEntryDesc?: string;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowPhaseOneLayoutDetailsContainer = ({ captionEntryCaption, captionEntryDesc, layout }: GrsOfficialRoomRowPhaseOneLayoutDetailsContainerProps) => {
    return (
        <Region
            name="details_container"
            params={144}
            layout={{ position: 'absolute', left: 115, right: 41, top: 0, height: 66, ...layout }}
        >
            <Region
                name="entry_caption"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionEntryCaption ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <Region
                name="entry_desc"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEntryDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 190 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `cont` of GrsOfficialRoomRowPhaseOneLayout - configured through the parent's `cont` prop. */
export interface GrsOfficialRoomRowPhaseOneLayoutContProps {
    captionArrowLabel?: string;
    captionFolderNameText?: string;
    detailsContainer?: GrsOfficialRoomRowPhaseOneLayoutDetailsContainerProps;
    imageCont?: GrsOfficialRoomRowPhaseOneLayoutImageContProps;
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

export const GrsOfficialRoomRowPhaseOneLayoutCont = ({ captionArrowLabel, captionFolderNameText, detailsContainer, imageCont, layout, onCont, srcArrowDownWhite, srcArrowRightWhite, srcFolderImage, srcRicoRndL, srcRicoRndLB, srcRicoRndM, srcRicoRndR, srcRicoRndRB }: GrsOfficialRoomRowPhaseOneLayoutContProps) => {
    return (
        <Region
            name="cont"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 346, top: 0, height: 68, ...layout }}
        >
            <Border
                variant="1"
                name="folder_cont"
                params={144}
                layout={{ position: 'absolute', left: 43, right: 36, top: 2, height: 64 }}
            >
                <ThemeImage
                    name="folder_image"
                    params={16}
                    src={srcFolderImage}
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
                    params={262160}
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', right: 2, width: 50, top: 35, height: 24 }}
                >
                    <Region
                        name="arrow_label"
                        params={4194320}
                        layout={{ position: 'absolute', left: 5, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionArrowLabel ?? 'show'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="arrow_down_white"
                        params={80}
                        src={srcArrowDownWhite}
                        layout={{ position: 'absolute', right: 8, width: 6, top: 9, height: 64 }}
                    />
                    <ThemeImage
                        name="arrow_right_white"
                        params={80}
                        src={srcArrowRightWhite}
                        layout={{ position: 'absolute', right: 5, width: 6, top: 6, height: 64 }}
                    />
                </Border>
                <ThemeImage
                    name="rico_rnd_l"
                    params={16}
                    src={srcRicoRndL}
                    layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_l_b"
                    params={16}
                    src={srcRicoRndLB}
                    layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_m"
                    params={144}
                    src={srcRicoRndM}
                    layout={{ position: 'absolute', left: 6, right: -1, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_r"
                    params={80}
                    src={srcRicoRndR}
                    layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="rico_rnd_r_b"
                    params={80}
                    src={srcRicoRndRB}
                    layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
                />
            </Border>
            <GrsOfficialRoomRowPhaseOneLayoutImageCont {...imageCont} />
            <GrsOfficialRoomRowPhaseOneLayoutDetailsContainer {...detailsContainer} />
        </Region>
    );
};
