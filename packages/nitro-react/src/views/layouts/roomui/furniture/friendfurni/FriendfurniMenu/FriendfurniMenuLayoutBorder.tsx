import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

import { FriendfurniMenuLayoutUseItem } from './FriendfurniMenuLayoutUseItem';

/** Named region `border` of FriendfurniMenuLayout - configured through the parent's `border` prop. */
export interface FriendfurniMenuLayoutBorderProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const FriendfurniMenuLayoutBorder = ({ itemsButtons, layout, onMinimize }: FriendfurniMenuLayoutBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: 11.5, marginRight: -11.5, width: 130, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('friendfurni.context.title')}
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
                layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1 }}
            >
                {itemsButtons ?? (
                    <FriendfurniMenuLayoutUseItem />
                )}
            </Region>
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 100, bottom: 3, height: 18 }}
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
