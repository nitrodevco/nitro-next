import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `2893_welcome_name_confirmation_xml` (layout "newuser_change_name", 303x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeNameConfirmationLayoutProps {
    captionConfirmText?: string;
    captionFinalName?: string;
    captionInfoText?: string;
    layout?: BoxLayout;
    onCancelConfirmationButton?: () => void;
    onConfirmNameButton?: () => void;
}

export const WelcomeNameConfirmationLayout = ({ captionConfirmText, captionFinalName, captionInfoText, layout, onCancelConfirmationButton, onConfirmNameButton }: WelcomeNameConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 303, height: 193, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 205, top: 29, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('tutorial.name_change.info.confirm')}
                        textStyle="text-style-il-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    />
                </Region>
                <Region
                    name="confirm_text"
                    layout={{ position: 'absolute', left: 8, right: 10, top: 78, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionConfirmText ?? t('tutorial.name_change.confirm')}
                        textStyle="text-style-il-regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="final_name"
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 205, top: 105, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionFinalName ?? 'final_name'}
                        textStyle="text-style-il-regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="confirm_name_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onConfirmNameButton}
                    layout={{ position: 'absolute', left: 22, width: 120, top: 136, height: 43, minWidth: 120, maxWidth: 120 }}
                >
                    {t('generic.ok')}
                </Button>
                <Button
                    variant="3"
                    name="cancel_confirmation_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelConfirmationButton}
                    layout={{ position: 'absolute', right: 21, width: 120, top: 136, height: 43, minWidth: 120, maxWidth: 120 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Region>
        </Region>
    );
};
