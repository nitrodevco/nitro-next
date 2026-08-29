import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `image_cont` of GrsOfficialRoomRowLayout - configured through the parent's `imageCont` prop. */
export interface GrsOfficialRoomRowLayoutImageContProps {
    captionPicText?: string;
    layout?: BoxLayout;
    srcEnterRoomA?: string;
    srcEnterRoomL?: string;
    srcEnterRoomM?: string;
    srcEnterRoomR?: string;
    srcRicoRndL?: string;
    srcRicoRndLB?: string;
    srcRicoRndM?: string;
    srcRicoRndR?: string;
    srcRicoRndRB?: string;
    srcRoomImage?: string;
    tintEnterRoomA?: string;
    tintEnterRoomL?: string;
    tintEnterRoomM?: string;
    tintEnterRoomR?: string;
    tintRicoRndL?: string;
    tintRicoRndLB?: string;
    tintRicoRndM?: string;
    tintRicoRndR?: string;
    tintRicoRndRB?: string;
    tintRoomImage?: string;
}

export const GrsOfficialRoomRowLayoutImageCont = ({ captionPicText, layout, srcEnterRoomA, srcEnterRoomL, srcEnterRoomM, srcEnterRoomR, srcRicoRndL, srcRicoRndLB, srcRicoRndM, srcRicoRndR, srcRicoRndRB, srcRoomImage, tintEnterRoomA, tintEnterRoomL, tintEnterRoomM, tintEnterRoomR, tintRicoRndL, tintRicoRndLB, tintRicoRndM, tintRicoRndR, tintRicoRndRB, tintRoomImage }: GrsOfficialRoomRowLayoutImageContProps) => {
    return (
        <Region
            name="image_cont"
            layout={{ position: 'absolute', left: 2, right: -5, top: 2, height: 64, ...layout }}
        >
            <ThemeImage
                name="room_image"
                src={srcRoomImage}
                tint={tintRoomImage}
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
                tint={tintRicoRndL}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_l_b"
                src={srcRicoRndLB}
                tint={tintRicoRndLB}
                layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_m"
                src={srcRicoRndM}
                tint={tintRicoRndM}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r"
                src={srcRicoRndR}
                tint={tintRicoRndR}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <ThemeImage
                name="rico_rnd_r_b"
                src={srcRicoRndRB}
                tint={tintRicoRndRB}
                layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
            />
            <Region
                name="enter_room"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 64, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="enter_room_l"
                    src={srcEnterRoomL}
                    tint={tintEnterRoomL}
                    layout={{ position: 'absolute', left: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="enter_room_m"
                    src={srcEnterRoomM}
                    tint={tintEnterRoomM}
                    layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="enter_room_r"
                    src={srcEnterRoomR}
                    tint={tintEnterRoomR}
                    layout={{ position: 'absolute', right: 0, width: 6, top: 0, height: 64 }}
                />
                <ThemeImage
                    name="enter_room_a"
                    src={srcEnterRoomA}
                    tint={tintEnterRoomA}
                    layout={{ position: 'absolute', width: 48, top: 0, height: 64 }}
                />
            </Region>
        </Region>
    );
};
