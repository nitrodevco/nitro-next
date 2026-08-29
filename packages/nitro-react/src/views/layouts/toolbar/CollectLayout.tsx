import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Droplist, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1252_collect_xml` (layout "collect", 477x440) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectLayoutProps {
    captionCollectSummary?: string;
    captionNeverLink?: string;
    captionSkipLink?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onNeverLink?: () => void;
    onOkButton?: () => void;
    onSkipLink?: () => void;
    srcClubIcon?: string;
}

export const CollectLayout = ({ captionCollectSummary, captionNeverLink, captionSkipLink, layout, onClose, onNeverLink, onOkButton, onSkipLink, srcClubIcon }: CollectLayoutProps) => {
    const t = useTranslation();
    const [ phoneNumberInputValue, setPhoneNumberInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('phone.number.collect.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 477, height: 440, ...layout }}
        >
            <Region
                backgroundColor="#96bdcb"
                layout={{ position: 'absolute', left: -2, right: 4, top: -3, height: 198 }}
            >
                <Region
                    backgroundColor="#6f95a4"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 194 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 471, top: 0, height: 400, justifyContent: 'center' }}>
                <ButtonThick
                    variant="5"
                    name="ok_button"
                    tintColor="#4faf4f"
                    onPointerTap={onOkButton}
                    layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 219, top: 266, height: 38, minWidth: 219, maxWidth: 219 }}
                >
                    {t('phone.number.collect.send.button')}
                </ButtonThick>
                <Region layout={{ position: 'absolute', left: 8, right: 2, top: 8, bottom: 210 }}>
                    <ThemeImage
                        name="club_icon"
                        src={srcClubIcon ?? '${image.library.url}returnusergifting/phone_frank.png'}
                        layout={{ position: 'absolute', left: 6, width: 71, top: 0, height: 89 }}
                    />
                    <Region
                        name="collect_summary"
                        layout={{ position: 'absolute', left: 90, width: 360, top: 0, height: 178, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCollectSummary ?? t('phone.number.collect.summary')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 360 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="phone_number_input_border"
                    layout={{ position: 'absolute', left: 8, right: -1, top: 200, height: 61 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 167, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('phone.number.collect.select.country')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 213, width: 165, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('phone.number.collect.input.number')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 213, width: 244, top: 18, height: 42 }}>
                        <Border
                            variant="4"
                            layout={{ position: 'absolute', left: 0, width: 244, top: 0, height: 38 }}
                        >
                            <TextInput
                                value={phoneNumberInputValue}
                                onChange={setPhoneNumberInputValue}
                                layout={{ position: 'absolute', left: 7, width: 180, top: 6, height: 26, maxWidth: 240 }}
                            />
                            <ThemeImage
                                src={layoutImage('common_small_pen.png')}
                                layout={{ position: 'absolute', left: 222, width: 17, top: 11, height: 18 }}
                            />
                        </Border>
                    </Region>
                </Region>
            </Region>
            <Droplist
                variant="3"
                name="country_list"
                layout={{ position: 'absolute', left: 8, width: 204, top: 218, height: 38 }}
            >
                Choose country
            </Droplist>
            <Region
                name="user_input_buttons_container"
                layout={{ position: 'absolute', left: 2, right: 7, top: 308, height: 87, justifyContent: 'center' }}
            >
                <Border
                    variant="3"
                    layout={{ position: 'absolute', left: 4, width: 461, top: 8, height: 78 }}
                />
                <Region
                    name="user_input_buttons"
                    layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 460, top: 15, height: 64, justifyContent: 'center' }}
                >
                    <Region
                        name="skip_link"
                        layout={{ position: 'absolute', width: 460, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onSkipLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionSkipLink ?? t('phone.number.collect.skip')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="never_link"
                        layout={{ position: 'absolute', width: 460, top: 34, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onNeverLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionNeverLink ?? t('phone.number.collect.never.again')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
