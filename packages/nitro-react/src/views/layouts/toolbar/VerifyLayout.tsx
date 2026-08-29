import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1234_verify_xml` (layout "verify", 477x248) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerifyLayoutProps {
    captionDidNotReceiveCodeLink?: string;
    captionRetryWaitLabel?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onDidNotReceiveCodeLink?: () => void;
    onOkButton?: () => void;
    srcPen?: string;
    srcPhone?: string;
    visibleRetryWaitLabel?: boolean;
}

export const VerifyLayout = ({ captionDidNotReceiveCodeLink, captionRetryWaitLabel, layout, onClose, onDidNotReceiveCodeLink, onOkButton, srcPen, srcPhone, visibleRetryWaitLabel }: VerifyLayoutProps) => {
    const t = useTranslation();
    const [ verificationCodeInputValue, setVerificationCodeInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('phone.number.verify.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 477, height: 248, ...layout }}
        >
            <Region
                backgroundColor="#96bdcb"
                layout={{ position: 'absolute', left: -2, width: 476, top: -3, height: 100 }}
            >
                <Region
                    backgroundColor="#6f95a4"
                    layout={{ position: 'absolute', left: 2, width: 472, top: 2, bottom: 3 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, right: 6, top: 0, bottom: 40 }}>
                <Region layout={{ position: 'absolute', left: 8, width: 455, top: 8, height: 81 }}>
                    <Region layout={{ position: 'absolute', left: 70, width: 384, top: 0, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('phone.number.verify.enter.verification.code')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="phone"
                        src={srcPhone ?? '${image.library.url}returnusergifting/phone.png'}
                        layout={{ position: 'absolute', left: 16, width: 32, top: 2, height: 69 }}
                    />
                </Region>
                <Region
                    name="input_border"
                    layout={{ position: 'absolute', left: 8, right: 5, top: 99, height: 50 }}
                >
                    <Border
                        variant="4"
                        layout={{ position: 'absolute', left: 12, width: 266, top: 7, height: 35 }}
                    >
                        <TextInput
                            value={verificationCodeInputValue}
                            onChange={setVerificationCodeInputValue}
                            layout={{ position: 'absolute', left: 6, width: 255, top: 3, height: 26 }}
                        />
                        <ThemeImage
                            name="pen"
                            src={srcPen ?? layoutImage('common_small_pen.png')}
                            layout={{ position: 'absolute', left: 243, width: 17, top: 9, height: 18 }}
                        />
                    </Border>
                    <ButtonThick
                        variant="5"
                        name="ok_button"
                        tintColor="#6fcf6f"
                        onPointerTap={onOkButton}
                        layout={{ position: 'absolute', left: 293, width: 160, top: 5, height: 38 }}
                    >
                        {t('phone.number.verify.try')}
                    </ButtonThick>
                </Region>
                <Region
                    name="user_input_buttons_container"
                    layout={{ position: 'absolute', left: 8, right: 6, top: 159, height: 42, justifyContent: 'center' }}
                >
                    <Border
                        variant="3"
                        layout={{ position: 'absolute', left: 0, width: 457, top: 0, height: 42 }}
                    />
                    <Region
                        name="did_not_receive_code_link"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 450, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onDidNotReceiveCodeLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionDidNotReceiveCodeLink ?? t('phone.number.verify.did.not.receive.code')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    {(visibleRetryWaitLabel ?? false) && (
                        <Region
                            name="retry_wait_label"
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 436, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRetryWaitLabel ?? 'HeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHehee'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
