import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

import { GuildFurniMenuLayoutButtons, GuildFurniMenuLayoutButtonsProps } from './GuildFurniMenuLayoutButtons';

/** Named region `border` of GuildFurniMenuLayout - configured through the parent's `border` prop. */
export interface GuildFurniMenuLayoutBorderProps {
    buttons?: GuildFurniMenuLayoutButtonsProps;
    captionName?: string;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const GuildFurniMenuLayoutBorder = ({ buttons, captionName, layout, onMinimize, onProfileLink }: GuildFurniMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 130, justifyContent: 'center', ...layout }}
        >
            <Region
                name="profile_link"
                onPointerTap={onProfileLink}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}
            >
                <Region
                    name="name"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 62, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'group_title'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <GuildFurniMenuLayoutButtons {...buttons} />
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
