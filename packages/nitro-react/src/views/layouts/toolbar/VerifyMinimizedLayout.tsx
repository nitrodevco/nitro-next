import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1231_verify_minimized_xml` (layout "verify_minimized", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerifyMinimizedLayoutProps {
    layout?: BoxLayout;
    onVerifyMinimized?: () => void;
    srcClubIcon?: string;
}

export const VerifyMinimizedLayout = ({ layout, onVerifyMinimized, srcClubIcon }: VerifyMinimizedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                name="verify_minimized"
                onPointerTap={onVerifyMinimized}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <Border
                    variant="6"
                    tintColor="#686661"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                {/* `border` is hidden and has no name to show it by */}
                <Border
                    variant="6"
                    tintColor="#96bdcb"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        name="club_icon"
                        src={srcClubIcon ?? '${image.library.url}returnusergifting/phone_smaller.png'}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <Region layout={{ position: 'absolute', left: 10, width: 154, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('phone.number.verify.title')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        </Region>
    );
};
