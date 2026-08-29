import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `851_mystery_box_reward_xml` (layout "mystery_box_reward", 430x234) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxRewardLayoutProps {
    bitmapContainer?: MysteryBoxRewardLayoutBitmapContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const MysteryBoxRewardLayout = ({ bitmapContainer, layout, onClose, onCloseButton }: MysteryBoxRewardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('mysterybox.reward.text')}
            onClose={onClose}
            layout={{ width: 430, height: 234, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 8, flexDirection: 'column', gap: 4 }}>
                <Region layout={{ width: 128, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('mysterybox.reward.title')} />
                </Region>
                <MysteryBoxRewardLayoutBitmapContainer {...bitmapContainer} />
                <Button
                    variant="100"
                    name="close_button"
                    onPointerTap={onCloseButton}
                    layout={{ width: 175, height: 52, flexShrink: 0 }}
                >
                    {t('mysterybox.reward.close')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `bitmap_container` of MysteryBoxRewardLayout - configured through the parent's `bitmapContainer` prop. */
export interface MysteryBoxRewardLayoutBitmapContainerProps {
    layout?: BoxLayout;
    srcRewardImage?: string;
}

export const MysteryBoxRewardLayoutBitmapContainer = ({ layout, srcRewardImage }: MysteryBoxRewardLayoutBitmapContainerProps) => {
    return (
        <Region
            name="bitmap_container"
            layout={{ width: 109, height: 109, flexShrink: 0, minWidth: 109, minHeight: 109, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src="${image.library.url}Quests/ach_receive_star.png"
                layout={{ position: 'absolute', width: 109, alignSelf: 'center', height: 109 }}
            />
            <ThemeImage
                name="reward_image"
                src={srcRewardImage}
                layout={{ position: 'absolute', width: 1, alignSelf: 'center', height: 1 }}
            />
        </Region>
    );
};
