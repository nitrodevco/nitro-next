import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2892_welcome_name_change_xml` (layout "name_change", 315x225) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeNameChangeLayoutProps {
    layout?: BoxLayout;
    onChangeNameButton?: () => void;
    onClose?: () => void;
    onKeepNameButton?: () => void;
}

export const WelcomeNameChangeLayout = ({ layout, onChangeNameButton, onClose, onKeepNameButton }: WelcomeNameChangeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('tutorial.name_change.title.main')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 315, height: 225, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 190 }}>
                    <Region layout={{ position: 'absolute', left: 6, width: 290, top: 21, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('tutorial.name_change.info.main')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 290 }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 8, width: 289, top: 96, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('tutorial.name_change.current')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <ContainerButton
                        variant="3"
                        name="change_name_button"
                        onPointerTap={onChangeNameButton}
                        layout={{ position: 'absolute', left: 4, width: 142, top: 124, height: 66 }}
                    >
                        <Region layout={{ position: 'absolute', left: 12, width: 118, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('tutorial.name_change.change')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 118, align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="keep_name_button"
                        onPointerTap={onKeepNameButton}
                        layout={{ position: 'absolute', left: 155, width: 142, top: 124, height: 66 }}
                    >
                        <Region layout={{ position: 'absolute', left: 12, width: 108, alignSelf: 'center', height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('tutorial.name_change.keep')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 108, align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                </Region>
            </Region>
        </Frame>
    );
};
