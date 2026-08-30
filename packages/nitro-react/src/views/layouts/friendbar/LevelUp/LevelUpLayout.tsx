import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { LevelUpLayoutLevelUpLayout, LevelUpLayoutLevelUpLayoutProps } from './LevelUpLayoutLevelUpLayout';

/** Generated from `27_level_up_xml` (layout "level_up", 430x362) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LevelUpLayoutProps {
    captionCloseButton?: string;
    captionLevelUpMessage?: string;
    layout?: BoxLayout;
    levelUpLayout?: LevelUpLayoutLevelUpLayoutProps;
    onClose?: () => void;
    onCloseButton?: () => void;
    onTalentButton?: () => void;
    srcLevelDecoration?: string;
}

export const LevelUpLayout = ({ captionCloseButton, captionLevelUpMessage, layout, levelUpLayout, onClose, onCloseButton, onTalentButton, srcLevelDecoration }: LevelUpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('talent.track.common.levelup.caption')}
            onClose={onClose}
            layout={{ width: 430, height: 362, minWidth: 430, minHeight: 362, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 10, top: 10, flexDirection: 'column' }}>
                <ThemeText
                    text={t('talent.track.common.levelup.title')}
                    textStyle="text-style-il-heading-title"
                    layout={{ width: 291, height: 24, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionLevelUpMessage ?? t('talent.track.helper.levelup.message')}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 410 }}
                    name="level_up_message"
                    verticalAlign="top"
                    layout={{ width: 410, height: 37, flexShrink: 0 }}
                />
                <Border
                    variant="102"
                    layout={{ width: 406, height: 176, flexShrink: 0, minWidth: 406, minHeight: 70 }}
                >
                    <LevelUpLayoutLevelUpLayout {...levelUpLayout} />
                </Border>
                <Button
                    variant="101"
                    name="talent_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onTalentButton}
                    layout={{ width: 221, height: 53, flexShrink: 0 }}
                >
                    {t('talent.track.common.levelup.check')}
                </Button>
                <Region
                    name="close_button"
                    layout={{ width: 94, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onCloseButton}
                    cursor="pointer"
                >
                    {captionCloseButton ?? t('alert.close.button')}
                </Region>
            </Region>
            <ThemeImage
                name="level_decoration"
                src={srcLevelDecoration}
                layout={{ position: 'absolute', left: 280, width: 260, bottom: -28, height: 260 }}
            />
        </Frame>
    );
};
