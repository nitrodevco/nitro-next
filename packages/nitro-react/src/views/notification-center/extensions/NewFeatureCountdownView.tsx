import { useEffect, useState } from "react";

const format = (value: number) => value.toString().padStart(2, '0');

type NewFeatureCountdownViewProps = {
    seconds: number;
}

export const NewFeatureCountdownView = ({ seconds }: NewFeatureCountdownViewProps) => {
    const [deadline] = useState(() => performance.now() + (seconds * 1000));
    const [now, setNow] = useState(() => performance.now());

    useEffect(() => {
        const interval = window.setInterval(() => setNow(performance.now()), 1000);

        return () => window.clearInterval(interval);
    }, []);

    const remaining = Math.max(0, Math.round((deadline - now) / 1000));

    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;

    return (
        <div className="font-ubuntu-bold text-[14px] text-white tabular-nums">
            { days > 0 ? `${ days }d ` : '' }{ format(hours) }:{ format(minutes) }:{ format(secs) }
        </div>
    );
}
