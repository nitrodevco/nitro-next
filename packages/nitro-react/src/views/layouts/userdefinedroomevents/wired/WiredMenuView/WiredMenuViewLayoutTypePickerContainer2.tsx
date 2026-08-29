import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutButtons2, WiredMenuViewLayoutButtons2Props } from './WiredMenuViewLayoutButtons2';

/** Named region `type_picker_container` of WiredMenuViewLayout - configured through the parent's `typePickerContainer` prop. */
export interface WiredMenuViewLayoutTypePickerContainer2Props {
    buttons?: WiredMenuViewLayoutButtons2Props;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutTypePickerContainer2 = ({ buttons, captionTitle, layout }: WiredMenuViewLayoutTypePickerContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
            layout={{ position: 'absolute', left: 14, width: 150, top: 18, height: 70, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTitle ?? t('wiredmenu.inspection.type')}
            </Region>
            <Border
                variant="3"
                name="type_options"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 141, top: 20, height: 47 }}
            >
                <WiredMenuViewLayoutButtons2 {...buttons} />
            </Border>
        </Region>
    );
};
