import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

import { PetMenuLayoutButtons, PetMenuLayoutButtonsProps } from './PetMenuLayoutButtons';

/** Named region `border` of PetMenuLayout - configured through the parent's `border` prop. */
export interface PetMenuLayoutBorderProps {
    buttons?: PetMenuLayoutButtonsProps;
    captionName?: string;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const PetMenuLayoutBorder = ({ buttons, captionName, layout, onMinimize, onProfileLink }: PetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 265, justifyContent: 'center', ...layout }}
        >
            <Region
                name="profile_link"
                layout={{ position: 'absolute', left: 0, width: 107, top: -1, height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                onPointerTap={onProfileLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionName ?? 'Incarnatus Hairbullis'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 107, align: 'center' }}
                />
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <PetMenuLayoutButtons {...buttons} />
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 100, bottom: 6, height: 18 }}
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
