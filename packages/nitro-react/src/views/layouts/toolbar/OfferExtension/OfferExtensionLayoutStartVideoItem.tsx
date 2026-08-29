import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `start_video` of OfferExtensionLayout - pass real rows through its `items…` slot. */
export interface OfferExtensionLayoutStartVideoItemProps {
    layout?: BoxLayout;
    onStartVideo?: () => void;
    visibleStartVideo?: boolean;
}

export const OfferExtensionLayoutStartVideoItem = ({ layout, onStartVideo, visibleStartVideo }: OfferExtensionLayoutStartVideoItemProps) => {
    const t = useTranslation();

    return (
        (visibleStartVideo ?? false) && (
            <ContainerButton
                variant="5"
                name="start_video"
                tintColor="#c55541"
                onPointerTap={onStartVideo}
                layout={{ width: 180, height: 35, flexShrink: 0, ...layout }}
            >
                <Region layout={{ position: 'absolute', right: 33, width: 140, top: 7, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('offers.extension.start_video')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    src={layoutImage('common_offers_icon.png')}
                    layout={{ position: 'absolute', left: 151, width: 20, top: 7, height: 21 }}
                />
            </ContainerButton>
        )
    );
};
