import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `851_mystery_box_reward_xml` (layout "mystery_box_reward", 430x234) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxRewardLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const MysteryBoxRewardLayout = ({ layout, onClose, onCloseButton }: MysteryBoxRewardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={1}
            caption={t('mysterybox.reward.text')}
            onClose={onClose}
            layout={{ width: 430, height: 234, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 0, width: 428, top: 8, height: 185, flexDirection: 'column', gap: 4 }}
                >
                    <Region
                        params={208}
                        layout={{ width: 128, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('mysterybox.reward.title')} />
                    </Region>
                    <Region
                        name="bitmap_container"
                        params={208}
                        layout={{ width: 109, height: 109, flexShrink: 0, minWidth: 109, minHeight: 109 }}
                    >
                        <ThemeImage
                            params={3280}
                            src="${image.library.url}Quests/ach_receive_star.png"
                            layout={{ position: 'absolute', left: 0, width: 109, top: 0, height: 109 }}
                        />
                        <ThemeImage
                            name="reward_image"
                            params={3280}
                            src={undefined}
                            layout={{ position: 'absolute', left: 54, width: 1, top: 54, height: 1 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="close_button"
                        params={131281}
                        onPointerTap={onCloseButton}
                        layout={{ width: 175, height: 52, flexShrink: 0 }}
                    >
                        {t('mysterybox.reward.close')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
