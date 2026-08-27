import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2901_pending_instructions_request_xml` (layout "pending_instructions_request", 369x201) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingInstructionsRequestLayoutProps {
    captionDescription?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const PendingInstructionsRequestLayout = ({ captionDescription, layout, onClose, onCloseButton }: PendingInstructionsRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            params={163841}
            caption={t('guide.pending.instructions.title')}
            onClose={onClose}
            layout={{ width: 369, height: 201, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 8, top: 2, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 236, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.instructions.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#c30000' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 295, height: 24, flexShrink: 0, minWidth: 295, maxWidth: 295, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.instructions.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                        />
                    </Region>
                    <Border
                        variant="102"
                        params={147472}
                        layout={{ width: 295, height: 61, flexShrink: 0, minWidth: 295, maxWidth: 295 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 13, width: 169, top: 12, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.pending.instructions.report')}
                                textStyle="text-style-il-border"
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ position: 'absolute', left: 13, top: 30, flexDirection: 'column', gap: 3 }}
                        >
                            <Region
                                name="description"
                                params={16}
                                layout={{ width: 269, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionDescription ?? ''}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 269 }}
                                />
                            </Region>
                            <WidgetSlot
                                widgetType="updating_timestamp"
                                name="timestamp"
                                params={147472}
                                layout={{ width: 4, height: 4, flexShrink: 0 }}
                            />
                            <Region
                                params={16}
                                layout={{ width: 30, height: 7, flexShrink: 0 }}
                            />
                        </Region>
                    </Border>
                    <Region
                        params={16}
                        layout={{ width: 370, height: 52, flexShrink: 0 }}
                    >
                        <Button
                            variant="101"
                            name="close_button"
                            params={131281}
                            tintColor="#bbbbbb"
                            onPointerTap={onCloseButton}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -70, width: 140, top: 0, height: 48 }}
                        >
                            {t('alert.close.button')}
                        </Button>
                    </Region>
                </Region>
                <ThemeImage
                    params={1024}
                    src={layoutImage('help_illustrations_question.png')}
                    layout={{ position: 'absolute', left: 285, width: 90, bottom: 33, height: 128 }}
                />
            </Region>
        </Frame>
    );
};
