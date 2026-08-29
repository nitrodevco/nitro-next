import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { UserCreateLayoutList, UserCreateLayoutListProps } from './UserCreateLayoutList';

/** Generated from `2886_user_create_xml` (layout "user_create", 282x295) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserCreateLayoutProps {
    layout?: BoxLayout;
    list?: UserCreateLayoutListProps;
    onClose?: () => void;
}

export const UserCreateLayout = ({ layout, list, onClose }: UserCreateLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_create"
            name="user_create"
            caption={t('guide.help.request.user.create.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 282, height: 295, minWidth: 282, maxWidth: 282, minHeight: 50, ...layout }}
        >
            <UserCreateLayoutList {...list} />
        </Frame>
    );
};
