import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2909_main_xml` (layout "main", 643x532) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Main_2909LayoutProps {
    layout?: BoxLayout;
    onBullyButton?: () => void;
    onClose?: () => void;
    onEmergencyButton?: () => void;
    onQuestionButton?: () => void;
    onTourButton?: () => void;
}

export const Main_2909Layout = ({ layout, onBullyButton, onClose, onEmergencyButton, onQuestionButton, onTourButton }: Main_2909LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            params={1}
            onClose={onClose}
            layout={{ width: 643, height: 532, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 0, width: 641, top: -33, height: 50 }}>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.subtitle')}
                            textStyle="text-style-il-small-white"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 184, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 283, top: 32, height: 25 }}
                >
                    <Region
                        params={3088}
                        layout={{ position: 'absolute', left: 12, width: 112, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.bully.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 30, width: 144, top: 60, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.bully.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 30, width: 221, top: 80, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.bully.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="bully_button"
                    params={131089}
                    tintColor="#bbbbbb"
                    onPointerTap={onBullyButton}
                    layout={{ position: 'absolute', left: 20, width: 166, top: 136, height: 48 }}
                >
                    {t('help.main2.bully.button')}
                </Button>
                <ThemeImage
                    params={16}
                    src={layoutImage('help_illustrations_bully.png')}
                    layout={{ position: 'absolute', left: 265, width: 35, top: 59, height: 120 }}
                />
                <WidgetSlot
                    widgetType="separator"
                    params={16}
                    layout={{ position: 'absolute', left: 344, width: 263, top: 32, height: 25 }}
                >
                    <Region
                        params={3088}
                        layout={{ position: 'absolute', left: 12, width: 131, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.question.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 340, width: 164, top: 60, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.question.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 340, width: 191, top: 80, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.question.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="question_button"
                    params={131089}
                    tintColor="#bbbbbb"
                    onPointerTap={onQuestionButton}
                    layout={{ position: 'absolute', left: 330, width: 186, top: 136, height: 48 }}
                >
                    {t('help.main2.question.button')}
                </Button>
                <ThemeImage
                    params={16}
                    src={layoutImage('help_illustrations_question.png')}
                    layout={{ position: 'absolute', left: 511, width: 90, top: 57, height: 128 }}
                />
                <WidgetSlot
                    widgetType="separator"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 283, top: 197, height: 25 }}
                >
                    <Region
                        params={3088}
                        layout={{ position: 'absolute', left: 12, width: 110, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.tour.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 30, width: 140, top: 225, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.tour.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 30, width: 201, top: 245, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.main2.tour.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 201 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="tour_button"
                    params={131089}
                    tintColor="#bbbbbb"
                    onPointerTap={onTourButton}
                    layout={{ position: 'absolute', left: 20, width: 165, top: 308, height: 48 }}
                >
                    {t('help.main2.tour.button')}
                </Button>
                <ThemeImage
                    params={16}
                    src={layoutImage('help_illustrations_tour.png')}
                    layout={{ position: 'absolute', left: 162, width: 147, top: 254, height: 109 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 336, width: 271, top: 196, height: 169 }}
                >
                    <Border
                        variant="104"
                        params={144}
                        tintColor="#bb0000"
                        layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 50 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 182, top: 6, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('help.main2.emergency.title')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 129, top: 25, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('help.main2.emergency.subtitle')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </Border>
                    <Region
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 271, top: 42, height: 127 }}
                    >
                        <Border
                            variant="105"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, width: 271, top: -10, height: 137 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 10, width: 251, top: 16, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('help.main2.emergency.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
                                />
                            </Region>
                            <ContainerButton
                                variant="103"
                                name="emergency_button"
                                params={147665}
                                tintColor="#dd0000"
                                onPointerTap={onEmergencyButton}
                                layout={{ position: 'absolute', left: 44, width: 183, top: 93, height: 34 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 183, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('help.main2.emergency.button')}
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </ContainerButton>
                        </Border>
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    params={208}
                    layout={{ position: 'absolute', left: 33, width: 574, top: 367, height: 25 }}
                >
                    <Region
                        params={3088}
                        layout={{ position: 'absolute', left: 12, width: 105, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.self.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Border
                    variant="102"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 575, top: 390, height: 68 }}
                >
                    <Region
                        name="safetypolicy_link"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 191, top: 0, height: 68 }}
                    >
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', left: 10, width: 170, top: 24, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('help.main2.self.safetypolicy')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        params={3088}
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 190, width: 2, top: 10, height: 49 }}
                    />
                    <Region
                        name="habboway_link"
                        params={17}
                        layout={{ position: 'absolute', left: 191, width: 193, top: 0, height: 68 }}
                    >
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', left: 11, width: 170, top: 24, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('help.main2.self.habboway')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        params={3088}
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 384, width: 2, top: 10, height: 49 }}
                    />
                    <Region
                        name="faq_link"
                        params={17}
                        layout={{ position: 'absolute', left: 385, width: 190, top: 0, height: 68 }}
                    >
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', left: 10, width: 170, top: 24, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('help.main2.self.faq')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region
                    name="payment_link"
                    params={209}
                    layout={{ position: 'absolute', left: 50, width: 541, top: 463, height: 23 }}
                >
                    <Region
                        params={3280}
                        layout={{ position: 'absolute', left: 206, width: 129, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main2.self.payment')}
                            textStyle="text-style-il-link-regular"
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
