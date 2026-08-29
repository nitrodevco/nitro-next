import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `17_new_controls_xml` (layout "new_controls", 85x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewControlsLayoutProps {
    layout?: BoxLayout;
    onBtnChat?: () => void;
    onBtnVisit?: () => void;
    onButtonProfile?: () => void;
    onControls?: () => void;
}

export const NewControlsLayout = ({ layout, onBtnChat, onBtnVisit, onButtonProfile, onControls }: NewControlsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 85, height: 35, ...layout }}>
            <Region
                name="controls"
                onPointerTap={onControls}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="btn_chat"
                    dynamicStyle="lifted_hover"
                    onPointerTap={onBtnChat}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        src={layoutImage('friend_bar_friendlist_chat.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="button_profile"
                    dynamicStyle="lifted_hover"
                    onPointerTap={onButtonProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 58, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        src={layoutImage('friend_bar_friendlist_eye.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="btn_visit"
                    dynamicStyle="lifted_hover"
                    onPointerTap={onBtnVisit}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 29, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        src={layoutImage('friend_bar_friendlist_go_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
