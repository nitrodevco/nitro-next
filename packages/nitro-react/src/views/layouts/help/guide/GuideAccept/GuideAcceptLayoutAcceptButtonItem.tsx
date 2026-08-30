import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `accept_button` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutAcceptButtonItemProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
}

export const GuideAcceptLayoutAcceptButtonItem = ({ layout, onAcceptButton }: GuideAcceptLayoutAcceptButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="101"
            name="accept_button"
            tintColor="#bbbbbb"
            onPointerTap={onAcceptButton}
            layout={{ width: 200, height: 48, flexShrink: 0, maxWidth: 200, minHeight: 48, maxHeight: 48, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, top: 11, maxWidth: 200, flexDirection: 'row', gap: 5 }}>
                <ThemeImage
                    src={layoutImage('help_accept_icon.png')}
                    layout={{ width: 11, height: 12, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('guide.help.request.guide.accept.accept.button')}
                    textStyle="text-style-il-button"
                    layout={{ width: 244, height: 15, flexShrink: 0 }}
                />
            </Region>
        </ContainerButton>
    );
};
