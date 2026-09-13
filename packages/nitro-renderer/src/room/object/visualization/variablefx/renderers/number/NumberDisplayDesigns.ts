export interface NumberDisplayDigit {
    sourceX: number;
    value: string;
    width: number;
}

export interface NumberDisplayDesign {
    design: string;
    digitHeight: number;
    digitSpacing: number;
    iconContentYOffsetPx: number;
    iconOverlapPx: number;
    digits: NumberDisplayDigit[];
}

export interface RecolorableNumberDisplayDesign extends NumberDisplayDesign {
    layers: {
        numbers: string;
        numberLines?: string;
        darkening?: string;
        lighting?: string;
    };
}

export interface BakedColorNumberDisplayDesign extends NumberDisplayDesign {
    /** Which row of the numbers sheet (source y) holds each pre-coloured digit set. */
    colorRows: Record<string, number>;
}

const digit = (value: string, sourceX: number, width: number): NumberDisplayDigit => ({ sourceX, value, width });

/** The digit sheets the number displays draw from (`design` config extra). */
export class NumberDisplayDesigns {
    public static getRecolorableDesign(design: string | undefined): RecolorableNumberDisplayDesign | undefined {
        switch (design) {
            case 'blocky':
                return {
                    design: 'blocky',
                    digitHeight: 22,
                    digitSpacing: 3,
                    iconContentYOffsetPx: 0,
                    iconOverlapPx: -6,
                    digits: [ digit('0', 0, 13), digit('1', 14, 9), digit('2', 24, 13), digit('3', 38, 13), digit('4', 52, 13), digit('5', 66, 13), digit('6', 80, 13), digit('7', 94, 13), digit('8', 108, 13), digit('9', 122, 13), digit('-', 136, 13) ],
                    layers: {
                        numbers: 'variablefx_number_blocky_numbers',
                        darkening: 'variablefx_number_blocky_darkening',
                        lighting: 'variablefx_number_blocky_lighting',
                    },
                };
            case 'shalimar':
                return {
                    design: 'shalimar',
                    digitHeight: 23,
                    digitSpacing: 3,
                    iconContentYOffsetPx: 0,
                    iconOverlapPx: -6,
                    digits: [ digit('0', 0, 17), digit('1', 18, 17), digit('2', 36, 17), digit('3', 54, 17), digit('4', 72, 17), digit('5', 90, 17), digit('6', 108, 17), digit('7', 126, 17), digit('8', 144, 17), digit('9', 162, 17), digit('-', 180, 17) ],
                    layers: {
                        numbers: 'variablefx_number_shalimar_numbers',
                        numberLines: 'variablefx_number_shalimar_number_lines',
                        darkening: 'variablefx_number_shalimar_darkening',
                        lighting: 'variablefx_number_shalimar_lighting',
                    },
                };
            default:
                return undefined;
        }
    }

    public static getBakedColorDesign(design: string | undefined): BakedColorNumberDisplayDesign | undefined {
        if (design !== 'freeze_style') return undefined;

        return {
            design: 'freeze_style',
            digitHeight: 21,
            digitSpacing: -4,
            iconContentYOffsetPx: 0,
            iconOverlapPx: -1,
            digits: [ digit('0', 0, 16), digit('1', 17, 13), digit('2', 31, 16), digit('3', 48, 16), digit('4', 65, 16), digit('5', 82, 16), digit('6', 99, 16), digit('7', 116, 16), digit('8', 133, 16), digit('9', 150, 16), digit('-', 167, 16) ],
            colorRows: {
                RED: 0,
                GREEN: 22,
                BLUE: 44,
                YELLOW: 66,
                WHITE: 88,
            },
        };
    }
}
