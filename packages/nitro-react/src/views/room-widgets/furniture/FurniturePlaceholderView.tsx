import { useTranslation } from '#base/context/system';
import { Border, Frame, ThemeText } from '#base/theme';

export interface FurniturePlaceholderViewProps {
    onClose: () => void;
}

/**
 * The stand-in for furniture whose real dialog was never built, on the `placeholder` layout
 * (250x150). Its two lines are written into the Flash layout in English rather than localised,
 * so the keys below are ours with the layout's own text as the fallback.
 */
export const FurniturePlaceholderView = ({ onClose }: FurniturePlaceholderViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-placeholder"
            caption={t('widget.furni.placeholder.title', 'This feature is not yet available!')}
            dropShadow={false}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 250, height: 150 }}
        >
            <Border
                variant="0"
                layout={{ flex: 1 }}
            >
                <ThemeText
                    text={t('widget.furni.placeholder.message', 'Coming soon!')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 134 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 82, width: 134, top: 17, height: 44 }}
                />
            </Border>
        </Frame>
    );
};
