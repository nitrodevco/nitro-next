import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `our_servers` of DiscordSettingsLayout - configured through the parent's `ourServers` prop. */
export interface DiscordSettingsLayoutOurServersProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onCollectiblesServer?: () => void;
    onOriginsServer?: () => void;
    onWiredServer?: () => void;
}

export const DiscordSettingsLayoutOurServers = ({ captionTitle, layout, onCollectiblesServer, onOriginsServer, onWiredServer }: DiscordSettingsLayoutOurServersProps) => {
    return (
        <Region
            name="our_servers"
            layout={{ position: 'absolute', left: 1, width: 375, top: 254, height: 222, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 15, width: 81, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? 'Our servers:'}
                    textStyle="text-style-il-regular-white"
                />
            </Region>
            <ContainerButton
                variant="107"
                name="collectibles_server"
                dynamicStyle="button"
                onPointerTap={onCollectiblesServer}
                layout={{ position: 'absolute', left: 5, width: 186, top: 30, height: 98 }}
            >
                <ThemeText
                    text="Collectibles"
                    textStyle="text-style-il-regular-white"
                    layout={{ position: 'absolute', left: 77, width: 79, top: 40, height: 18 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_icon_curator_stamp_large.png')}
                    layout={{ position: 'absolute', left: 22, width: 48, top: 26, height: 48 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="107"
                name="wired_server"
                dynamicStyle="button"
                onPointerTap={onWiredServer}
                layout={{ position: 'absolute', left: 185, width: 186, top: 30, height: 98 }}
            >
                <ThemeImage
                    src={layoutImage('discord_wired_logo.png')}
                    layout={{ position: 'absolute', left: 19, width: 155, top: 18, height: 67 }}
                />
                <ThemeText
                    text="The WiredFaculty"
                    textStyle="text-style-il-regular-white"
                    layout={{ position: 'absolute', left: 77, width: 66, top: 32, height: 33 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="107"
                name="origins_server"
                dynamicStyle="button"
                onPointerTap={onOriginsServer}
                layout={{ position: 'absolute', left: 5, width: 186, top: 116, height: 98 }}
            >
                <ThemeText
                    text="Habbo Hotel:Origins"
                    textStyle="text-style-il-regular-white"
                    layout={{ position: 'absolute', left: 77, width: 86, top: 31, height: 33 }}
                />
                <ThemeImage
                    src={layoutImage('discord_origins_logo.png')}
                    layout={{ position: 'absolute', left: 27, width: 38, top: 26, height: 47 }}
                />
            </ContainerButton>
        </Region>
    );
};
