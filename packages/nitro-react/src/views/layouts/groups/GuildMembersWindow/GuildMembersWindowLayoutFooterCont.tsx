import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `footer_cont` of GuildMembersWindowLayout - configured through the parent's `footerCont` prop. */
export interface GuildMembersWindowLayoutFooterContProps {
    captionFooterInfoTxt?: string;
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    layout?: BoxLayout;
    onNextPageButton?: () => void;
    onPreviousPageButton?: () => void;
    visibleFooterInfoTxt?: boolean;
}

export const GuildMembersWindowLayoutFooterCont = ({ captionFooterInfoTxt, captionPaginaTextEnd, captionPaginaTextStart, layout, onNextPageButton, onPreviousPageButton, visibleFooterInfoTxt }: GuildMembersWindowLayoutFooterContProps) => {
    const t = useTranslation();
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Region
            name="footer_cont"
            layout={{ position: 'absolute', left: 10, right: -3, bottom: 2, height: 25, justifyContent: 'center', ...layout }}
        >
            <ContainerButton
                variant="3"
                name="previous_page_button"
                onPointerTap={onPreviousPageButton}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, bottom: 0, minWidth: 50, maxWidth: 50 }}
            >
                <Icon
                    variant="4"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 21, width: 16, top: 7, height: 16 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="next_page_button"
                onPointerTap={onNextPageButton}
                layout={{ position: 'absolute', right: 0, width: 50, top: 0, bottom: 0, minWidth: 50, maxWidth: 50 }}
            >
                <Icon
                    variant="5"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 24, width: 17, top: 7, height: 16 }}
                />
            </ContainerButton>
            {(visibleFooterInfoTxt ?? false) && (
                <ThemeText
                    text={captionFooterInfoTxt ?? t('group.members.pageinfo')}
                    textStyle="text-style-u-regular"
                    name="footer_info_txt"
                    layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 144, top: 4, height: 17 }}
                />
            )}
            <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 178, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="pagina_text_start"
                    layout={{ width: 135, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPaginaTextStart ?? 'X matching users. Page '}
                </Region>
                <TextInput
                    value={paginaNumberInputValue}
                    onChange={setPaginaNumberInputValue}
                    layout={{ width: 21, height: 17, flexShrink: 0 }}
                />
                <Region
                    name="pagina_text_end"
                    layout={{ width: 18, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPaginaTextEnd ?? '/ Y'}
                </Region>
            </Region>
        </Region>
    );
};
