import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `BUILDER` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutBUILDERItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onBUILDER?: () => void;
    srcIconsToolbarBuilder?: string;
    visibleBgBuilder?: boolean;
    visibleIconsToolbarBuilder?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutBUILDERItem = ({ captionText, context, layout, onBUILDER, srcIconsToolbarBuilder, visibleBgBuilder, visibleIconsToolbarBuilder, visibleText }: ToolbarViewLayoutBUILDERItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel' ].includes(context)) && (
            <Region
                name="BUILDER"
                onPointerTap={onBUILDER}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgBuilder ?? true) && (
                    <Border
                        variant="2"
                        name="bg_builder"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarBuilder ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_builder"
                                src={srcIconsToolbarBuilder ?? layoutImage('icons_toolbar_builder_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.builder')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
            </Region>
        )
    );
};
