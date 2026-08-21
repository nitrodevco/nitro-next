import { useOwnUserInfo, useTranslation } from "#base/context";
import { Frame, TabButton, TabContext } from "#base/theme";

export const AvatarEditorView = () => {
    const { name, figure, sex } = useOwnUserInfo();
    const t = useTranslation();

    return (
        <Frame id="avatar-editor" resizeDirection="y" variant="3" className="w-122.5 h-121" caption={t('avatareditor.title')} >
            <div className="flex items-center justify-center bg-[#0e3f52] text-[28px] text-white text-style-headline-big h-27.5">
                <span>{name}</span>
            </div>
            <TabContext data-name="tabs">
                <TabButton>test</TabButton>
            </TabContext>
        </Frame>
    );
}