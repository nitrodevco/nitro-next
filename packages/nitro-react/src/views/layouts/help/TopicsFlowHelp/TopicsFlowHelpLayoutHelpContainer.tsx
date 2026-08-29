import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `help_container` of TopicsFlowHelpLayout - configured through the parent's `helpContainer` prop. */
export interface TopicsFlowHelpLayoutHelpContainerProps {
    layout?: BoxLayout;
    onHabbowayLink?: () => void;
    onInstructionsButton?: () => void;
    onSafetybookletLink?: () => void;
}

export const TopicsFlowHelpLayoutHelpContainer = ({ layout, onHabbowayLink, onInstructionsButton, onSafetybookletLink }: TopicsFlowHelpLayoutHelpContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help_container"
            layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_help_duck.png')}
                layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
            />
            <Region layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.self.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.frame.title')}
                    textStyle="text-style-u-headline-big"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}>
                <ContainerButton
                    variant="6"
                    name="instructions_button"
                    tintColor="#00aa00"
                    onPointerTap={onInstructionsButton}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <ThemeText
                        text={t('help.main2.tour.subtitle')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="6"
                    name="safetybooklet_link"
                    tintColor="#00aa00"
                    onPointerTap={onSafetybookletLink}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <ThemeText
                        text={t('help.main.button.self_help')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="6"
                    name="habboway_link"
                    tintColor="#00aa00"
                    onPointerTap={onHabbowayLink}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <ThemeText
                        text={t('help.main2.habboway.button')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};
