import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1234_verify_xml` (layout "verify", 477x248) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerifyLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onDidNotReceiveCodeLink?: () => void;
    onOkButton?: () => void;
}

export const VerifyLayout = ({ layout, onClose, onDidNotReceiveCodeLink, onOkButton }: VerifyLayoutProps) => {
    const t = useTranslation();
    const [ verificationCodeInputValue, setVerificationCodeInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={32801}
            caption={t('phone.number.verify.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 477, height: 248, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    backgroundColor="#96bdcb"
                    layout={{ position: 'absolute', left: -2, width: 476, top: -3, height: 100 }}
                >
                    <Region
                        params={2048}
                        backgroundColor="#6f95a4"
                        layout={{ position: 'absolute', left: 2, width: 472, top: 2, height: 95 }}
                    />
                </Region>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 471, top: 0, height: 208 }}
                >
                    <Region layout={{ position: 'absolute', left: 8, width: 455, top: 8, height: 81 }}>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 70, width: 384, top: 0, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('phone.number.verify.enter.verification.code')}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <ThemeImage
                            name="phone"
                            src="${image.library.url}returnusergifting/phone.png"
                            layout={{ position: 'absolute', left: 16, width: 32, top: 2, height: 69 }}
                        />
                    </Region>
                    <Region
                        name="input_border"
                        params={144}
                        layout={{ position: 'absolute', left: 8, width: 458, top: 99, height: 50 }}
                    >
                        <Border
                            variant="4"
                            params={16}
                            layout={{ position: 'absolute', left: 12, width: 266, top: 7, height: 35 }}
                        >
                            <TextInput
                                value={verificationCodeInputValue}
                                onChange={setVerificationCodeInputValue}
                                layout={{ position: 'absolute', left: 6, width: 255, top: 3, height: 26 }}
                            />
                            <ThemeImage
                                name="pen"
                                params={16}
                                src={layoutImage('common_small_pen.png')}
                                layout={{ position: 'absolute', left: 243, width: 17, top: 9, height: 18 }}
                            />
                        </Border>
                        <ButtonThick
                            variant="5"
                            name="ok_button"
                            params={131089}
                            tintColor="#6fcf6f"
                            onPointerTap={onOkButton}
                            layout={{ position: 'absolute', left: 293, width: 160, top: 5, height: 38 }}
                        >
                            {t('phone.number.verify.try')}
                        </ButtonThick>
                    </Region>
                    <Region
                        name="user_input_buttons_container"
                        params={144}
                        layout={{ position: 'absolute', left: 8, width: 457, top: 159, height: 42 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 457, top: 0, height: 42 }}
                        />
                        <Region
                            name="did_not_receive_code_link"
                            params={786625}
                            layout={{ position: 'absolute', left: 3, width: 450, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            onPointerTap={onDidNotReceiveCodeLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={t('phone.number.verify.did.not.receive.code')}
                                textStyle="text-style-u-bold"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="retry_wait_label"
                            params={786625}
                            visible={false}
                            layout={{ position: 'absolute', left: 10, width: 436, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="HeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHeheeHehee"
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
