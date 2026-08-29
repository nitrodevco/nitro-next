import { useTranslation } from '#base/context';
import { BoxLayout, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { GroupManagementWindowLayoutStepsHeaderCont, GroupManagementWindowLayoutStepsHeaderContProps } from './GroupManagementWindowLayoutStepsHeaderCont';

/** Named region `header_cont` of GroupManagementWindowLayout - configured through the parent's `headerCont` prop. */
export interface GroupManagementWindowLayoutHeaderContProps {
    captionHeaderCaptionTxt?: string;
    captionHeaderDescTxt?: string;
    layout?: BoxLayout;
    onEditTab1?: () => void;
    onEditTab2?: () => void;
    onEditTab3?: () => void;
    onEditTab5?: () => void;
    selectedEditGuildTabContext?: string;
    srcHeaderPicBitmapStep1?: string;
    srcHeaderPicBitmapStep2?: string;
    srcHeaderPicBitmapStep3?: string;
    srcHeaderPicBitmapStep4?: string;
    srcHeaderPicBitmapStep5?: string;
    srcHeaderPicBitmapStep6?: string;
    stepsHeaderCont?: GroupManagementWindowLayoutStepsHeaderContProps;
    tintHeaderPicBitmapStep6?: string;
    visibleStepsHeaderCont?: boolean;
}

export const GroupManagementWindowLayoutHeaderCont = ({ captionHeaderCaptionTxt, captionHeaderDescTxt, layout, onEditTab1, onEditTab2, onEditTab3, onEditTab5, selectedEditGuildTabContext, srcHeaderPicBitmapStep1, srcHeaderPicBitmapStep2, srcHeaderPicBitmapStep3, srcHeaderPicBitmapStep4, srcHeaderPicBitmapStep5, srcHeaderPicBitmapStep6, stepsHeaderCont, tintHeaderPicBitmapStep6, visibleStepsHeaderCont }: GroupManagementWindowLayoutHeaderContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_cont"
            layout={{ position: 'absolute', left: 0, right: 1, top: 0, height: 110, ...layout }}
        >
            <Region
                backgroundColor="#b3b099"
                layout={{ position: 'absolute', left: 1, right: 0, top: 0, bottom: 0 }}
            />
            <TabContext
                variant="0"
                name="edit_guild_tab_context"
                layout={{ position: 'absolute', left: -6, right: -5, top: 89, bottom: 0 }}
            >
                <TabButton
                    variant="0"
                    name="edit_tab_1"
                    selected={selectedEditGuildTabContext === 'edit_tab_1'}
                    onPointerTap={onEditTab1}
                    layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.1')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_2"
                    selected={selectedEditGuildTabContext === 'edit_tab_2'}
                    onPointerTap={onEditTab2}
                    layout={{ position: 'absolute', left: 97, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.2')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_3"
                    selected={selectedEditGuildTabContext === 'edit_tab_3'}
                    onPointerTap={onEditTab3}
                    layout={{ position: 'absolute', left: 198, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.3')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_5"
                    selected={selectedEditGuildTabContext === 'edit_tab_5'}
                    onPointerTap={onEditTab5}
                    layout={{ position: 'absolute', left: 299, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.5')}
                </TabButton>
            </TabContext>
            {(visibleStepsHeaderCont ?? false) && (
                <GroupManagementWindowLayoutStepsHeaderCont {...stepsHeaderCont} />
            )}
            <ThemeImage
                name="header_pic_bitmap_step_1"
                src={srcHeaderPicBitmapStep1 ?? '${image.library.url}guilds/group_UI_identity.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_2"
                src={srcHeaderPicBitmapStep2 ?? '${image.library.url}guilds/group_UI_badge.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_3"
                src={srcHeaderPicBitmapStep3 ?? '${image.library.url}guilds/group_UI_colors.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_4"
                src={srcHeaderPicBitmapStep4 ?? '${image.library.url}guilds/group_UI_ready.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_5"
                src={srcHeaderPicBitmapStep5 ?? '${image.library.url}guilds/group_UI_ready.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_6"
                src={srcHeaderPicBitmapStep6}
                tint={tintHeaderPicBitmapStep6}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <Region
                name="header_caption_txt"
                layout={{ position: 'absolute', left: 126, right: 2, top: 43, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderCaptionTxt ?? 'Caption PH'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 263 }}
                />
            </Region>
            <Region
                name="header_desc_txt"
                layout={{ position: 'absolute', left: 126, right: 33, top: 69, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderDescTxt ?? 'Desc PH'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 232 }}
                />
            </Region>
        </Region>
    );
};
