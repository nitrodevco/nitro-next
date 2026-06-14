import './LoadingScreenView.css';

interface LoadingScreenViewProps {
    message?: string;
    progress?: number;
    subtext?: string;
    showLogo?: boolean;
}

export const LoadingScreenView = ({
    message = 'Loading',
    progress,
    subtext
}: LoadingScreenViewProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 z-9999">
            <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-slate-100 tracking-tight animate-slide-up-1">{message}</h2>
                    {subtext && <p className="text-sm text-slate-400 mt-2 animate-slide-up-2">{subtext}</p>}
                </div>

                {progress !== undefined ? (
                    <div className="w-full max-w-xs animate-slide-up-3">
                        <div className="w-full h-1.5 bg-cyan-500/15 rounded overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-linear-to-r from-cyan-500 to-cyan-300 rounded transition-all duration-300 shadow-lg shadow-cyan-500/50"
                                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                            />
                        </div>
                        <span className="block mt-3 text-center text-xs text-slate-500 font-medium tracking-widest">{Math.round(progress)}%</span>
                    </div>
                ) : (
                    <div className="flex gap-3 justify-center animate-slide-up-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-1" />
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-2" />
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-3" />
                    </div>
                )}
            </div>
        </div>
    );
};