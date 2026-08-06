import { useWalletContext } from "#base/components";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon } from "#base/theme";

export const PurseView = () => {
    const { currency } = useWalletContext();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const kinds = [
        {
            amount: currency.activityPoints[5] ?? 0,
            color: '#38caeb',
            name: 'Diamonds',
            icon: 'diamonds'
        },
        {
            amount: currency.credits ?? 0,
            color: '#d5af22',
            name: 'Credits',
            icon: 'credits'
        },
        {
            amount: currency.activityPoints[0] ?? 0,
            color: '#d787d7',
            name: 'Duckets',
            icon: 'duckets'
        },
    ];

    return (
        <Border variant="9" className="flex w-57.5 h-19.25 p-1.5 pointer-events-auto gap-1.5">
            <div className="flex flex-col justify-center w-13">
                {kinds.map(({ amount, color, name, icon }) =>
                    <div key={name} className="h-4.75 flex justify-end items-center gap-0.5 hover:cursor-pointer [&:hover>*]:brightness-[1.6]">
                        <span className="text-[12px] text-ellipsis text-nowrap font-ubuntu-bold" style={{ color }}>{amount}</span>
                        <NitroIcon icon={`icon-currency ${icon}`} />
                    </div>)
                }
            </div>
            <div className="flex flex-col justify-center w-25.25 gap-1">
                <Border className="flex items-center gap-1 opacity-90 p-1 hover:cursor-pointer [&:hover>*]:brightness-[1.6]" variant="1" tintColor="#FFE1CC">
                    <NitroIcon icon="icon-hc-small" />
                    <span className="text-[#00C1C4] text-[12px] font-ubuntu-bold font-aa text-ellipsis text-nowrap overflow-hidden">{getLocalizationValue('purse.clubdays.zero.amount.text')}</span>
                </Border>
                <Border className="flex items-center gap-1 opacity-90 p-1 hover:cursor-pointer [&:hover>*]:brightness-[1.6]" variant="1" tintColor="#FFE1CC">
                    <NitroIcon icon="icon-earnings-small" />
                    <span className="text-[#00C1C4] text-[12px] font-ubuntu-bold font-aa text-ellipsis text-nowrap overflow-hidden">{getLocalizationValue('earnings.title')}</span>
                </Border>
            </div>
            <div className="flex flex-col justify-center gap-0.5 w-15.75 relative pl-0.75 after:content-[''] after:w-px after:h-13.75 after:bg-[#444] after:absolute after:-left-0.5 after:top-1">
                <Button className="text-white w-full h-4.75 font-[12px]" variant="0" tintColor="#217bb5">
                    {getLocalizationValue('toolbar.help')}
                </Button>
                <Button className="text-white w-full h-4.75" variant="0" tintColor="#de5347">
                    <NitroIcon icon="icon-disconnect" />
                </Button>
                <Button className="text-white w-full h-4.75" variant="0" tintColor="#726b86">
                    <NitroIcon icon="icon-settings" />
                </Button>
            </div>
        </Border>
    );
}