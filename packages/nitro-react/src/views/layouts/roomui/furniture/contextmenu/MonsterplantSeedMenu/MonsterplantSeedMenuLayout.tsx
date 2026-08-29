import { BoxLayout, Bubble, Region } from '#base/theme';

import { MonsterplantSeedMenuLayoutBorder, MonsterplantSeedMenuLayoutBorderProps } from './MonsterplantSeedMenuLayoutBorder';

/** Generated from `948_monsterplant_seed_menu_xml` (layout "context_menu_widget", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MonsterplantSeedMenuLayoutProps {
    border?: MonsterplantSeedMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const MonsterplantSeedMenuLayout = ({ border, layout }: MonsterplantSeedMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <MonsterplantSeedMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
