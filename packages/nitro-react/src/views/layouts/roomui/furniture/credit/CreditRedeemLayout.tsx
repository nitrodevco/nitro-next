import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1058_credit_redeem_xml` (layout "credit_redeem", 315x165) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CreditRedeemLayoutProps {
    captionExchangeText?: string;
    layout?: BoxLayout;
    link?: CreditRedeemLayoutLinkProps;
    onCancel?: () => void;
    onClose?: () => void;
    onExchange?: () => void;
}

export const CreditRedeemLayout = ({ captionExchangeText, layout, link, onCancel, onClose, onExchange }: CreditRedeemLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="creditExchangeTitle"
            name="creditExchangeTitle"
            caption={t('catalog.redeem.dialog.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 315, height: 165, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32, justifyContent: 'center' }}
                >
                    <Button
                        variant="0"
                        name="cancel"
                        onPointerTap={onCancel}
                        layout={{ position: 'absolute', left: 12, width: 80, top: 100, height: 22, minWidth: 80 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                    <ButtonThick
                        variant="0"
                        name="exchange"
                        onPointerTap={onExchange}
                        layout={{ position: 'absolute', marginLeft: 88.5, marginRight: -88.5, width: 100, top: 100, height: 22, minWidth: 100 }}
                    >
                        {t('catalog.redeem.dialog.button.exchange')}
                    </ButtonThick>
                    <Region
                        name="exchange_text"
                        layout={{ position: 'absolute', left: 20, width: 265, top: 17, height: 26, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionExchangeText ?? t('widgets.furniture.credit.redeem.value')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 265 }}
                        />
                    </Region>
                    <CreditRedeemLayoutLink {...link} />
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `link` of CreditRedeemLayout - configured through the parent's `link` prop. */
export interface CreditRedeemLayoutLinkProps {
    layout?: BoxLayout;
    onLink?: () => void;
    tags?: string[];
}

export const CreditRedeemLayoutLink = ({ layout, onLink, tags }: CreditRedeemLayoutLinkProps) => {
    const t = useTranslation();

    return (
        <Region
            name="link"
            tags={tags}
            onPointerTap={onLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 20, width: 158, top: 60, height: 17, ...layout }}
        >
            <Region
                tags={[ 'read_more' ]}
                layout={{ position: 'absolute', left: 0, width: 153, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#ffffff"
            >
                <ThemeText text={t('catelog.redeem.dialog.readmore.description')} />
            </Region>
        </Region>
    );
};
