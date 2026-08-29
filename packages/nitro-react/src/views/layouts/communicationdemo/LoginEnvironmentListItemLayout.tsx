import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2877_login_environment_list_item_xml` (layout "login_user_list_item", 172x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LoginEnvironmentListItemLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
    srcIcon?: string;
}

export const LoginEnvironmentListItemLayout = ({ captionTitle, layout, srcIcon }: LoginEnvironmentListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 172, height: 20, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 172, top: 0, height: 20, minWidth: 172, maxWidth: 172 }}>
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 20, width: 27, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'title'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('illumina_light_separator.png')}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                />
            </Region>
        </Region>
    );
};
