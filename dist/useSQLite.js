import { Capacitor } from '@capacitor/core';
import { notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from '@capacitor-community/sqlite';
export { SQLiteDBConnection };
export let availableFeatures;
/**
 * useSQLite Hook
 */
export function useSQLite(onProgress) {
    const platform = Capacitor.getPlatform();
    const sqlitePlugin = CapacitorSQLite;
    const mSQLite = new SQLiteConnection(sqlitePlugin);
    // add listeners
    let importListener = null;
    let exportListener = null;
    if (platform != "electron") {
        if (onProgress) {
            if (onProgress.onProgressImport && sqlitePlugin)
                importListener =
                    sqlitePlugin.addListener('sqliteImportProgressEvent', (e) => {
                        if (typeof onProgress.onProgressImport !== 'undefined')
                            onProgress.onProgressImport(e.progress);
                    });
            if (onProgress.onProgressExport && sqlitePlugin)
                exportListener =
                    sqlitePlugin.addListener('sqliteExportProgressEvent', (e) => {
                        if (typeof onProgress.onProgressExport !== 'undefined')
                            onProgress.onProgressExport(e.progress);
                    });
        }
    }
    availableFeatures = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    };
    /**
     * Initialize the Web Store
     */
    const initWebStore = async () => {
        if (platform != "web") {
            return Promise.reject(`Not implemented on platform ${platform}`);
        }
        try {
            await mSQLite.initWebStore();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Save the Database to store
     * @param dbName string
     */
    const saveToStore = async (dbName) => {
        if (platform != "web") {
            return Promise.reject(`Not implemented on platform ${platform}`);
        }
        if (dbName.length > 0) {
            try {
                await mSQLite.saveToStore(dbName);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Remove Json Listeners
     */
    const removeListeners = async () => {
        if (platform != "electron") {
            importListener.remove();
            exportListener.remove();
        }
    };
    /**
     * Echo value
     * @param value
     */
    const echo = async (value) => {
        const ret = { value: "" };
        if (value) {
            const r = await mSQLite.echo(value);
            if (r) {
                return r;
            }
            return ret;
        }
        else {
            ret.value = "Echo: failed";
            return ret;
        }
    };
    /**
     * Get Platform
     */
    const getPlatform = async () => {
        return { platform: platform };
    };
    /**
     *  Get CapacitorSQLite plugin
     */
    const getCapacitorSQLite = async () => {
        return { plugin: sqlitePlugin };
    };
    /**
     * Create a Connection to Database
     * @param dbName string
     * @param encrypted boolean optional
     * @param mode string optional
     * @param version number optional
     * @param readonly boolean optional since 3.0.2
     */
    const createConnection = async (dbName, encrypted, mode, version, readonly) => {
        if (dbName == null || dbName.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        }
        const mDatabase = dbName;
        const mVersion = version ? version : 1;
        const mEncrypted = encrypted ? encrypted : false;
        const mMode = mode ? mode : "no-encryption";
        const mReadonly = readonly ? readonly : false;
        try {
            const r = await mSQLite.createConnection(mDatabase, mEncrypted, mMode, mVersion, mReadonly);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("No returned connection");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Close the Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const closeConnection = async (dbName, readonly) => {
        const mReadonly = readonly ? readonly : false;
        if (dbName.length > 0) {
            try {
                await mSQLite.closeConnection(dbName, mReadonly);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Check if the Connection to the Database exists
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const isConnection = async (dbName, readonly) => {
        const mReadonly = readonly ? readonly : false;
        if (dbName.length > 0) {
            try {
                const r = await mSQLite.isConnection(dbName, mReadonly);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("No returned isConnection");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const retrieveConnection = async (dbName, readonly) => {
        const mReadonly = readonly ? readonly : false;
        if (dbName.length > 0) {
            try {
                const r = await mSQLite.retrieveConnection(dbName, mReadonly);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("No returned connection");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Retrieve all Connections to Databases
     *
     */
    const retrieveAllConnections = async () => {
        try {
            const r = await mSQLite.retrieveAllConnections();
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("No returned connection");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Close All Connections to Databases
     */
    const closeAllConnections = async () => {
        try {
            await mSQLite.closeAllConnections();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Import from Json
     * @param jsonstring string
     */
    const importFromJson = async (jsonstring) => {
        try {
            const r = await mSQLite.importFromJson(jsonstring);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject('Error in importFromJson');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Is Json Valid
     * @param jsonstring string
     */
    const isJsonValid = async (jsonstring) => {
        try {
            const r = await mSQLite.isJsonValid(jsonstring);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject('Error Json Object not valid');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = async (dbName, upgrade) => {
        if (upgrade === null) {
            return Promise.reject(new Error("Must provide an upgrade statement"));
        }
        if (upgrade.toVersion === null
            || upgrade.statements === null) {
            let msg = "Must provide an upgrade statement with ";
            msg += "toVersion & statements";
            return Promise.reject(msg);
        }
        if (dbName.length > 0) {
            try {
                await mSQLite
                    .addUpgradeStatement(dbName, [upgrade]);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Copy databases from assets folder
     * @param overwrite
     * @returns
     */
    const copyFromAssets = async (overwrite) => {
        const mOverwrite = overwrite != null ? overwrite : true;
        try {
            await mSQLite.copyFromAssets(mOverwrite);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Get databases from HTTP request
     * @param url
     * @param overwrite
     * @returns
     */
    const getFromHTTPRequest = async (url, overwrite) => {
        const mOverwrite = overwrite != null ? overwrite : true;
        try {
            await mSQLite.getFromHTTPRequest(url, mOverwrite);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check if the Database exists
     * @param dbName string
     */
    const isDatabase = async (dbName) => {
        if (dbName.length > 0) {
            try {
                const r = await mSQLite.isDatabase(dbName);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("Error in isDatabase");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Get the list of databases
     */
    const getDatabaseList = async () => {
        try {
            const r = await mSQLite.getDatabaseList();
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("Error in getDatabaseList");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Get the migratable cordova database list
     * @param folderPath
     *
     */
    const getMigratableDbList = async (folderPath) => {
        const path = folderPath ? folderPath : "default";
        try {
            const r = await mSQLite.getMigratableDbList(path);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("Error in getMigratableDbList");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Add SQLite suffix to cordova databases
     * @param folderPath
     * @param dbNameList
     */
    const addSQLiteSuffix = async (folderPath, dbNameList) => {
        const path = folderPath ? folderPath : "default";
        const dbList = dbNameList ? dbNameList : [];
        try {
            await mSQLite.addSQLiteSuffix(path, dbList);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Delete Cordova databases
     * @param folderPath
     * @param dbNameList
     */
    const deleteOldDatabases = async (folderPath, dbNameList) => {
        const path = folderPath ? folderPath : "default";
        const dbList = dbNameList ? dbNameList : [];
        try {
            await mSQLite.deleteOldDatabases(path, dbList);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     */
    const checkConnectionsConsistency = async () => {
        try {
            const r = await mSQLite.checkConnectionsConsistency();
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject('Error in checkConnectionsConsistency');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    const isSecretStored = async () => {
        try {
            const r = await mSQLite.isSecretStored();
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject('Error in isSecretStored');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase
     * @returns Promise<void>
     * @since 2.0.2
     */
    const setEncryptionSecret = async (passphrase) => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        }
        try {
            await mSQLite.setEncryptionSecret(passphrase);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase
     * @param oldpassphrase
     * @returns Promise<void>
     * @since 2.0.2
     */
    const changeEncryptionSecret = async (passphrase, oldpassphrase) => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        }
        if (oldpassphrase == null || oldpassphrase.length === 0) {
            return Promise.reject(new Error('Must provide the old passphrase'));
        }
        try {
            await mSQLite.changeEncryptionSecret(passphrase, oldpassphrase);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */
    const clearEncryptionSecret = async () => {
        try {
            await mSQLite.clearEncryptionSecret();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.5
     */
    const getNCDatabasePath = async (folderPath, database) => {
        if (folderPath == null || folderPath.length === 0) {
            return Promise.reject(new Error('Must provide a folder path'));
        }
        if (database == null || database.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        }
        const mFolderPath = folderPath;
        const mDatabase = database;
        try {
            const r = await mSQLite.getNCDatabasePath(mFolderPath, mDatabase);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("No returned database path");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Create a Non-Conformed Database Connection
     * @param databasePath string
     * @param version number optional
     */
    const createNCConnection = async (databasePath, version) => {
        if (databasePath == null || databasePath.length === 0) {
            return Promise.reject(new Error('Must provide a database path'));
        }
        const mDatabasePath = databasePath;
        const mVersion = version ? version : 1;
        try {
            const r = await mSQLite.createNCConnection(mDatabasePath, mVersion);
            if (r) {
                return Promise.resolve(r);
            }
            else {
                return Promise.reject("No returned NC connection");
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Retrieve a Non-Conformed Database Connection
     * @param databasePath string
     */
    const retrieveNCConnection = async (databasePath) => {
        if (databasePath.length > 0) {
            try {
                const r = await mSQLite.retrieveNCConnection(databasePath);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("No returned NC connection");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database path');
        }
    };
    /**
     * Close a Non-Conformed Database Connection
     * @param databasePath string
     */
    const closeNCConnection = async (databasePath) => {
        if (databasePath.length > 0) {
            try {
                await mSQLite.closeNCConnection(databasePath);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database path');
        }
    };
    /**
     * Check if a Non-Conformed Database Connection  exists
     * @param databasePath
     */
    const isNCConnection = async (databasePath) => {
        if (databasePath.length > 0) {
            try {
                const r = await mSQLite.isNCConnection(databasePath);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("No returned  NC Connection");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database path');
        }
    };
    /**
     * Check if database exists
     * @param databasePath
     */
    const isNCDatabase = async (databasePath) => {
        if (databasePath.length > 0) {
            try {
                const r = await mSQLite.isNCDatabase(databasePath);
                if (r) {
                    return Promise.resolve(r);
                }
                else {
                    return Promise.reject("No returned  NC Connection");
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return Promise.reject('Must provide a database path');
        }
    };
    if (!availableFeatures.useSQLite) {
        return Object.assign({ initWebStore: featureNotAvailableError, saveToStore: featureNotAvailableError, echo: featureNotAvailableError, getPlatform: featureNotAvailableError, getCapacitorSQLite: featureNotAvailableError, createConnection: featureNotAvailableError, closeConnection: featureNotAvailableError, retrieveConnection: featureNotAvailableError, retrieveAllConnections: featureNotAvailableError, closeAllConnections: featureNotAvailableError, addUpgradeStatement: featureNotAvailableError, importFromJson: featureNotAvailableError, isJsonValid: featureNotAvailableError, copyFromAssets: featureNotAvailableError, getFromHTTPRequest: featureNotAvailableError, isConnection: featureNotAvailableError, isDatabase: featureNotAvailableError, getNCDatabasePath: featureNotAvailableError, createNCConnection: featureNotAvailableError, closeNCConnection: featureNotAvailableError, retrieveNCConnection: featureNotAvailableError, isNCConnection: featureNotAvailableError, isNCDatabase: featureNotAvailableError, getDatabaseList: featureNotAvailableError, getMigratableDbList: featureNotAvailableError, addSQLiteSuffix: featureNotAvailableError, deleteOldDatabases: featureNotAvailableError, checkConnectionsConsistency: featureNotAvailableError, removeListeners: featureNotAvailableError, isSecretStored: featureNotAvailableError, setEncryptionSecret: featureNotAvailableError, changeEncryptionSecret: featureNotAvailableError, clearEncryptionSecret: featureNotAvailableError }, notAvailable);
    }
    else {
        return { echo, getPlatform, getCapacitorSQLite, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets, getFromHTTPRequest,
            isConnection, isDatabase, getDatabaseList, getMigratableDbList, addSQLiteSuffix,
            deleteOldDatabases, checkConnectionsConsistency, removeListeners,
            isSecretStored, setEncryptionSecret, changeEncryptionSecret, clearEncryptionSecret,
            initWebStore, saveToStore, getNCDatabasePath, createNCConnection,
            closeNCConnection, retrieveNCConnection, isNCConnection, isNCDatabase,
            isAvailable: true };
    }
}
//# sourceMappingURL=useSQLite.js.map