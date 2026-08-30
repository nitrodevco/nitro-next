import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `quick_link` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutQuickLinkItemProps {
    captionQuickLinkText?: string;
    layout?: BoxLayout;
    onQuickLink?: () => void;
    onRemoveQuickLink?: () => void;
    visibleQuickLinkText?: boolean;
    visibleRemoveQuickLink?: boolean;
}

export const NavigatorFrame2LayoutQuickLinkItem = ({ captionQuickLinkText, layout, onQuickLink, onRemoveQuickLink, visibleQuickLinkText, visibleRemoveQuickLink }: NavigatorFrame2LayoutQuickLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="quick_link"
            tooltip={t('navigator.tooltip.open.saved.search')}
            onPointerTap={onQuickLink}
            cursor="pointer"
            layout={{ width: 132, height: 17, flexShrink: 0, ...layout }}
        >
            {(visibleQuickLinkText ?? true) && (
                <ThemeText
                    text={captionQuickLinkText ?? 'quick link ph oijasdf oaijs dfodisjf'}
                    name="quick_link_text"
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, bottom: 0 }}
                />
            )}
            {(visibleRemoveQuickLink ?? false) && (
                <ContainerButton
                    variant="0"
                    name="remove_quick_link"
                    tooltip={t('navigator.tooltip.remove.saved.search')}
                    onPointerTap={onRemoveQuickLink}
                    layout={{ position: 'absolute', left: 115, width: 16, top: 1, height: 16 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_icon_ql_remove.png')}
                        layout={{ position: 'absolute', left: 3, width: 10, top: 3, height: 10 }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};
