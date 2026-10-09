/**
 * `HabboAir`'s `uncaughtError` listener: an error thrown by one part of the client is reported
 * (`reportCrash`) and the rest of the client carries on. Without a boundary React unmounts the whole
 * tree on a render error - every window, the room, and the socket provider, whose cleanup closes the
 * connection - so one broken widget threw testers out of the hotel. Each view sits in its own
 * boundary instead: the one that threw is left out, logged, and drawn again on the next click.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { Children, Component, ErrorInfo, isValidElement, ReactNode } from 'react';

interface ViewErrorBoundaryProps {
    children?: ReactNode;
}

interface ViewErrorBoundaryState {
    failed: boolean;
}

export class ViewErrorBoundary extends Component<ViewErrorBoundaryProps, ViewErrorBoundaryState> {
    public override state: ViewErrorBoundaryState = { failed: false };

    public static getDerivedStateFromError(): ViewErrorBoundaryState {
        return { failed: true };
    }

    public override componentDidCatch(error: Error, info: ErrorInfo): void {
        NitroLogger.error('Uncaught client error', error, info.componentStack);

        window.addEventListener('pointerdown', this.retry, { capture: true, once: true });
    }

    public override componentWillUnmount(): void {
        window.removeEventListener('pointerdown', this.retry, { capture: true });
    }

    private retry = (): void => this.setState({ failed: false });

    public override render(): ReactNode {
        return this.state.failed ? null : this.props.children;
    }
}

/** Puts each of its children in a boundary of its own, so one that throws leaves its siblings drawn. */
export const ViewErrorBoundaries = ({ children }: ViewErrorBoundaryProps) =>
    Children.map(children, child => (isValidElement(child) ? <ViewErrorBoundary>{child}</ViewErrorBoundary> : child));
