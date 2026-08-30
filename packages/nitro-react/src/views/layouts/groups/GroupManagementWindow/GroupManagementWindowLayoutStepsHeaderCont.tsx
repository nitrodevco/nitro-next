import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `steps_header_cont` of GroupManagementWindowLayout - configured through the parent's `stepsHeaderCont` prop. */
export interface GroupManagementWindowLayoutStepsHeaderContProps {
    captionStepTitle1?: string;
    captionStepTitle2?: string;
    captionStepTitle3?: string;
    captionStepTitle4?: string;
    layout?: BoxLayout;
    srcGcreate10?: string;
    srcGcreate11?: string;
    srcGcreate20?: string;
    srcGcreate21?: string;
    srcGcreate30?: string;
    srcGcreate31?: string;
    srcGcreate40?: string;
    srcGcreate41?: string;
    srcGcreateIconCredit?: string;
    visibleStepsHeaderCont?: boolean;
}

export const GroupManagementWindowLayoutStepsHeaderCont = ({ captionStepTitle1, captionStepTitle2, captionStepTitle3, captionStepTitle4, layout, srcGcreate10, srcGcreate11, srcGcreate20, srcGcreate21, srcGcreate30, srcGcreate31, srcGcreate40, srcGcreate41, srcGcreateIconCredit, visibleStepsHeaderCont }: GroupManagementWindowLayoutStepsHeaderContProps) => {
    const t = useTranslation();

    return (
        (visibleStepsHeaderCont ?? false) && (
            <Region
                name="steps_header_cont"
                layout={{ position: 'absolute', left: 16, right: 15, top: 5, height: 33, ...layout }}
            >
                <ThemeImage
                    name="gcreate_1_0"
                    src={srcGcreate10 ?? '${image.library.url}guilds/gcreate_1_0.png'}
                    layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_1_1"
                    src={srcGcreate11 ?? '${image.library.url}guilds/gcreate_1_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_2_0"
                    src={srcGcreate20 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                    layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_2_1"
                    src={srcGcreate21 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                    layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_3_0"
                    src={srcGcreate30 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                    layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_3_1"
                    src={srcGcreate31 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                    layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_4_0"
                    src={srcGcreate40 ?? '${image.library.url}guilds/gcreate_4_0.png'}
                    layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_4_1"
                    src={srcGcreate41 ?? '${image.library.url}guilds/gcreate_4_1.png'}
                    layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_icon_credit"
                    src={srcGcreateIconCredit ?? '${image.library.url}guilds/gcreate_icon_credit.png'}
                    layout={{ position: 'absolute', left: 335, width: 21, top: 0, height: 20 }}
                />
                <ThemeText
                    text={captionStepTitle1 ?? t('group.create.steplabel.1')}
                    textOptions={{ fill: '#ffffff' }}
                    name="step_title_1"
                    layout={{ position: 'absolute', left: -38, right: 242, top: 7, height: 18 }}
                />
                <ThemeText
                    text={captionStepTitle2 ?? t('group.create.steplabel.2')}
                    textOptions={{ fill: '#ffffff' }}
                    name="step_title_2"
                    layout={{ position: 'absolute', left: 40, right: 164, top: 7, height: 18 }}
                />
                <ThemeText
                    text={captionStepTitle3 ?? t('group.create.steplabel.3')}
                    textOptions={{ fill: '#ffffff' }}
                    name="step_title_3"
                    layout={{ position: 'absolute', left: 115, right: 89, top: 7, height: 18 }}
                />
                <ThemeText
                    text={captionStepTitle4 ?? t('group.create.steplabel.4')}
                    textOptions={{ fill: '#ffffff' }}
                    name="step_title_4"
                    layout={{ position: 'absolute', left: 210, right: -6, top: 7, height: 18 }}
                />
            </Region>
        )
    );
};
