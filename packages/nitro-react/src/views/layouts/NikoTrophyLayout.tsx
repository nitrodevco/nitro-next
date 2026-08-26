import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1102_niko_trophy_xml` (layout "niko_trophy", 428x325) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NikoTrophyLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onStoreLink?: () => void;
}

export const NikoTrophyLayout = ({ layout, onClose, onStoreLink }: NikoTrophyLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="niko.trophy"
            name="niko.trophy"
            params={33025}
            caption={t('niko.trophy.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 428, height: 325, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="nikotrophy.background"
                    params={16}
                    backgroundColor="#36494e"
                    layout={{ position: 'absolute', left: 0, width: 428, top: 0, height: 169 }}
                />
                <ThemeImage
                    name="preview_image"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 26, width: 93, top: 30, height: 112 }}
                />
                <Region
                    name="html_textbox"
                    params={1}
                    layout={{ position: 'absolute', left: 153, width: 249, top: 28, height: 64, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('niko.trophy.description.gold')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 249 }}
                    />
                </Region>
                <Region
                    name="store_link"
                    params={1}
                    layout={{ position: 'absolute', left: 153, width: 249, top: 97, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onStoreLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('niko.trophy.link.text')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="date"
                    params={1}
                    layout={{ position: 'absolute', left: 153, width: 249, top: 130, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('trophy.niko.date')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="appstore_region"
                    tooltip={t('trophy.niko.link.tooltip')}
                    params={17}
                    layout={{ position: 'absolute', left: 38, width: 346, top: 173, height: 110 }}
                >
                    <ThemeImage
                        name="store_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 15, width: 320, top: 10, height: 92 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
