import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1707_club_gift_confirmation_xml` (layout "purchase_confirmation", 280x142) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftConfirmationLayoutProps {
    captionBundleCounter?: string;
    captionItemName?: string;
    captionMultiCounter?: string;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onSelectButton?: () => void;
    srcImage?: string;
}

export const ClubGiftConfirmationLayout = ({ captionBundleCounter, captionItemName, captionMultiCounter, layout, onCancelButton, onClose, onSelectButton, srcImage }: ClubGiftConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('catalog.club_gift.confirm')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 280, height: 142, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32 }}
                >
                    <Border
                        variant="0"
                        name="image_border"
                        params={16}
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={srcImage}
                            layout={{ position: 'absolute', left: 1, width: 46, top: 1, height: 46 }}
                        />
                        <Region
                            name="bundleCounter"
                            params={176}
                            layout={{ position: 'absolute', left: 18, right: 26, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBundleCounter ?? ''}
                                textOptions={{ fill: '#cccc66' }}
                            />
                        </Region>
                        <Border
                            variant="2"
                            name="multiContainer"
                            params={131088}
                            tintColor="#ff3300"
                            layout={{ position: 'absolute', left: 10, width: 17, top: 2, height: 13 }}
                        >
                            <Region
                                name="multiCounter"
                                params={16}
                                layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionMultiCounter ?? ''}
                                    textOptions={{ fill: '#cccc66' }}
                                />
                            </Region>
                        </Border>
                    </Border>
                    <Region
                        name="item_name"
                        params={16}
                        layout={{ position: 'absolute', left: 69, width: 184, top: 29, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionItemName ?? ''} />
                    </Region>
                    <Button
                        variant="3"
                        name="select_button"
                        params={132113}
                        onPointerTap={onSelectButton}
                        layout={{ position: 'absolute', left: 9, width: 120, bottom: 8, height: 25, minWidth: 120, maxWidth: 120 }}
                    >
                        {t('catalog.club_gift.select')}
                    </Button>
                    <Button
                        variant="3"
                        name="cancel_button"
                        params={132113}
                        onPointerTap={onCancelButton}
                        layout={{ position: 'absolute', left: 137, width: 120, bottom: 8, height: 25, minWidth: 120, maxWidth: 120 }}
                    >
                        {t('cancel')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
