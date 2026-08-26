import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1610_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1610LayoutProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
}

export const LayoutTrophies_1610Layout = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton }: LayoutTrophies_1610LayoutProps) => {
    const t = useTranslation();
    const [ inputTextValue, setInputTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_trophies"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="trophy.description"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('loremipsum.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                    />
                </Region>
                <Region
                    name="trophyWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 145, height: 135 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={2192}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 135 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="ctlg_prevmodel_button"
                        params={393233}
                        onPointerTap={onCtlgPrevmodelButton}
                        layout={{ position: 'absolute', left: 115, width: 30, top: 101, height: 30, maxWidth: 100 }}
                    >
                        <Icon
                            variant="2"
                            name="icon"
                            params={16}
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="ctlg_nextmodel_button"
                        params={393233}
                        onPointerTap={onCtlgNextmodelButton}
                        layout={{ position: 'absolute', left: 210, width: 30, top: 101, height: 30, maxWidth: 100 }}
                    >
                        <Icon
                            variant="3"
                            name="icon"
                            params={16}
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    name="colourGridWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 285, height: 40 }}
                />
                <Region
                    name="trophy.enscription"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 355, top: 326, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('lorem.title')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                    />
                </Region>
                <Border
                    variant="5"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 340, height: 83 }}
                >
                    <Region
                        name="textInputWidget"
                        tags={[ 'EMBEDDED' ]}
                        params={2192}
                        layout={{ position: 'absolute', left: 6, width: 349, top: 7, height: 70 }}
                    >
                        <TextInput
                            value={inputTextValue}
                            onChange={setInputTextValue}
                            maxLength={300}
                            multiline
                            layout={{ position: 'absolute', left: 0, width: 349, top: 0, height: 70 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
