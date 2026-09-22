import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Region, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton } from '../object-menu/InfoBubbleMenuButton';
import { InfoBubbleMenuFrame } from '../object-menu/InfoBubbleMenuFrame';
import { BREED_PET_MENU_GEOMETRY } from '../object-menu/InfoBubbleMenuGeometry';

export interface PetBreedMenuViewProps {
    /** The partner plant this bubble floats over. */
    name: string;
    onBreed: () => void;
}

/** The `breed` row: 101 wide, 26 high. */
const ROW_WIDTH = 101;
const ROW_HEIGHT = 26;

/**
 * The bubble offering to breed with one particular plant - `BreedPetView` on the
 * `breed_pet_menu` layout (a 115x221 style 0 bubble, margins 4/4/4/4, tinted `0x6e6b67`): in its
 * 107px `border` the plant's name (`u_bold` 11, centred in `profile_link` at 0,7, 107x16), the
 * black rule at 2,27, the one `breed` row in `buttons` at 2,28, and the `minimize` region 22 up
 * from the border's bottom. `InfoBubbleMenuFrame` draws it as it does the other object menus:
 * `buttons` accommodates its rows and the border and the bubble follow it
 * (`reflect_vertical_resize_to_parent`). Minimizing collapses it to `minimized_menu`, as the
 * avatar menus do.
 */
export const PetBreedMenuView = ({ name, onBreed }: PetBreedMenuViewProps) => {
    const t = useTranslation();
    const [ collapsed, setCollapsed ] = useState(false);

    return (
        <InfoBubbleMenuFrame
            geometry={BREED_PET_MENU_GEOMETRY}
            rowHeights={[ ROW_HEIGHT ]}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed(!collapsed)}
            header={(
                <Region
                    name="profile_link"
                    layout={{ position: 'absolute', left: 0, top: 7, width: 107, height: 16, flexDirection: 'row', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={name}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        flashFormat={{ thickness: -15, sharpness: 80 }}
                        name="name"
                        verticalAlign="top"
                    />
                </Region>
            )}
        >
            <InfoBubbleMenuButton
                width={ROW_WIDTH}
                caption={t('infostand.button.breed')}
                onPress={onBreed}
            />
        </InfoBubbleMenuFrame>
    );
};
