import { BoxLayout, Region } from '#base/theme';

import { MainWindow_1503LayoutHeader2, MainWindow_1503LayoutHeader2Props } from './MainWindow_1503LayoutHeader2';

/** Named region `flt_2` of MainWindow_1503Layout - configured through the parent's `flt2` prop. */
export interface MainWindow_1503LayoutFlt2Props {
    header?: MainWindow_1503LayoutHeader2Props;
    layout?: BoxLayout;
    onFlt2?: () => void;
}

export const MainWindow_1503LayoutFlt2 = ({ header, layout, onFlt2 }: MainWindow_1503LayoutFlt2Props) => {
    return (
        <Region
            name="flt_2"
            onPointerTap={onFlt2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 15, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader2 {...header} />
        </Region>
    );
};
