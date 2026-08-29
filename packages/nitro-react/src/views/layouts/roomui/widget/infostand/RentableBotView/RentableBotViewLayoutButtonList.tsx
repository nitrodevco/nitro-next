import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Named region `button_list` of RentableBotViewLayout - configured through the parent's `buttonList` prop. */
export interface RentableBotViewLayoutButtonListProps {
    layout?: BoxLayout;
    onIgnore?: () => void;
    onIgnore2?: () => void;
    onMove?: () => void;
    onMove2?: () => void;
    onPick?: () => void;
    onPick2?: () => void;
    onRotate?: () => void;
    onRotate2?: () => void;
    onUnignore?: () => void;
    onUnignore2?: () => void;
    onWhisper?: () => void;
    onWhisper2?: () => void;
}

export const RentableBotViewLayoutButtonList = ({ layout, onIgnore, onIgnore2, onMove, onMove2, onPick, onPick2, onRotate, onRotate2, onUnignore, onUnignore2, onWhisper, onWhisper2 }: RentableBotViewLayoutButtonListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_list"
            layout={{ width: 1800, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                name="whisper"
                onPointerTap={onWhisper}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="whisper"
                    onPointerTap={onWhisper2}
                    layout={{ position: 'absolute', left: 0, width: 145, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.whisper')}
                </Button>
            </Region>
            <Region
                name="ignore"
                onPointerTap={onIgnore}
                cursor="pointer"
                layout={{ position: 'absolute', left: 110, width: 100, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="ignore"
                    onPointerTap={onIgnore2}
                    layout={{ position: 'absolute', left: 0, width: 137, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.ignore')}
                </Button>
            </Region>
            <Region
                name="unignore"
                onPointerTap={onUnignore}
                cursor="pointer"
                layout={{ position: 'absolute', left: 220, width: 100, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="unignore"
                    onPointerTap={onUnignore2}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.unignore')}
                </Button>
            </Region>
            <Region
                name="move"
                onPointerTap={onMove}
                cursor="pointer"
                layout={{ position: 'absolute', left: 330, width: 132, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="move"
                    onPointerTap={onMove2}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.move')}
                </Button>
            </Region>
            <Region
                name="rotate"
                onPointerTap={onRotate}
                cursor="pointer"
                layout={{ position: 'absolute', left: 472, width: 139, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="rotate"
                    onPointerTap={onRotate2}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.rotate')}
                </Button>
            </Region>
            <Region
                name="pick"
                onPointerTap={onPick}
                cursor="pointer"
                layout={{ position: 'absolute', left: 621, width: 137, top: 0, bottom: 0 }}
            >
                <Button
                    variant="1"
                    name="pick"
                    onPointerTap={onPick2}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 22 }}
                >
                    {t('infostand.button.pickup')}
                </Button>
            </Region>
        </Region>
    );
};
