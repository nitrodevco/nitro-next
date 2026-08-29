import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `17_new_controls_xml` (layout "new_controls", 85x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewControlsLayoutProps {
    controls?: NewControlsLayoutControlsProps;
    layout?: BoxLayout;
}

export const NewControlsLayout = ({ controls, layout }: NewControlsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 85, height: 35, ...layout }}>
            <NewControlsLayoutControls {...controls} />
        </Region>
    );
};

/** Named region `btn_chat` of NewControlsLayout - configured through the parent's `btnChat` prop. */
export interface NewControlsLayoutBtnChatProps {
    layout?: BoxLayout;
    onBtnChat?: () => void;
}

export const NewControlsLayoutBtnChat = ({ layout, onBtnChat }: NewControlsLayoutBtnChatProps) => {
    return (
        <Region
            name="btn_chat"
            dynamicStyle="lifted_hover"
            onPointerTap={onBtnChat}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_friendlist_chat.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `button_profile` of NewControlsLayout - configured through the parent's `buttonProfile` prop. */
export interface NewControlsLayoutButtonProfileProps {
    layout?: BoxLayout;
    onButtonProfile?: () => void;
}

export const NewControlsLayoutButtonProfile = ({ layout, onButtonProfile }: NewControlsLayoutButtonProfileProps) => {
    return (
        <Region
            name="button_profile"
            dynamicStyle="lifted_hover"
            onPointerTap={onButtonProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 58, width: 25, top: 0, height: 25, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_friendlist_eye.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `btn_visit` of NewControlsLayout - configured through the parent's `btnVisit` prop. */
export interface NewControlsLayoutBtnVisitProps {
    layout?: BoxLayout;
    onBtnVisit?: () => void;
}

export const NewControlsLayoutBtnVisit = ({ layout, onBtnVisit }: NewControlsLayoutBtnVisitProps) => {
    return (
        <Region
            name="btn_visit"
            dynamicStyle="lifted_hover"
            onPointerTap={onBtnVisit}
            cursor="pointer"
            layout={{ position: 'absolute', left: 29, width: 25, top: 0, height: 25, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_friendlist_go_room.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `controls` of NewControlsLayout - configured through the parent's `controls` prop. */
export interface NewControlsLayoutControlsProps {
    btnChat?: NewControlsLayoutBtnChatProps;
    btnVisit?: NewControlsLayoutBtnVisitProps;
    buttonProfile?: NewControlsLayoutButtonProfileProps;
    layout?: BoxLayout;
    onControls?: () => void;
}

export const NewControlsLayoutControls = ({ btnChat, btnVisit, buttonProfile, layout, onControls }: NewControlsLayoutControlsProps) => {
    return (
        <Region
            name="controls"
            onPointerTap={onControls}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 35, ...layout }}
        >
            <NewControlsLayoutBtnChat {...btnChat} />
            <NewControlsLayoutButtonProfile {...buttonProfile} />
            <NewControlsLayoutBtnVisit {...btnVisit} />
        </Region>
    );
};
