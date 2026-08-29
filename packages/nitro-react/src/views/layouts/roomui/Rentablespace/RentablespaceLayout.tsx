import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { RentablespaceLayoutCancelRentButtonItem } from './RentablespaceLayoutCancelRentButtonItem';
import { RentablespaceLayoutErrorButtonCloseItem } from './RentablespaceLayoutErrorButtonCloseItem';
import { RentablespaceLayoutErrorMessageItem } from './RentablespaceLayoutErrorMessageItem';
import { RentablespaceLayoutRentedToLabelItem } from './RentablespaceLayoutRentedToLabelItem';
import { RentablespaceLayoutRenterNameItem } from './RentablespaceLayoutRenterNameItem';
import { RentablespaceLayoutRentView, RentablespaceLayoutRentViewProps } from './RentablespaceLayoutRentView';
import { RentablespaceLayoutTimeLabelItem } from './RentablespaceLayoutTimeLabelItem';
import { RentablespaceLayoutTimeRemainingLabelItem } from './RentablespaceLayoutTimeRemainingLabelItem';

/** Generated from `845_rentablespace_xml` (layout "rentablespace", 256x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentablespaceLayoutProps {
    itemsErrorView?: ReactNode;
    itemsRentedView?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    rentView?: RentablespaceLayoutRentViewProps;
    visibleErrorView?: boolean;
    visibleRentedView?: boolean;
}

export const RentablespaceLayout = ({ itemsErrorView, itemsRentedView, layout, onClose, rentView, visibleErrorView, visibleRentedView }: RentablespaceLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('rentablespace.widget.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 256, height: 224, minWidth: 256, minHeight: 224, ...layout }}
        >
            <RentablespaceLayoutRentView {...rentView} />
            {(visibleRentedView ?? false) && (
                <Region
                    name="rented_view"
                    layout={{ position: 'absolute', left: 2, top: 4, flexDirection: 'column', gap: 5 }}
                >
                    {itemsRentedView ?? (
                        <>
                            <RentablespaceLayoutRentedToLabelItem />
                            <RentablespaceLayoutRenterNameItem />
                            <RentablespaceLayoutTimeLabelItem />
                            <RentablespaceLayoutTimeRemainingLabelItem />
                            <RentablespaceLayoutCancelRentButtonItem />
                        </>
                    )}
                </Region>
            )}
            {(visibleErrorView ?? false) && (
                <Region
                    name="error_view"
                    layout={{ position: 'absolute', left: 0, minWidth: 253, top: 0, minHeight: 182, flexDirection: 'column' }}
                >
                    {itemsErrorView ?? (
                        <>
                            <RentablespaceLayoutErrorMessageItem />
                            <RentablespaceLayoutErrorButtonCloseItem />
                        </>
                    )}
                </Region>
            )}
        </Frame>
    );
};
