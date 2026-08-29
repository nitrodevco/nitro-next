import { Border, BoxLayout, Region } from '#base/theme';

import { UserInfoLayoutFields, UserInfoLayoutFieldsProps } from './UserInfoLayoutFields';

/** Generated from `1122_user_info_xml` (layout "user_info", 280x194) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserInfoLayoutProps {
    captionLoadingTxt?: string;
    fields?: UserInfoLayoutFieldsProps;
    layout?: BoxLayout;
    visibleLoadingTxt?: boolean;
}

export const UserInfoLayout = ({ captionLoadingTxt, fields, layout, visibleLoadingTxt }: UserInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 280, height: 194, ...layout }}>
            <Border
                variant="0"
                name="user_info"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -8 }}
            >
                {(visibleLoadingTxt ?? false) && (
                    <Region
                        name="loading_txt"
                        layout={{ position: 'absolute', left: 120, width: 70, top: 45, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#ffffff"
                    >
                        {captionLoadingTxt ?? 'Loading...'}
                    </Region>
                )}
                <UserInfoLayoutFields {...fields} />
            </Border>
        </Region>
    );
};
