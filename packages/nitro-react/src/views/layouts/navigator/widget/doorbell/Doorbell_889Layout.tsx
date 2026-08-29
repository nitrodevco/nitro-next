import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `889_doorbell_xml` (layout "doorbell", 249x165) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Doorbell_889LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    userListContainer?: Doorbell_889LayoutUserListContainerProps;
}

export const Doorbell_889Layout = ({ layout, onClose, userListContainer }: Doorbell_889LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widgets.doorbell.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 249, height: 165, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 10, right: 24, top: 13, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('widgets.doorbell.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                    />
                </Region>
                <Doorbell_889LayoutUserListContainer {...userListContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `user_list` of Doorbell_889Layout - configured through the parent's `userList` prop. */
export interface Doorbell_889LayoutUserListProps {
    layout?: BoxLayout;
}

export const Doorbell_889LayoutUserList = ({ layout }: Doorbell_889LayoutUserListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 82, ...layout }}
        >
            <Region
                name="user_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `user_list_container` of Doorbell_889Layout - configured through the parent's `userListContainer` prop. */
export interface Doorbell_889LayoutUserListContainerProps {
    layout?: BoxLayout;
    userList?: Doorbell_889LayoutUserListProps;
}

export const Doorbell_889LayoutUserListContainer = ({ layout, userList }: Doorbell_889LayoutUserListContainerProps) => {
    return (
        <Region
            name="user_list_container"
            backgroundColor="#eaece8"
            layout={{ position: 'absolute', left: 10, width: 217, top: 48, height: 82, ...layout }}
        >
            <Doorbell_889LayoutUserList {...userList} />
            {/* <scrollbar_vertical> for user_list - rendered by that list's ScrollArea */}
        </Region>
    );
};
