import { BoxLayout, Region } from '#base/theme';

import { MainWindow_1503LayoutHeader3, MainWindow_1503LayoutHeader3Props } from './MainWindow_1503LayoutHeader3';

/** Named region `flt_3` of MainWindow_1503Layout - configured through the parent's `flt3` prop. */
export interface MainWindow_1503LayoutFlt3Props {
    header?: MainWindow_1503LayoutHeader3Props;
    layout?: BoxLayout;
    onFlt3?: () => void;
}

export const MainWindow_1503LayoutFlt3 = ({ header, layout, onFlt3 }: MainWindow_1503LayoutFlt3Props) => {
    return (
        <Region
            name="flt_3"
            onPointerTap={onFlt3}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 30, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader3 {...header} />
        </Region>
    );
};
