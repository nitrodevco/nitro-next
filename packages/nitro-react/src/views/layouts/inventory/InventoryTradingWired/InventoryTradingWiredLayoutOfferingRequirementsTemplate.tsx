import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { InventoryTradingWiredLayoutRulesList, InventoryTradingWiredLayoutRulesListProps } from './InventoryTradingWiredLayoutRulesList';

/** Named region `offering_requirements_template` of InventoryTradingWiredLayout - configured through the parent's `offeringRequirementsTemplate` prop. */
export interface InventoryTradingWiredLayoutOfferingRequirementsTemplateProps {
    captionAnyAllText?: string;
    captionAnyCoinsText?: string;
    captionAnyFurniText?: string;
    captionCustomText?: string;
    captionOfferingsTitle?: string;
    layout?: BoxLayout;
    rulesList?: InventoryTradingWiredLayoutRulesListProps;
    visibleAnyAllText?: boolean;
    visibleAnyCoinsText?: boolean;
    visibleAnyFurniText?: boolean;
    visibleCustomText?: boolean;
}

export const InventoryTradingWiredLayoutOfferingRequirementsTemplate = ({ captionAnyAllText, captionAnyCoinsText, captionAnyFurniText, captionCustomText, captionOfferingsTitle, layout, rulesList, visibleAnyAllText, visibleAnyCoinsText, visibleAnyFurniText, visibleCustomText }: InventoryTradingWiredLayoutOfferingRequirementsTemplateProps) => {
    const t = useTranslation();

    return (
        <Region
            name="offering_requirements_template"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionOfferingsTitle ?? t('inventory.wired_trading.requirements.offering')}
                textOptions={{ align: 'center' }}
                name="offerings_title"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <Border
                variant="0"
                name="requirements_definition"
                tintColor="#f7f7f7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 24, bottom: 2 }}
            >
                {(visibleCustomText ?? false) && (
                    <Region
                        name="custom_text"
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCustomText ?? 'Entrance to the game and free candies'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160, align: 'center' }}
                        />
                    </Region>
                )}
                {(visibleAnyFurniText ?? false) && (
                    <Region
                        name="any_furni_text"
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyFurniText ?? t('inventory.wired_trading.requirements.donation.furni')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                )}
                {(visibleAnyCoinsText ?? false) && (
                    <Region
                        name="any_coins_text"
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyCoinsText ?? t('inventory.wired_trading.requirements.donation.coins')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                )}
                {(visibleAnyAllText ?? false) && (
                    <Region
                        name="any_all_text"
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyAllText ?? t('inventory.wired_trading.requirements.donation.all')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                )}
                <InventoryTradingWiredLayoutRulesList {...rulesList} />
            </Border>
        </Region>
    );
};
