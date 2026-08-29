import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1545_club_direct_buy_xml` (layout "club_direct_buy", 454x442) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubDirectBuyLayoutProps {
    captionBoldText?: string;
    captionClubBenefitsLink?: string;
    captionStandardText?: string;
    layout?: BoxLayout;
    onBuy?: () => void;
    onClose?: () => void;
    onClubBenefitsLink?: () => void;
    srcHeaderImage?: string;
    srcPartnerImage?: string;
    srcTeaserImage1?: string;
    srcTeaserImage2?: string;
}

export const ClubDirectBuyLayout = ({ captionBoldText, captionClubBenefitsLink, captionStandardText, layout, onBuy, onClose, onClubBenefitsLink, srcHeaderImage, srcPartnerImage, srcTeaserImage1, srcTeaserImage2 }: ClubDirectBuyLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('direct.club.buy.dialog.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 454, height: 442, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    backgroundColor="#303030"
                    layout={{ position: 'absolute', left: -2, width: 452, top: -3, height: 69 }}
                >
                    <ThemeImage
                        name="header_image"
                        src={srcHeaderImage}
                        layout={{ position: 'absolute', left: 54, width: 349, top: 15, height: 43 }}
                    />
                </Region>
                <Region
                    name="bold_text"
                    layout={{ position: 'absolute', left: 99, width: 261, top: 108, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBoldText ?? t('direct.club.buy.header.bold.text')}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 261 }}
                    />
                </Region>
                <Region
                    name="standard_text"
                    layout={{ position: 'absolute', left: 99, width: 261, top: 139, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStandardText ?? t('direct.club.buy.header.standard.text')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 261 }}
                    />
                </Region>
                <ThemeImage
                    name="teaser_image_1"
                    src={srcTeaserImage1}
                    layout={{ position: 'absolute', left: -1, width: 100, top: 205, height: 197 }}
                />
                <ThemeImage
                    name="teaser_image_2"
                    src={srcTeaserImage2}
                    layout={{ position: 'absolute', left: 349, width: 100, top: 206, height: 197 }}
                />
                <Border
                    variant="0"
                    tintColor="#dedede"
                    layout={{ position: 'absolute', left: 100, width: 254, top: 205, height: 72 }}
                >
                    <Border
                        variant="2"
                        tintColor="#959595"
                        layout={{ position: 'absolute', left: 5, width: 245, top: 4, height: 25 }}
                    >
                        <Icon
                            variant="14"
                            layout={{ position: 'absolute', left: 4, width: 35, top: 4, height: 17 }}
                        />
                        <Region layout={{ position: 'absolute', left: 44, width: 168, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('direct.club.buy.period.length')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                    <ContainerButton
                        variant="3"
                        name="buy"
                        onPointerTap={onBuy}
                        layout={{ position: 'absolute', left: 167, width: 81, top: 36, height: 30, minWidth: 80, minHeight: 29, justifyContent: 'center' }}
                    >
                        <Region layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 25, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('buy')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </ContainerButton>
                    <Region layout={{ position: 'absolute', left: 5, width: 108, top: 43, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text="$PRICE Offer text long"
                            textStyle="text-style-u-small"
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="partner_image"
                    src={srcPartnerImage}
                    layout={{ position: 'absolute', left: 99, width: 252, top: 281, height: 79 }}
                />
                <Region
                    name="club_benefits_link"
                    layout={{ position: 'absolute', left: 99, width: 250, top: 370, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onClubBenefitsLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionClubBenefitsLink ?? t('direct.club.buy.compare.club.benefits.link')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
