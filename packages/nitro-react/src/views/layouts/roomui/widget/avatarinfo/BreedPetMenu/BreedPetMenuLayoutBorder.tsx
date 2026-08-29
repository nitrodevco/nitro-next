import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

import { BreedPetMenuLayoutBreedItem } from './BreedPetMenuLayoutBreedItem';

/** Named region `border` of BreedPetMenuLayout - configured through the parent's `border` prop. */
export interface BreedPetMenuLayoutBorderProps {
    captionName?: string;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const BreedPetMenuLayoutBorder = ({ captionName, itemsButtons, layout, onMinimize, onProfileLink }: BreedPetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 211, justifyContent: 'center', ...layout }}
        >
            <Region
                name="profile_link"
                onPointerTap={onProfileLink}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 7, height: 16, justifyContent: 'center' }}
            >
                <Region
                    name="name"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'my_name_here'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <Region
                name="buttons"
                layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 161, flexDirection: 'column', gap: 1 }}
            >
                {itemsButtons ?? (
                    <BreedPetMenuLayoutBreedItem />
                )}
            </Region>
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 100, bottom: 4, height: 18 }}
            >
                <Icon
                    variant="7"
                    name="icon"
                    layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
                />
            </Region>
        </Region>
    );
};
