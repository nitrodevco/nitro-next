import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeText } from '#base/theme';

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
            params={1}
            caption={t('snowwar.exit.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 270, height: 163, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 12, width: 238, top: 12, height: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('snowwar.exit.confirmation')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 238, align: 'center' }}
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="no"
                    params={17}
                    onPointerTap={onNo}
                    layout={{ position: 'absolute', left: 8, width: 110, top: 80, height: 35, justifyContent: 'center' }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', width: 102, top: 8, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('snowwar.exit.no')} />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="yes"
                    params={17}
                    onPointerTap={onYes}
                    layout={{ position: 'absolute', left: 144, width: 110, top: 80, height: 35, justifyContent: 'center' }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 107, top: 8, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('snowwar.exit.yes')} />
                    </Region>
                </ContainerButton>
            </Region>
        </Frame>
    );
};
