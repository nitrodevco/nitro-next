import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1243_logout_confirmation_xml` (layout "logout_confirmation", 192x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LogoutConfirmationLayoutProps {
    layout?: BoxLayout;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export const LogoutConfirmationLayout = ({ layout, onCancel, onConfirm }: LogoutConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 90, ...layout }}>
            <Border
                variant="1"
                layout={{ position: 'absolute', right: 0, width: 192, top: 0, height: 90 }}
            >
                <Region layout={{ position: 'absolute', left: 11, width: 170, top: 9, height: 41, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('toolbar.logout.confirmation')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                    />
                </Region>
                <Button
                    variant="4"
                    name="confirm"
                    onPointerTap={onConfirm}
                    layout={{ position: 'absolute', left: 7, width: 85, top: 58, height: 25, minWidth: 85, maxWidth: 85, maxHeight: 25 }}
                >
                    {t('toolbar.logout.ok')}
                </Button>
                <Button
                    variant="4"
                    name="cancel"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 99, width: 85, top: 58, height: 25, minWidth: 85, maxWidth: 85, maxHeight: 25 }}
                >
                    {t('toolbar.logout.cancel')}
                </Button>
            </Border>
        </Region>
    );
};
