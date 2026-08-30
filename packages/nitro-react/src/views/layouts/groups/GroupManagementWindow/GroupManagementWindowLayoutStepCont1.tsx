import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `step_cont_1` of GroupManagementWindowLayout - configured through the parent's `stepCont1` prop. */
export interface GroupManagementWindowLayoutStepCont1Props {
    captionBaseLabel?: string;
    captionBaseWarning?: string;
    captionCreateRoomLinkTxt?: string;
    captionDescLabel?: string;
    captionNameLabel?: string;
    captionStep1MembersTxt?: string;
    groupLogo?: ReactNode;
    layout?: BoxLayout;
    onBaseDropmenu?: () => void;
    onCreateRoomLinkRegion?: () => void;
    onStep1MembersRegion?: () => void;
}

export const GroupManagementWindowLayoutStepCont1 = ({ captionBaseLabel, captionBaseWarning, captionCreateRoomLinkTxt, captionDescLabel, captionNameLabel, captionStep1MembersTxt, groupLogo, layout, onBaseDropmenu, onCreateRoomLinkRegion, onStep1MembersRegion }: GroupManagementWindowLayoutStepCont1Props) => {
    const t = useTranslation();
    const [ nameTxtValue, setNameTxtValue ] = useState('');
    const [ descTxtValue, setDescTxtValue ] = useState('');

    return (
        <Region
            name="step_cont_1"
            layout={{ position: 'absolute', left: 0, right: 7, top: 128, height: 310, ...layout }}
        >
            <Border
                variant="0"
                name="step_1_badge"
                layout={{ position: 'absolute', left: 17, width: 94, top: 11, height: 94 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_logo"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                >
                    {groupLogo}
                </WidgetSlot>
            </Border>
            <Region
                name="step_1_members_region"
                onPointerTap={onStep1MembersRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 17, width: 94, top: 110, height: 18, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionStep1MembersTxt ?? 'Members PH'}
                    textStyle="text-style-u-bold"
                    name="step_1_members_txt"
                    layout={{ position: 'absolute', width: 74, top: 0, height: 17 }}
                />
            </Region>
            <ThemeText
                text={captionNameLabel ?? t('group.edit.name')}
                name="name_label"
                layout={{ position: 'absolute', left: 126, right: 140, top: -8, height: 18 }}
            />
            <TextInput
                value={nameTxtValue}
                onChange={setNameTxtValue}
                maxLength={29}
                layout={{ position: 'absolute', left: 126, right: 0, top: 14, height: 26 }}
            />
            <ThemeText
                text={captionDescLabel ?? t('group.edit.desc')}
                name="desc_label"
                layout={{ position: 'absolute', left: 126, right: 147, top: 52, height: 18 }}
            />
            <TextInput
                value={descTxtValue}
                onChange={setDescTxtValue}
                maxLength={254}
                layout={{ position: 'absolute', left: 126, right: 0, top: 74, height: 80 }}
            />
            <ThemeText
                text={captionBaseLabel ?? t('group.edit.base')}
                name="base_label"
                layout={{ position: 'absolute', left: 126, right: 146, top: 166, height: 18 }}
            />
            <Dropmenu
                variant="0"
                name="base_dropmenu"
                onPointerTap={onBaseDropmenu}
                layout={{ position: 'absolute', left: 126, right: 0, top: 188, height: 26 }}
            />
            <ThemeText
                text={captionBaseWarning ?? t('group.edit.base.warning')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                name="base_warning"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 126, right: 0, top: 214, height: 38 }}
            />
            <Region
                name="create_room_link_region"
                layout={{ position: 'absolute', left: 126, width: 247, top: 252, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                onPointerTap={onCreateRoomLinkRegion}
                cursor="pointer"
            >
                <ThemeText
                    text={captionCreateRoomLinkTxt ?? t('group.createroom')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                />
            </Region>
        </Region>
    );
};
