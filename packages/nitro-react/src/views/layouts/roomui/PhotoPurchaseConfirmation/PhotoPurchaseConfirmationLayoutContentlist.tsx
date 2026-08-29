import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem } from './PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem';
import { PhotoPurchaseConfirmationLayoutButtonsItem } from './PhotoPurchaseConfirmationLayoutButtonsItem';
import { PhotoPurchaseConfirmationLayoutCompetitionWrapperItem } from './PhotoPurchaseConfirmationLayoutCompetitionWrapperItem';
import { PhotoPurchaseConfirmationLayoutDisclaimerItem } from './PhotoPurchaseConfirmationLayoutDisclaimerItem';
import { PhotoPurchaseConfirmationLayoutPublishWrapperItem } from './PhotoPurchaseConfirmationLayoutPublishWrapperItem';
import { PhotoPurchaseConfirmationLayoutPurchaseWrapperItem } from './PhotoPurchaseConfirmationLayoutPurchaseWrapperItem';
import { PhotoPurchaseConfirmationLayoutStatusInfoItem } from './PhotoPurchaseConfirmationLayoutStatusInfoItem';

/** Named region `contentlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `contentlist` prop. */
export interface PhotoPurchaseConfirmationLayoutContentlistProps {
    captionLoadingText?: string;
    imageBg?: ReactNode;
    itemsContentlist?: ReactNode;
    layout?: BoxLayout;
    srcProductImage?: string;
    tintProductImage?: string;
}

export const PhotoPurchaseConfirmationLayoutContentlist = ({ captionLoadingText, imageBg, itemsContentlist, layout, srcProductImage, tintProductImage }: PhotoPurchaseConfirmationLayoutContentlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="contentlist"
            layout={{ position: 'absolute', left: 10, top: 39, bottom: 7, flexDirection: 'column', gap: 6, ...layout }}
        >
            {itemsContentlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutStatusInfoItem />
                    <PhotoPurchaseConfirmationLayoutCompetitionWrapperItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseWrapperItem />
                    <PhotoPurchaseConfirmationLayoutPublishWrapperItem />
                    <PhotoPurchaseConfirmationLayoutBadPhotoRemovalDisclaimerItem />
                    <PhotoPurchaseConfirmationLayoutDisclaimerItem />
                    <PhotoPurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ width: 320, height: 320, flexShrink: 0, justifyContent: 'center' }}>
                <Region
                    name="image_bg"
                    backgroundColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                >
                    {imageBg}
                </Region>
                <Region
                    name="loadingText"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 255, top: 130, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLoadingText ?? t('camera.loading')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="product_image"
                    src={srcProductImage}
                    tint={tintProductImage}
                    layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 320 }}
                />
            </Region>
        </Region>
    );
};
