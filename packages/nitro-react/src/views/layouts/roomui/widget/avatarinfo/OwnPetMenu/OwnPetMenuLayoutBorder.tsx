import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

import { OwnPetMenuLayoutButtons, OwnPetMenuLayoutButtonsProps } from './OwnPetMenuLayoutButtons';

/** Named region `border` of OwnPetMenuLayout - configured through the parent's `border` prop. */
export interface OwnPetMenuLayoutBorderProps {
    buttons?: OwnPetMenuLayoutButtonsProps;
    captionName?: string;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const OwnPetMenuLayoutBorder = ({ buttons, captionName, layout, onMinimize, onProfileLink }: OwnPetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 590, justifyContent: 'center', ...layout }}
        >
            <Region
                name="profile_link"
                layout={{ position: 'absolute', left: 0, right: 0, top: -1, height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
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
            <OwnPetMenuLayoutButtons {...buttons} />
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 100, bottom: 4, height: 19 }}
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
