import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MainWindow_1503LayoutFlt1, MainWindow_1503LayoutFlt1Props } from './MainWindow_1503LayoutFlt1';
import { MainWindow_1503LayoutFlt2, MainWindow_1503LayoutFlt2Props } from './MainWindow_1503LayoutFlt2';
import { MainWindow_1503LayoutFlt3, MainWindow_1503LayoutFlt3Props } from './MainWindow_1503LayoutFlt3';

/** Named region `main_content` of MainWindow_1503Layout - configured through the parent's `mainContent` prop. */
export interface MainWindow_1503LayoutMainContentProps {
    bg?: ReactNode;
    flt1?: MainWindow_1503LayoutFlt1Props;
    flt2?: MainWindow_1503LayoutFlt2Props;
    flt3?: MainWindow_1503LayoutFlt3Props;
    layout?: BoxLayout;
}

export const MainWindow_1503LayoutMainContent = ({ bg, flt1, flt2, flt3, layout }: MainWindow_1503LayoutMainContentProps) => {
    return (
        <Region
            name="main_content"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 275, top: 0, height: 56, ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 10 }}
            >
                {bg}
            </Region>
            <MainWindow_1503LayoutFlt1 {...flt1} />
            <MainWindow_1503LayoutFlt2 {...flt2} />
            <MainWindow_1503LayoutFlt3 {...flt3} />
        </Region>
    );
};
