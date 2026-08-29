import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `levelRegion` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutLevelRegionItemProps {
    captionLevelLabel?: string;
    captionLevelValue?: string;
    layout?: BoxLayout;
    onLevelRegion?: () => void;
    spacer?: ReactNode;
    visibleLevelLabel?: boolean;
    visibleLevelValue?: boolean;
    visibleSpacer?: boolean;
}

export const NewExtendedProfileLayoutLevelRegionItem = ({ captionLevelLabel, captionLevelValue, layout, onLevelRegion, spacer, visibleLevelLabel, visibleLevelValue, visibleSpacer }: NewExtendedProfileLayoutLevelRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="levelRegion"
            onPointerTap={onLevelRegion}
            cursor="pointer"
            layout={{ width: 167, height: 30, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 123, top: 0, bottom: 0, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('extended_profile_icon_level.png')}
                    layout={{ width: 29, height: 28, flexShrink: 0 }}
                />
                {(visibleLevelLabel ?? true) && (
                    <Region
                        name="levelLabel"
                        layout={{ width: 72, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionLevelLabel ?? t('generic.level')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                )}
                {(visibleLevelValue ?? true) && (
                    <Region
                        name="levelValue"
                        layout={{ width: 10, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionLevelValue ?? '0'}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                )}
            </Region>
            {(visibleSpacer ?? true) && (
                <Region
                    name="spacer"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 166, width: 1, top: -6, height: 39 }}
                >
                    {spacer}
                </Region>
            )}
        </Region>
    );
};
