import './LoadingScreenView.css';

export const LoadingScreenView = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 z-9999">
            <div className="flex flex-col items-center gap-8">
                <div className="flex gap-3 justify-center animate-slide-up-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-1" />
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-2" />
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce-up-3" />
                </div>
            </div>
        </div>
    );
};