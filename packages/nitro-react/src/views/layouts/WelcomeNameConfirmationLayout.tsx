import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `2893_welcome_name_confirmation_xml` (layout "newuser_change_name", 303x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeNameConfirmationLayoutProps {
    layout?: BoxLayout;
    onCancelConfirmationButton?: () => void;
    onConfirmNameButton?: () => void;
}

export const WelcomeNameConfirmationLayout = ({ layout, onCancelConfirmationButton, onConfirmNameButton }: WelcomeNameConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 303, height: 193, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 193 }}
            >
                <Region
                    name="info_text"
                    params={16}
                    layout={{ position: 'absolute', left: 47, width: 205, top: 29, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('tutorial.name_change.info.confirm')}
                        textStyle="text-style-il-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    />
                </Region>
                <Region
                    name="confirm_text"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 285, top: 78, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('tutorial.name_change.confirm')}
                        textStyle="text-style-il-regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="final_name"
                    params={16}
                    layout={{ position: 'absolute', left: 47, width: 205, top: 105, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text="final_name"
                        textStyle="text-style-il-regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="confirm_name_button"
                    params={131089}
                    tintColor="#bbbbbb"
                    onPointerTap={onConfirmNameButton}
                    layout={{ position: 'absolute', left: 22, width: 120, top: 136, height: 43, minWidth: 120, maxWidth: 120 }}
                >
                    {t('generic.ok')}
                </Button>
                <Button
                    variant="3"
                    name="cancel_confirmation_button"
                    params={393233}
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelConfirmationButton}
                    layout={{ position: 'absolute', left: 162, width: 120, top: 136, height: 43, minWidth: 120, maxWidth: 120 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Region>
        </Region>
    );
};
