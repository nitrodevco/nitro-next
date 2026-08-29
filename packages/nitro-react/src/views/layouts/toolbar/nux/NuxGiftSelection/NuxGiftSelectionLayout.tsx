import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { NuxGiftSelectionLayoutNuxGiftSelectionList, NuxGiftSelectionLayoutNuxGiftSelectionListProps } from './NuxGiftSelectionLayoutNuxGiftSelectionList';

/** Generated from `1227_nux_gift_selection_xml` (layout "nux_gift_selection", 487x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxGiftSelectionLayoutProps {
    captionNuxGiftSelectionChooseOne?: string;
    layout?: BoxLayout;
    nuxGiftSelectionList?: NuxGiftSelectionLayoutNuxGiftSelectionListProps;
    onClose?: () => void;
    srcClubIcon?: string;
}

export const NuxGiftSelectionLayout = ({ captionNuxGiftSelectionChooseOne, layout, nuxGiftSelectionList, onClose, srcClubIcon }: NuxGiftSelectionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('nux.gift.selection.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 487, height: 287, minWidth: 487, minHeight: 287, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    backgroundColor="#3d6373"
                    layout={{ position: 'absolute', left: -5, right: -5, top: 8, bottom: 178 }}
                >
                    <Region
                        backgroundColor="#0f4052"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <Region
                            name="nux_gift_selection_choose_one"
                            layout={{ position: 'absolute', left: 75, width: 330, top: 13, height: 28, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNuxGiftSelectionChooseOne ?? t('nux.gift.selection.choose.one')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="club_icon"
                        src={srcClubIcon ?? '${image.library.url}nux/nux_present.png'}
                        layout={{ position: 'absolute', left: 16, width: 38, top: 10, height: 41 }}
                    />
                </Region>
                <NuxGiftSelectionLayoutNuxGiftSelectionList {...nuxGiftSelectionList} />
            </Region>
        </Frame>
    );
};
