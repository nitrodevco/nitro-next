import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2909_main_xml` (layout "main", 643x532) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Main_2909LayoutProps {
    layout?: BoxLayout;
    onBullyButton?: () => void;
    onClose?: () => void;
    onEmergencyButton?: () => void;
    onFaqLink?: () => void;
    onHabbowayLink?: () => void;
    onPaymentLink?: () => void;
    onQuestionButton?: () => void;
    onSafetypolicyLink?: () => void;
    onTourButton?: () => void;
}

export const Main_2909Layout = ({ layout, onBullyButton, onClose, onEmergencyButton, onFaqLink, onHabbowayLink, onPaymentLink, onQuestionButton, onSafetypolicyLink, onTourButton }: Main_2909LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            onClose={onClose}
            layout={{ width: 643, height: 532, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', left: 0, width: 641, top: -33, height: 50 }}>
                    <Region layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.subtitle')}
                            textStyle="text-style-il-small-white"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 0, width: 184, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 33, width: 283, top: 32, height: 25 }}
                >
                    <Region layout={{ position: 'absolute', left: 12, width: 112, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.bully.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region layout={{ position: 'absolute', left: 30, width: 144, top: 60, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.bully.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 30, width: 221, top: 80, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.bully.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 221 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="bully_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onBullyButton}
                    layout={{ position: 'absolute', left: 20, width: 166, top: 136, height: 48 }}
                >
                    {t('help.main2.bully.button')}
                </Button>
                <ThemeImage
                    src={layoutImage('help_illustrations_bully.png')}
                    layout={{ position: 'absolute', left: 265, width: 35, top: 59, height: 120 }}
                />
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 344, width: 263, top: 32, height: 25 }}
                >
                    <Region layout={{ position: 'absolute', left: 12, width: 131, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.question.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region layout={{ position: 'absolute', left: 340, width: 164, top: 60, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.question.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 340, width: 191, top: 80, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.question.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="question_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onQuestionButton}
                    layout={{ position: 'absolute', left: 330, width: 186, top: 136, height: 48 }}
                >
                    {t('help.main2.question.button')}
                </Button>
                <ThemeImage
                    src={layoutImage('help_illustrations_question.png')}
                    layout={{ position: 'absolute', left: 511, width: 90, top: 57, height: 128 }}
                />
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 33, width: 283, top: 197, height: 25 }}
                >
                    <Region layout={{ position: 'absolute', left: 12, width: 110, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.tour.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region layout={{ position: 'absolute', left: 30, width: 140, top: 225, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.tour.subtitle')}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 30, width: 201, top: 245, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main2.tour.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 201 }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="tour_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onTourButton}
                    layout={{ position: 'absolute', left: 20, width: 165, top: 308, height: 48 }}
                >
                    {t('help.main2.tour.button')}
                </Button>
                <ThemeImage
                    src={layoutImage('help_illustrations_tour.png')}
                    layout={{ position: 'absolute', left: 162, width: 147, top: 254, height: 109 }}
                />
                <Region layout={{ position: 'absolute', left: 336, width: 271, top: 196, height: 169 }}>
                    <Border
                        variant="104"
                        tintColor="#bb0000"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50 }}
                    >
                        <Region layout={{ position: 'absolute', left: 10, width: 182, top: 6, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.emergency.title')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <Region layout={{ position: 'absolute', left: 10, width: 129, top: 25, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.emergency.subtitle')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </Border>
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 42, bottom: 0 }}>
                        <Border
                            variant="105"
                            layout={{ position: 'absolute', left: 0, right: 0, top: -10, bottom: 0, justifyContent: 'center' }}
                        >
                            <Region layout={{ position: 'absolute', left: 10, width: 251, top: 16, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('help.main2.emergency.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
                                />
                            </Region>
                            <ContainerButton
                                variant="103"
                                name="emergency_button"
                                tintColor="#dd0000"
                                onPointerTap={onEmergencyButton}
                                layout={{ position: 'absolute', width: 183, top: 93, height: 34 }}
                            >
                                <ThemeText
                                    text={t('help.main2.emergency.button')}
                                    textStyle="text-style-il-regular-white"
                                />
                            </ContainerButton>
                        </Border>
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 574, top: 367, height: 25 }}
                >
                    <Region layout={{ position: 'absolute', left: 12, width: 105, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.main2.self.title')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                </WidgetSlot>
                <Border
                    variant="102"
                    layout={{ position: 'absolute', left: 33, width: 575, top: 390, height: 68 }}
                >
                    <Region
                        name="safetypolicy_link"
                        onPointerTap={onSafetypolicyLink}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 191, top: 0, height: 68, justifyContent: 'center' }}
                    >
                        <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 170, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('help.main2.self.safetypolicy')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 190, width: 2, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 49 }}
                    />
                    <Region
                        name="habboway_link"
                        onPointerTap={onHabbowayLink}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 191, width: 193, top: 0, height: 68, justifyContent: 'center' }}
                    >
                        <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 170, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('help.main2.self.habboway')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 384, width: 2, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 49 }}
                    />
                    <Region
                        name="faq_link"
                        onPointerTap={onFaqLink}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 385, width: 190, top: 0, height: 68, justifyContent: 'center' }}
                    >
                        <Region layout={{ position: 'absolute', width: 170, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('help.main2.self.faq')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region
                    name="payment_link"
                    onPointerTap={onPaymentLink}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 541, top: 463, height: 23, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', width: 129, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
