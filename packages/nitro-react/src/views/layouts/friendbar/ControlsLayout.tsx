import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Generated from `92_controls_xml` (layout "controls", 121x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ControlsLayoutProps {
    controls?: ControlsLayoutControlsProps;
    layout?: BoxLayout;
}

export const ControlsLayout = ({ controls, layout }: ControlsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 120, ...layout }}>
            <ControlsLayoutControls {...controls} />
        </Region>
    );
};

/** Named region `controls` of ControlsLayout - configured through the parent's `controls` prop. */
export interface ControlsLayoutControlsProps {
    layout?: BoxLayout;
    onBtnGame?: () => void;
    onBtnMessage?: () => void;
    onBtnVisit?: () => void;
    onButtonProfile?: () => void;
    tags?: string[];
}

export const ControlsLayoutControls = ({ layout, onBtnGame, onBtnMessage, onBtnVisit, onButtonProfile, tags }: ControlsLayoutControlsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="controls"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, ...layout }}
        >
            <Button
                variant="3"
                name="btn_message"
                tooltip={t('friend.bar.message.tip')}
                onPointerTap={onBtnMessage}
                layout={{ position: 'absolute', left: 4, width: 113, top: 4, height: 28, minWidth: 113, maxWidth: 113 }}
            >
                {t('friend.bar.message')}
            </Button>
            <Button
                variant="3"
                name="btn_visit"
                tooltip={t('friend.bar.visit.tip')}
                onPointerTap={onBtnVisit}
                layout={{ position: 'absolute', left: 4, width: 113, top: 34, height: 28, minWidth: 113 }}
            >
                {t('friend.bar.visit')}
            </Button>
            <Button
                variant="3"
                name="btn_game"
                tooltip={t('friend.bar.game.tip')}
                tintColor="#8ed9ef"
                onPointerTap={onBtnGame}
                layout={{ position: 'absolute', left: 4, width: 113, top: 34, height: 28, minWidth: 113 }}
            >
                {t('friend.bar.game')}
            </Button>
            <Button
                variant="3"
                name="button_profile"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onButtonProfile}
                layout={{ position: 'absolute', left: 4, width: 113, top: 64, height: 28, minWidth: 113 }}
            >
                {t('friendbar.request.profile')}
            </Button>
        </Region>
    );
};
