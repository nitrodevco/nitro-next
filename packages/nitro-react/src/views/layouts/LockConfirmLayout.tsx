import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `855_lock_confirm_xml` (layout "lock_confirm", 309x198) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LockConfirmLayoutProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onConfirmButton?: () => void;
}

export const LockConfirmLayout = ({ layout, onCancelButton, onClose, onConfirmButton }: LockConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={49153}
            caption={t('friend.furniture.confirm.lock.caption')}
            onClose={onClose}
            layout={{ width: 309, height: 198, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="top_list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 9, width: 290, top: 1, height: 163, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        name="subtitle"
                        params={786512}
                        layout={{ width: 249, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('friend.furniture.confirm.lock.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ wordWrap: true, wordWrapWidth: 249, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="other_locked_container"
                        params={16}
                        layout={{ width: 290, height: 65, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="lock"
                            params={16}
                            src="${image.library.url}furniextras/unlocked_image.png"
                            layout={{ position: 'absolute', left: 122, width: 44, top: 4, height: 44 }}
                        />
                        <Region
                            name="message"
                            params={1049616}
                            layout={{ position: 'absolute', left: 0, width: 291, top: 49, height: 24, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('friend.furniture.confirm.lock.other.locked')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 291, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('illumina_horizontal_separator.png')}
                        layout={{ width: 285, height: 2, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 288, height: 46, flexShrink: 0 }}
                    >
                        <Button
                            variant="101"
                            name="cancel_button"
                            params={131089}
                            tintColor="#bbbbbb"
                            onPointerTap={onCancelButton}
                            layout={{ position: 'absolute', left: 0, width: 140, top: -2, height: 48, maxWidth: 140 }}
                        >
                            {t('friend.furniture.confirm.lock.button.cancel')}
                        </Button>
                        <Button
                            variant="101"
                            name="confirm_button"
                            params={393297}
                            tintColor="#bbbbbb"
                            onPointerTap={onConfirmButton}
                            layout={{ position: 'absolute', left: 144, width: 140, top: -2, height: 48, maxWidth: 140 }}
                        >
                            {t('friend.furniture.confirm.lock.button.confirm')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
