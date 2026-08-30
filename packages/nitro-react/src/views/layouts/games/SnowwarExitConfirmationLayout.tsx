import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, ThemeText } from '#base/theme';

/** Generated from `332_snowwar_exit_confirmation_xml` (layout "snowwar_exit_confirmation", 270x163) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarExitConfirmationLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onNo?: () => void;
    onYes?: () => void;
}

export const SnowwarExitConfirmationLayout = ({ layout, onClose, onNo, onYes }: SnowwarExitConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('snowwar.exit.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 270, height: 163, minWidth: 270, minHeight: 163, ...layout }}
        >
            <ThemeText
                text={t('snowwar.exit.confirmation')}
                textOptions={{ wordWrap: true, wordWrapWidth: 238, align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, width: 238, top: 12, height: 18 }}
            />
            <ContainerButton
                variant="3"
                name="no"
                onPointerTap={onNo}
                layout={{ position: 'absolute', left: 8, width: 110, top: 80, height: 35, justifyContent: 'center' }}
            >
                {t('snowwar.exit.no')}
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="yes"
                onPointerTap={onYes}
                layout={{ position: 'absolute', left: 144, width: 110, top: 80, height: 35, justifyContent: 'center' }}
            >
                {t('snowwar.exit.yes')}
            </ContainerButton>
        </Frame>
    );
};
