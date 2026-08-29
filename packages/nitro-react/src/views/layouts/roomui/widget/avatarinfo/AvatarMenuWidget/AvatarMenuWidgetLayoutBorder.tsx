import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { AvatarMenuWidgetLayoutButtons, AvatarMenuWidgetLayoutButtonsProps } from './AvatarMenuWidgetLayoutButtons';

/** Named region `border` of AvatarMenuWidgetLayout - configured through the parent's `border` prop. */
export interface AvatarMenuWidgetLayoutBorderProps {
    buttons?: AvatarMenuWidgetLayoutButtonsProps;
    captionName?: string;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
    srcRelationshipStatus?: string;
}

export const AvatarMenuWidgetLayoutBorder = ({ buttons, captionName, layout, onMinimize, onProfileLink, srcRelationshipStatus }: AvatarMenuWidgetLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, right: 8, top: 0, height: 1458, ...layout }}
        >
            <Region
                name="profile_link"
                onPointerTap={onProfileLink}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 7, height: 16, justifyContent: 'center' }}
            >
                <Region
                    name="name"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'my_name_here'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <ThemeImage
                    name="relationship_status"
                    src={srcRelationshipStatus}
                    layout={{ position: 'absolute', left: 5, width: 16, top: 1, height: 14 }}
                />
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <AvatarMenuWidgetLayoutButtons {...buttons} />
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 3, right: 4, bottom: 11, height: 18, justifyContent: 'center' }}
            >
                <Icon
                    variant="7"
                    name="icon"
                    layout={{ position: 'absolute', width: 12, top: 7, height: 11 }}
                />
            </Region>
        </Region>
    );
};
