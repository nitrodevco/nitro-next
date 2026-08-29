import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `1188_group_info_window_xml` (layout "Group info window", 363x232) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupInfoWindowLayoutProps {
    groupCont?: GroupInfoWindowLayoutGroupContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const GroupInfoWindowLayout = ({ groupCont, layout, onClose }: GroupInfoWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_info_window"
            name="groups_info_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 363, height: 268, ...layout }}
        >
            <GroupInfoWindowLayoutGroupCont {...groupCont} />
        </Frame>
    );
};

/** Named region `group_cont` of GroupInfoWindowLayout - configured through the parent's `groupCont` prop. */
export interface GroupInfoWindowLayoutGroupContProps {
    layout?: BoxLayout;
}

export const GroupInfoWindowLayoutGroupCont = ({ layout }: GroupInfoWindowLayoutGroupContProps) => {
    return (
        <Region
            name="group_cont"
            layout={{ position: 'absolute', left: 10, width: 343, top: 10, height: 214, ...layout }}
        />
    );
};
