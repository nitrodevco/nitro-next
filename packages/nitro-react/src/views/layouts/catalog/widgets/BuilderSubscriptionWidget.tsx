import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region } from '#base/theme';

/**
 * Catalog widget `builderSubscriptionWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBuildersClubFrontpageLayout); each passes its own placement through `layout`.
 */
/** Named region `builderSubscriptionWidget` of BuilderSubscriptionWidget - configured through the parent's `builderSubscriptionWidget` prop. */
export interface BuilderSubscriptionWidgetProps {
    layout?: BoxLayout;
    onSubscribeButton?: () => void;
    onSubscribeButtonBig?: () => void;
    onSubscribeButtonSms?: () => void;
    onTryButton?: () => void;
    tags?: string[];
    visibleSubscribeButton?: boolean;
    visibleSubscribeButtonBig?: boolean;
    visibleSubscribeButtonSms?: boolean;
}

export const BuilderSubscriptionWidget = ({ layout, onSubscribeButton, onSubscribeButtonBig, onSubscribeButtonSms, onTryButton, tags, visibleSubscribeButton, visibleSubscribeButtonBig, visibleSubscribeButtonSms }: BuilderSubscriptionWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builderSubscriptionWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                visible={visibleSubscribeButtonBig ?? false}
                layout={{ position: 'absolute', left: 90, width: 180, top: 40, height: 50, minWidth: 180, maxWidth: 180 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button_big"
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButtonBig}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join')}
                </ButtonThick>
            </Region>
            <Region
                visible={visibleSubscribeButton ?? false}
                layout={{ position: 'absolute', left: 195, width: 140, top: 60, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button"
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join')}
                </ButtonThick>
            </Region>
            <ButtonThick
                variant="5"
                name="try_button"
                tintColor="#dda100"
                onPointerTap={onTryButton}
                layout={{ position: 'absolute', left: 25, width: 140, top: 60, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                {t('builder.front_page.try')}
            </ButtonThick>
            <Region
                visible={visibleSubscribeButtonSms ?? false}
                layout={{ position: 'absolute', left: 195, width: 140, top: 20, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button_sms"
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButtonSms}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join.sms')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
