import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent4Props {
    captionTransferFeeText?: string;
    layout?: BoxLayout;
    onTransferButton?: () => void;
    onTransferWalletSelection?: () => void;
    spacing?: ReactNode;
    spacing2?: ReactNode;
    srcTransferFeeIcon?: string;
}

export const CollectibleHubLayoutLoadedContent4 = ({ captionTransferFeeText, layout, onTransferButton, onTransferWalletSelection, spacing, spacing2, srcTransferFeeIcon }: CollectibleHubLayoutLoadedContent4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="headercontainer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, alignSelf: 'center', height: 30, minWidth: 450, maxWidth: 450, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('collectibles.transfer.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                    />
                </Region>
            </Region>
            <Border
                variant="3"
                name="transfer_container"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, width: 488, top: 380, height: 50 }}
            >
                <Dropmenu
                    variant="3"
                    name="transfer_wallet_selection"
                    onPointerTap={onTransferWalletSelection}
                    layout={{ position: 'absolute', left: 10, width: 260, top: 13, height: 24 }}
                />
                <Border
                    variant="3"
                    tintColor="#d6dbe1"
                    blend={0}
                    layout={{ position: 'absolute', left: 315, width: 170, top: 5, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', right: 13, top: 5, flexDirection: 'row' }}>
                        <Region
                            name="transfer_fee_text"
                            layout={{ width: 12, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTransferFeeText ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="spacing"
                            layout={{ width: 4, height: 30, flexShrink: 0 }}
                        >
                            {spacing}
                        </Region>
                        <ThemeImage
                            name="transfer_fee_icon"
                            src={srcTransferFeeIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ width: 24, height: 30, flexShrink: 0 }}
                        />
                        <Region
                            name="spacing"
                            layout={{ width: 6, height: 30, flexShrink: 0 }}
                        >
                            {spacing2}
                        </Region>
                        <Button
                            variant="5"
                            name="transfer_button"
                            tintColor="#2095d4"
                            onPointerTap={onTransferButton}
                            layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                        >
                            {t('collectibles.transfer')}
                        </Button>
                    </Region>
                </Border>
            </Border>
            <ThemeImage
                src={layoutImage('collectables_transfer_safe.png')}
                layout={{ position: 'absolute', left: 42, width: 400, top: 120, height: 180 }}
            />
        </Region>
    );
};
