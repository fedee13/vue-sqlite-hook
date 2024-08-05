import { Capacitor } from '@capacitor/core';
import { FeatureNotAvailableError } from './models';
const allTrue = {
    web: true,
    ios: true,
    android: true,
    electron: true
};
const featureMap = {
    CapacitorSQLite: {
        useSQLite: Object.assign({}, allTrue /*, web: false*/),
    }
};
export async function isFeatureAvailable(plugin, method) {
    if (Capacitor.isPluginAvailable(plugin) && !!featureMap[plugin][method][Capacitor.platform]) {
        return true;
    }
    return false;
}
export function featureNotAvailableError() {
    throw new FeatureNotAvailableError();
}
//# sourceMappingURL=feature-check.js.map