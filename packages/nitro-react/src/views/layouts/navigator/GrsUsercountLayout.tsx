import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3090_grs_usercount_xml` (layout "usercount", 34x13) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsUsercountLayoutProps {
    captionTxt?: string;
    layout?: BoxLayout;
    onUsercount?: () => void;
    srcUsercountBg?: string;
}

export const GrsUsercountLayout = ({ captionTxt, layout, onUsercount, srcUsercountBg }: GrsUsercountLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 34, height: 13, ...layout }}>
            <Region
                name="usercount"
                params={81}
                onPointerTap={onUsercount}
                cursor="pointer"
                layout={{ position: 'absolute', right: 0, width: 34, top: 0, height: 13, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="usercount_bg"
                    params={16}
                    src={srcUsercountBg}
                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 13 }}
                />
                <Region
                    name="txt"
                    params={786448}
                    layout={{ position: 'absolute', marginLeft: 7.5, marginRight: -7.5, width: 9, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTxt ?? '0'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
