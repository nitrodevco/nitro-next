import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1231_verify_minimized_xml` (layout "verify_minimized", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerifyMinimizedLayoutProps {
    layout?: BoxLayout;
}

export const VerifyMinimizedLayout = ({ layout }: VerifyMinimizedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                name="verify_minimized"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <Border
                    variant="6"
                    tags={[ 'BGCOLOR' ]}
                    params={16}
                    tintColor="#686661"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 22 }}
                >
                    <Border
                        variant="3"
                        params={16}
                        tintColor="#201e19"
                        blend={0.8}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="6"
                    params={16}
                    tintColor="#96bdcb"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        name="club_icon"
                        tags={[ 'ICON' ]}
                        params={16}
                        src="${image.library.url}returnusergifting/phone_smaller.png"
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 154, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('phone.number.verify.title')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        </Region>
    );
};
