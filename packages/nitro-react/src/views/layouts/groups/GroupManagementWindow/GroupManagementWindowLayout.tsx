import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region } from '#base/theme';

import { GroupManagementWindowLayoutFooterCont, GroupManagementWindowLayoutFooterContProps } from './GroupManagementWindowLayoutFooterCont';
import { GroupManagementWindowLayoutHeaderCont, GroupManagementWindowLayoutHeaderContProps } from './GroupManagementWindowLayoutHeaderCont';
import { GroupManagementWindowLayoutStepCont1, GroupManagementWindowLayoutStepCont1Props } from './GroupManagementWindowLayoutStepCont1';
import { GroupManagementWindowLayoutStepCont3, GroupManagementWindowLayoutStepCont3Props } from './GroupManagementWindowLayoutStepCont3';
import { GroupManagementWindowLayoutStepCont4, GroupManagementWindowLayoutStepCont4Props } from './GroupManagementWindowLayoutStepCont4';
import { GroupManagementWindowLayoutStepCont5, GroupManagementWindowLayoutStepCont5Props } from './GroupManagementWindowLayoutStepCont5';

/** Generated from `1201_group_management_window_xml` (layout "Achievements", 392x497) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupManagementWindowLayoutProps {
    footerCont?: GroupManagementWindowLayoutFooterContProps;
    headerCont?: GroupManagementWindowLayoutHeaderContProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onResetBadge?: () => void;
    onResetColors?: () => void;
    stepCont1?: GroupManagementWindowLayoutStepCont1Props;
    stepCont2?: ReactNode;
    stepCont3?: GroupManagementWindowLayoutStepCont3Props;
    stepCont4?: GroupManagementWindowLayoutStepCont4Props;
    stepCont5?: GroupManagementWindowLayoutStepCont5Props;
    visibleFooterCont?: boolean;
    visibleResetBadge?: boolean;
    visibleResetColors?: boolean;
    visibleStepCont2?: boolean;
    visibleStepCont3?: boolean;
    visibleStepCont4?: boolean;
    visibleStepCont5?: boolean;
}

export const GroupManagementWindowLayout = ({ footerCont, headerCont, layout, onClose, onResetBadge, onResetColors, stepCont1, stepCont2, stepCont3, stepCont4, stepCont5, visibleFooterCont, visibleResetBadge, visibleResetColors, visibleStepCont2, visibleStepCont3, visibleStepCont4, visibleStepCont5 }: GroupManagementWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_main_window"
            name="groups_main_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 392, height: 497, ...layout }}
        >
            <GroupManagementWindowLayoutHeaderCont {...headerCont} />
            <GroupManagementWindowLayoutStepCont1 {...stepCont1} />
            {(visibleStepCont2 ?? false) && (
                <Region
                    name="step_cont_2"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 110, height: 305 }}
                >
                    {stepCont2}
                </Region>
            )}
            {(visibleResetBadge ?? false) && (
                <ButtonThick
                    variant="3"
                    name="reset_badge"
                    onPointerTap={onResetBadge}
                    layout={{ position: 'absolute', left: 17, width: 94, top: 245, height: 29, minWidth: 94, maxWidth: 94 }}
                >
                    {t('group.edit.reset.badge')}
                </ButtonThick>
            )}
            {(visibleStepCont3 ?? false) && (
                <GroupManagementWindowLayoutStepCont3 {...stepCont3} />
            )}
            {(visibleResetColors ?? false) && (
                <ButtonThick
                    variant="3"
                    name="reset_colors"
                    onPointerTap={onResetColors}
                    layout={{ position: 'absolute', left: 15, width: 90, top: 195, height: 29, minWidth: 90, maxWidth: 90 }}
                >
                    {t('group.edit.reset.color')}
                </ButtonThick>
            )}
            {(visibleStepCont4 ?? false) && (
                <GroupManagementWindowLayoutStepCont4 {...stepCont4} />
            )}
            {(visibleFooterCont ?? false) && (
                <GroupManagementWindowLayoutFooterCont {...footerCont} />
            )}
            {(visibleStepCont5 ?? false) && (
                <GroupManagementWindowLayoutStepCont5 {...stepCont5} />
            )}
        </Frame>
    );
};
