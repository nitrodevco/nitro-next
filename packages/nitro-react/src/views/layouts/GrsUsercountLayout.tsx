import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3090_grs_usercount_xml` (layout "usercount", 34x13) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsUsercountLayoutProps {
    layout?: BoxLayout;
}

export const GrsUsercountLayout = ({ layout }: GrsUsercountLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 34, height: 13, ...layout }}>
            <Region
                name="usercount"
                params={81}
                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 13 }}
            >
                <ThemeImage
                    name="usercount_bg"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 13 }}
                />
                <Region
                    name="txt"
                    params={786448}
                    layout={{ position: 'absolute', left: 20, width: 9, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="0"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
