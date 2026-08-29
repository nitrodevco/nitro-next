import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `846_effectbox_xml` (layout "effectbox", 475x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectboxLayoutProps {
    captionCancel?: string;
    captionEffectboxHeaderDescription?: string;
    captionEffectboxHeaderTitle?: string;
    effectboxHeaderBackgroundBody?: ReactNode;
    layout?: BoxLayout;
    onCancel?: () => void;
    onClose?: () => void;
    onOk?: () => void;
    srcEffectboxHeaderIcon?: string;
}

export const EffectboxLayout = ({ captionCancel, captionEffectboxHeaderDescription, captionEffectboxHeaderTitle, effectboxHeaderBackgroundBody, layout, onCancel, onClose, onOk, srcEffectboxHeaderIcon }: EffectboxLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="effectbox_main_container"
            name="effectbox_main_container"
            caption={t('effectbox.name.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 475, height: 193, ...layout }}
        >
            <Region
                name="effectbox.header.background.border"
                backgroundColor="#376275"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 100 }}
            >
                <Region
                    name="effectbox.header.background.body"
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 95 }}
                >
                    {effectboxHeaderBackgroundBody}
                </Region>
                <ThemeImage
                    name="effectbox.header.icon"
                    src={srcEffectboxHeaderIcon ?? '${image.library.url}client_static/frank1.png'}
                    layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
                />
                <Region
                    name="effectbox.header"
                    layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90 }}
                >
                    <Region
                        name="effectbox.header.title"
                        layout={{ position: 'absolute', left: 95, width: 260, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEffectboxHeaderTitle ?? t('effectbox.header.title')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="effectbox.header.description"
                        layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEffectboxHeaderDescription ?? t('effectbox.header.description')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: -1, width: 475, top: 101, height: 51 }}>
                <Region
                    name="cancel"
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 177, width: 101, bottom: 8, height: 32, justifyContent: 'center' }}
                >
                    <Region
                        name="cancel"
                        layout={{ position: 'absolute', width: 83, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCancel ?? t('generic.cancel')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </Region>
                <ButtonThick
                    variant="5"
                    name="ok"
                    tintColor="#00aa00"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', left: 319, width: 130, bottom: 8, height: 33, minWidth: 130 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
