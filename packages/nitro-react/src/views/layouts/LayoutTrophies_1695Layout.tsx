import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1695_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1695LayoutProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
}

export const LayoutTrophies_1695Layout = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton }: LayoutTrophies_1695LayoutProps) => {
    const t = useTranslation();
    const [ inputTextValue, setInputTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_trophies"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="trophy.description"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 70, height: 135, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                    layout={{ position: 'absolute', left: 0, width: 360, top: 165, height: 127 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 127 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="ctlg_prevmodel_button"
                        params={393233}
                        onPointerTap={onCtlgPrevmodelButton}
                        layout={{ position: 'absolute', left: 130, width: 30, top: 96, height: 30, maxWidth: 100 }}
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
                        layout={{ position: 'absolute', left: 190, width: 30, top: 96, height: 30, maxWidth: 100 }}
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
                    layout={{ position: 'absolute', left: 0, width: 360, top: 295, height: 40 }}
                />
                <Region
                    name="trophy.enscription"
                    params={16}
                    layout={{ position: 'absolute', left: 3, width: 356, top: 339, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('lorem.title')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                    />
                </Region>
                <Border
                    variant="5"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 355, height: 70 }}
                >
                    <Region
                        name="textInputWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 349, top: 7, height: 58 }}
                    >
                        <TextInput
                            value={inputTextValue}
                            onChange={setInputTextValue}
                            maxLength={300}
                            multiline
                            layout={{ position: 'absolute', left: 0, width: 349, top: 0, height: 58 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="purchaseWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
