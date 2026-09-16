import { useTranslation } from '#base/context';
import { Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureMysteryBoxRewardViewProps {
    /** What came out, already resolved to a name by whoever knows the class id. */
    rewardName: string;
    onClose: () => void;
}

/**
 * What the box held, on the `mystery_box_reward` layout (430x234). Flash drew the prize itself
 * in the middle; the star it sat on comes from the external image host, and the furni image
 * needs an icon the room does not have to hand, so the prize is named rather than drawn.
 */
export const FurnitureMysteryBoxRewardView = ({ rewardName, onClose }: FurnitureMysteryBoxRewardViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="furniture-mystery-box-reward"
            caption={t('mysterybox.reward.text')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onClose}
            defaultPosition={{ x: 140, y: 90 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 430, height: 234 }}
        >
            <Box layout={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ThemeText
                    text={t('mysterybox.reward.title')}
                    textStyle="text-style-il-heading-2"
                />
                <ThemeText
                    text={rewardName}
                    textStyle="text-style-bold"
                    textOptions={{ align: 'center', wordWrap: true, wordWrapWidth: 380 }}
                />
                <Button
                    variant="100"
                    onPointerTap={onClose}
                    layout={{ width: 175, height: 52 }}
                >
                    {t('mysterybox.reward.close')}
                </Button>
            </Box>
        </Frame>
    );
};
