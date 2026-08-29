import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `846_effectbox_xml` (layout "effectbox", 475x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EffectboxLayoutProps {
    cancel?: EffectboxLayoutCancelProps;
    effectboxHeaderBackgroundBorder?: EffectboxLayoutEffectboxHeaderBackgroundBorderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const EffectboxLayout = ({ cancel, effectboxHeaderBackgroundBorder, layout, onClose, onOk }: EffectboxLayoutProps) => {
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
                <EffectboxLayoutEffectboxHeaderBackgroundBorder {...effectboxHeaderBackgroundBorder} />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: -1, width: 475, top: 101, height: 51 }}
                >
                    <EffectboxLayoutCancel {...cancel} />
                    <ButtonThick
                        variant="5"
                        name="ok"
                        params={132113}
                        tintColor="#00aa00"
                        onPointerTap={onOk}
                        layout={{ position: 'absolute', left: 319, width: 130, bottom: 8, height: 33, minWidth: 130 }}
                    >
                        {t('generic.ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `effectbox.header.background.body` of EffectboxLayout - configured through the parent's `effectboxHeaderBackgroundBody` prop. */
export interface EffectboxLayoutEffectboxHeaderBackgroundBodyProps {
    layout?: BoxLayout;
}

export const EffectboxLayoutEffectboxHeaderBackgroundBody = ({ layout }: EffectboxLayoutEffectboxHeaderBackgroundBodyProps) => {
    return (
        <Region
            name="effectbox.header.background.body"
            params={144}
            backgroundColor="#0e3f52"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 95, ...layout }}
        />
    );
};

/** Named region `effectbox.header` of EffectboxLayout - configured through the parent's `effectboxHeader` prop. */
export interface EffectboxLayoutEffectboxHeaderProps {
    captionEffectboxHeaderDescription?: string;
    captionEffectboxHeaderTitle?: string;
    layout?: BoxLayout;
}

export const EffectboxLayoutEffectboxHeader = ({ captionEffectboxHeaderDescription, captionEffectboxHeaderTitle, layout }: EffectboxLayoutEffectboxHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effectbox.header"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90, ...layout }}
        >
            <Region
                name="effectbox.header.title"
                params={16}
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
                params={16}
                layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEffectboxHeaderDescription ?? t('effectbox.header.description')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `effectbox.header.background.border` of EffectboxLayout - configured through the parent's `effectboxHeaderBackgroundBorder` prop. */
export interface EffectboxLayoutEffectboxHeaderBackgroundBorderProps {
    effectboxHeader?: EffectboxLayoutEffectboxHeaderProps;
    effectboxHeaderBackgroundBody?: EffectboxLayoutEffectboxHeaderBackgroundBodyProps;
    layout?: BoxLayout;
    srcEffectboxHeaderIcon?: string;
}

export const EffectboxLayoutEffectboxHeaderBackgroundBorder = ({ effectboxHeader, effectboxHeaderBackgroundBody, layout, srcEffectboxHeaderIcon }: EffectboxLayoutEffectboxHeaderBackgroundBorderProps) => {
    return (
        <Region
            name="effectbox.header.background.border"
            params={144}
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 100, ...layout }}
        >
            <EffectboxLayoutEffectboxHeaderBackgroundBody {...effectboxHeaderBackgroundBody} />
            <ThemeImage
                name="effectbox.header.icon"
                params={16}
                src={srcEffectboxHeaderIcon ?? '${image.library.url}client_static/frank1.png'}
                layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
            />
            <EffectboxLayoutEffectboxHeader {...effectboxHeader} />
        </Region>
    );
};

/** Named region `cancel` of EffectboxLayout - configured through the parent's `cancel` prop. */
export interface EffectboxLayoutCancelProps {
    captionCancel?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
}

export const EffectboxLayoutCancel = ({ captionCancel, layout, onCancel }: EffectboxLayoutCancelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel"
            params={1041}
            onPointerTap={onCancel}
            cursor="pointer"
            layout={{ position: 'absolute', left: 177, width: 101, bottom: 8, height: 32, justifyContent: 'center', ...layout }}
        >
            <Region
                name="cancel"
                params={3280}
                layout={{ position: 'absolute', width: 83, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCancel ?? t('generic.cancel')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
        </Region>
    );
};
