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

/** `WardrobeView.SLOTS_PER_COL`: the slots fill a column of seven before the next column starts. */
const SLOTS_PER_COL = 7;
/** `slots_columns_list`: 64px columns 4px apart from x 4; each `slots_column_template` starts at y 3 and stacks its slots 3px apart. */
const COLUMN_WIDTH = 64;
const COLUMN_GAP = 4;
const COLUMN_TOP = 3;
const COLUMN_HEIGHT = 412;
const ROW_GAP = 3;
/**
 * `WardrobeModel.isSlotEnabled` asks `sessionData.hasClub` for the first five slots and
 * `sessionData.hasVip` for the ones after - but `HabboClubLevelEnum.HasClub` and `HasVip` are
 * both `clubLevel >= 1`, so every slot is open at club level 1 and none below it. Splitting the
 * two apart (reading `hasVip` as `ClubLevelEnum.Vip`) locked slots 6 and up for everyone.
 */
const usableAtClubLevel = ClubLevelEnum.Club;

/**
 * The wardrobe side panel - the Flash `WardrobeView` on the `avatareditor_wardrobe` layout
 * (182x490): the 1px black `splitter`, then past 6px of `spacing` the 168px `main_container` with
 * its `header` (the title and the HC icon 10px apart, centred where the layout's 186px list was)
 * and the style 4 border holding `slots_columns_list`. `WardrobeView` clones one
 * `slots_column_template` per seven slots and fills them in order, so slot `n` is in column
 * `n / 7`. `WardrobeModel` splits its slots into a club group and a VIP group; both resolve to
 * the same club-level test - see `usableAtClubLevel`.
 */
export const AvatarEditorWardrobe = ({ slots, slotCount, clubLevel, onSave, onLoad }: AvatarEditorWardrobeProps) => {
    const t = useTranslation();
    const count = Math.max(slotCount, slots.length);
    const columnCount = Math.ceil(count / SLOTS_PER_COL);

    const isUsable = clubLevel >= usableAtClubLevel;

    const renderSlot = (index: number) => {
        const outfit = slots[index] ?? null;

        return (
            <AvatarEditorWardrobeSlot
                key={index}
                figure={outfit?.figure}
                gender={outfit?.gender}
                usable={isUsable}
                onSet={() => onSave(index)}
                onGet={() => outfit && onLoad(index, outfit)}
            />
        );
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 490 }}>
            <Region
                name="splitter"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 490 }}
            />
            <Region
                name="main_container"
                layout={{ position: 'absolute', left: 6, width: 168, top: 0, height: 490 }}
            >
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, width: 186, top: 19, height: 23, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 10 }}
                >
                    <ThemeText
                        text={t('avatareditor.wardrobe.title')}
                        textStyle="u_bold"
                        textOptions={{ fill: '#83827e' }}
                        verticalAlign="top"
                        layout={{ height: 17, flexShrink: 0 }}
                    />
                    {/*
                      * The icon's own window, 18x15, with `icon_13`'s 16x16 region drawn at its top
                      * left and clipped by it - which is what `BitmapSkinRenderer.draw` does for a
                      * template whose entity states no `<scale>`. Sizing the icon itself to 18x15
                      * instead centred a 16px texture in a 15px box, and the half pixel that left
                      * sampled the row above the region - which in `habbo_icons_png` is solid - as
                      * a line over the icon.
                      */}
                    <Region
                        name="hc_icon"
                        layout={{ width: 18, height: 15, flexShrink: 0, overflow: 'hidden' }}
                    >
                        <Icon
                            variant="13"
                            layout={{ position: 'absolute', left: 0, top: 0, width: 16, height: 16 }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="4"
                    tintColor="#cbcbcb"
                    layout={{ position: 'absolute', left: 15, width: 139, top: 53, height: 418 }}
                >
                    <Region
                        name="slots_columns_list"
                        layout={{ position: 'absolute', left: 4, top: 0, height: 418, flexDirection: 'row', gap: COLUMN_GAP }}
                    >
                        {Array.from({ length: columnCount }, (_, column) => (
                            <Region
                                key={column}
                                name="slots_column_template"
                                layout={{ width: COLUMN_WIDTH, height: COLUMN_HEIGHT, marginTop: COLUMN_TOP, flexShrink: 0, flexDirection: 'column', gap: ROW_GAP }}
                            >
                                {Array.from({ length: Math.min(SLOTS_PER_COL, count - (column * SLOTS_PER_COL)) }, (_, row) => renderSlot((column * SLOTS_PER_COL) + row))}
                            </Region>
                        ))}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
