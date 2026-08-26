import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `846_effectbox_xml` (layout "effectbox", 475x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectboxLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const EffectboxLayout = ({ layout, onClose, onOk }: EffectboxLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="effectbox_main_container"
            name="effectbox_main_container"
            params={32801}
            caption={t('effectbox.name.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 475, height: 193, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="effectbox.header.background.border"
                    params={144}
                    backgroundColor="#376275"
                    layout={{ position: 'absolute', left: 1, width: 473, top: 0, height: 100 }}
                >
                    <Region
                        name="effectbox.header.background.body"
                        params={144}
                        backgroundColor="#0e3f52"
                        layout={{ position: 'absolute', left: 2, width: 469, top: 2, height: 95 }}
                    />
                    <ThemeImage
                        name="effectbox.header.icon"
                        params={16}
                        src="${image.library.url}client_static/frank1.png"
                        layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
                    />
                    <Region
                        name="effectbox.header"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90 }}
                    >
                        <Region
                            name="effectbox.header.title"
                            params={16}
                            layout={{ position: 'absolute', left: 95, width: 260, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('effectbox.header.title')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="effectbox.header.description"
                            params={16}
                            layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('effectbox.header.description')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: -1, width: 475, top: 101, height: 51 }}
                >
                    <Region
                        name="cancel"
                        params={1041}
                        layout={{ position: 'absolute', left: 177, width: 101, top: 11, height: 32 }}
                    >
                        <Region
                            name="cancel"
                            params={3280}
                            layout={{ position: 'absolute', left: 9, width: 83, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('generic.cancel')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="ok"
                        params={132113}
                        tintColor="#00aa00"
                        onPointerTap={onOk}
                        layout={{ position: 'absolute', left: 319, width: 130, top: 10, height: 33, minWidth: 130 }}
                    >
                        {t('generic.ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
