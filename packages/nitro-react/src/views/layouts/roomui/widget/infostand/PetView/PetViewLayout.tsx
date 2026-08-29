import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

import { PetViewLayoutButtonList, PetViewLayoutButtonListProps } from './PetViewLayoutButtonList';
import { PetViewLayoutInfostandElementList, PetViewLayoutInfostandElementListProps } from './PetViewLayoutInfostandElementList';

/** Generated from `1099_pet_view_xml` (layout "pet_view", 1036x440) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetViewLayoutProps {
    buttonList?: PetViewLayoutButtonListProps;
    infostandElementList?: PetViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PetViewLayout = ({ buttonList, infostandElementList, layout, onClose }: PetViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 440, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 440, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 285, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 170, width: 18, top: 6, height: 16 }}
                    />
                    <PetViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <PetViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};
