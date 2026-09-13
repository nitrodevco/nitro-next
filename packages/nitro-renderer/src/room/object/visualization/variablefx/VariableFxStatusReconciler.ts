import { IVariableFxStatusModelData } from '@nitrodevco/nitro-api';

import { StackedAdditionStack } from '../stacked/StackedAdditionStack';
import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxStackAddition } from './VariableFxStackAddition';
import { VariableFxVisualizationConfigManager } from './VariableFxVisualizationConfigManager';

/**
 * Syncs a stack with the statuses an object's logic published: adds an addition per new
 * (config, variable), refreshes existing ones and hides the ones that disappeared. Skips the
 * work entirely while neither the published data nor the config table changed.
 */
export class VariableFxStatusReconciler {
    private _lastModelUpdateId: number = -1;
    private _lastManagerUpdateId: number = -1;

    public reconcile(data: IVariableFxStatusModelData | undefined, manager: VariableFxVisualizationConfigManager | undefined, assetProvider: IVariableFxAssetProvider | undefined, registry: VariableFxRendererRegistry | undefined, stack: StackedAdditionStack | undefined, layer: number, time: number): boolean {
        const modelUpdateId = data?.updateId ?? -1;
        const managerUpdateId = manager?.updateId ?? -1;

        if (!stack) return false;
        if (modelUpdateId === this._lastModelUpdateId && managerUpdateId === this._lastManagerUpdateId) return false;

        const seen = new Map<number, Set<string>>();

        let changed = false;

        if (data && manager) {
            for (const [ configId, statuses ] of data.statusesByConfig) {
                for (const [ variableId, entry ] of statuses) {
                    let addition = this.getVariableFxAddition(stack, configId, variableId);

                    if (!addition) {
                        addition = new VariableFxStackAddition(configId, variableId, manager, assetProvider, registry);
                        changed = true;
                    }

                    stack.add(addition, layer, entry.createdAt, configId, variableId);

                    if (addition.show(entry, time)) changed = true;

                    this.markSeen(seen, configId, variableId);
                }
            }
        }

        for (const addition of this.getVariableFxAdditions(stack)) {
            if (this.hasSeen(seen, addition.configId, addition.variableId)) continue;

            if (addition.hide(time)) changed = true;
        }

        this._lastModelUpdateId = modelUpdateId;
        this._lastManagerUpdateId = managerUpdateId;

        return changed;
    }

    private getVariableFxAddition(stack: StackedAdditionStack, configId: number, variableId: string): VariableFxStackAddition | undefined {
        for (const addition of this.getVariableFxAdditions(stack)) {
            if (addition.configId === configId && addition.variableId === variableId) return addition;
        }

        return undefined;
    }

    private getVariableFxAdditions(stack: StackedAdditionStack): VariableFxStackAddition[] {
        const additions: VariableFxStackAddition[] = [];

        for (const addition of stack.getAdditions()) {
            if (addition instanceof VariableFxStackAddition) additions.push(addition);
        }

        return additions;
    }

    private markSeen(seen: Map<number, Set<string>>, configId: number, variableId: string): void {
        let variables = seen.get(configId);

        if (!variables) {
            variables = new Set();

            seen.set(configId, variables);
        }

        variables.add(variableId);
    }

    private hasSeen(seen: Map<number, Set<string>>, configId: number, variableId: string): boolean {
        return seen.get(configId)?.has(variableId) ?? false;
    }
}
