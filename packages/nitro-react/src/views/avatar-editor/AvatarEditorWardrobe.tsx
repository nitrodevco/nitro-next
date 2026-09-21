import { ClubLevelEnum } from '@nitrodevco/nitro-api';

import { AvatarEditorWardrobeOutfit } from '#base/context/avatar-editor';
import { useTranslation } from '#base/context/system';
import { Border, Icon, Region, ThemeText } from '#base/theme';

import { AvatarEditorWardrobeSlot } from './AvatarEditorWardrobeSlot';

export interface AvatarEditorWardrobeProps {
    slots: AvatarEditorWardrobeOutfit[];
    slotCount: number;
    clubLevel: ClubLevelEnum;
    onSave: (index: number) => void;
    onLoad: (index: number, outfit: NonNullable<AvatarEditorWardrobeOutfit>) => void;
}

/** `slots_columns_list` of `avatareditor_wardrobe`: two 64px columns 4px apart, slots 3px apart down each. */
const COLUMNS = 2;
const COLUMN_WIDTH = 64;
const COLUMN_GAP = 4;
const ROW_GAP = 3;
/** `WardrobeModel`: the first five slots need Habbo Club, the ones after need VIP. */
const CLUB_SLOTS = 5;

/**
 * The wardrobe side panel - the Flash `WardrobeView` on the `avatareditor_wardrobe` layout: a
 * 1px splitter, the HC icon and title, and the grey frame holding the slots two to a row. The
 * Flash view split its slots into a club list and a VIP list; here the same gating decides
 * which slots are usable, and the grid simply wraps every `COLUMNS` slots.
 */
export const AvatarEditorWardrobe = ({ slots, slotCount, clubLevel, onSave, onLoad }: AvatarEditorWardrobeProps) => {
    const t = useTranslation();
    const count = Math.max(slotCount, slots.length);

    const isUsable = (index: number): boolean => ((index < CLUB_SLOTS) ? (clubLevel >= ClubLevelEnum.Club) : (clubLevel >= ClubLevelEnum.Vip));

    return (
        <Region layout={{ width: 182, height: '100%', flexShrink: 0, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15, padding: 15 }}>
            <Region
                name="splitter"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: -1, width: 1, top: 0, bottom: 0 }}
            />
            <Region
                name="header"
                layout={{ height: 40, alignItems: 'center', justifyContent: 'center', gap: 10 }}
            >
                <ThemeText
                    text={t('avatareditor.wardrobe.title')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#83827e' }}
                />
                <Icon variant="13" />
            </Region>
            <Border
                variant="4"
                tintColor="#cbcbcb"
                layout={{ width: 139, height: '100%', overflow: 'hidden', flexDirection: 'row', flexWrap: 'wrap', columnGap: 4, rowGap: 4, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5 }}
            >
                {Array.from({ length: count }, (_, index) => {
                    const outfit = slots[index] ?? null;
                    const usable = isUsable(index);

                    return (
                        <AvatarEditorWardrobeSlot
                            key={index}
                            figure={outfit?.figure}
                            gender={outfit?.gender}
                            usable={usable}
                            onSet={() => onSave(index)}
                            onGet={() => outfit && onLoad(index, outfit)}
                        />
                    );
                })}
            </Border>
        </Region>
    );
};
