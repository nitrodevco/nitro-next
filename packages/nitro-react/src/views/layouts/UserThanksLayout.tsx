import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2891_user_thanks_xml` (layout "user_thanks", 282x192) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserThanksLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const UserThanksLayout = ({ layout, onClose, onCloseButton }: UserThanksLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_thanks"
            name="user_thanks"
            params={32769}
            caption={t('guide.help.request.user.thanks.title')}
            onClose={onClose}
            layout={{ width: 282, height: 192, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 260, top: 0, height: 107, minWidth: 260, maxWidth: 260, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 234, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.thanks.info.title')}
                            textStyle="text-style-il-heading-2"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 26, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.thanks.info.desc')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 260, height: 1, flexShrink: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_user_feedback.png')}
                            layout={{ position: 'absolute', left: 0, width: 60, top: -4, height: 94 }}
                        />
                    </Region>
                    <Button
                        variant="101"
                        name="close_button"
                        params={131089}
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ width: 266, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('guide.help.request.user.thanks.close.button')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
