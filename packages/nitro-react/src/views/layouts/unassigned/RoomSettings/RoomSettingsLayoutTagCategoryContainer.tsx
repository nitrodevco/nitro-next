import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `tag_category_container` of RoomSettingsLayout - configured through the parent's `tagCategoryContainer` prop. */
export interface RoomSettingsLayoutTagCategoryContainerProps {
    captionCategoryLabel?: string;
    captionMaxvisitorsLabel?: string;
    captionTagLabel?: string;
    captionTradesettingsLabel?: string;
    layout?: BoxLayout;
    onCategories?: () => void;
    onMaxvisitors?: () => void;
    onTradesettings?: () => void;
}

export const RoomSettingsLayoutTagCategoryContainer = ({ captionCategoryLabel, captionMaxvisitorsLabel, captionTagLabel, captionTradesettingsLabel, layout, onCategories, onMaxvisitors, onTradesettings }: RoomSettingsLayoutTagCategoryContainerProps) => {
    const t = useTranslation();
    const [ tag1Value, setTag1Value ] = useState('');
    const [ tag2Value, setTag2Value ] = useState('');

    return (
        <Region
            name="tag_category_container"
            layout={{ position: 'absolute', left: 0, width: 300, top: 100, height: 192, ...layout }}
        >
            <Region
                name="category_label"
                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCategoryLabel ?? t('navigator.category')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="categories"
                onPointerTap={onCategories}
                layout={{ position: 'absolute', left: 0, right: 0, top: 16, height: 24 }}
            />
            <Region
                name="maxvisitors_label"
                layout={{ position: 'absolute', left: 0, width: 125, top: 45, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMaxvisitorsLabel ?? t('navigator.maxvisitors')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="maxvisitors"
                onPointerTap={onMaxvisitors}
                layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 24 }}
            />
            <Region
                name="tradesettings_label"
                layout={{ position: 'absolute', left: 0, width: 138, top: 90, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTradesettingsLabel ?? t('navigator.tradesettings')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="tradesettings"
                onPointerTap={onTradesettings}
                layout={{ position: 'absolute', left: 0, width: 299, top: 106, height: 24 }}
            />
            <Region
                name="tag_label"
                layout={{ position: 'absolute', left: 0, width: 86, top: 138, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTagLabel ?? t('navigator.tags')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <TextInput
                value={tag1Value}
                onChange={setTag1Value}
                backgroundColor="#fbfbf9"
                layout={{ position: 'absolute', left: 0, width: 145, top: 154, height: 15, overflow: 'hidden' }}
            />
            <TextInput
                value={tag2Value}
                onChange={setTag2Value}
                backgroundColor="#fbfbf9"
                layout={{ position: 'absolute', left: 149, width: 145, top: 154, height: 15, overflow: 'hidden' }}
            />
        </Region>
    );
};
