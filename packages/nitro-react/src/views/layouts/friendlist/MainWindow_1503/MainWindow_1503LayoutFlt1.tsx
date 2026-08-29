import { BoxLayout, Region } from '#base/theme';

import { MainWindow_1503LayoutHeader, MainWindow_1503LayoutHeaderProps } from './MainWindow_1503LayoutHeader';

/** Named region `flt_1` of MainWindow_1503Layout - configured through the parent's `flt1` prop. */
export interface MainWindow_1503LayoutFlt1Props {
    header?: MainWindow_1503LayoutHeaderProps;
    layout?: BoxLayout;
    onFlt1?: () => void;
}

export const MainWindow_1503LayoutFlt1 = ({ header, layout, onFlt1 }: MainWindow_1503LayoutFlt1Props) => {
    return (
        <Region
            name="flt_1"
            onPointerTap={onFlt1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader {...header} />
        </Region>
    );
};
