import { AvailableResult } from './util/models';
import { SQLiteDBConnection, capEchoResult, capSQLiteChanges, capSQLiteValues, capNCDatabasePathResult } from '@capacitor-community/sqlite';
export { SQLiteDBConnection };
/**
 * SQLite properties
 * @since 2.0.1
 */
export declare type SQLiteProps = {
    onProgressImport?: (progress: string) => void;
    onProgressExport?: (progress: string) => void;
};
/**
 * SQLite Hook Interface
 */
export interface SQLiteHook extends AvailableResult {
    /**
     * Init the web store
     * @returns Promise<void>
     * @since 2.1.1
     */
    initWebStore(): Promise<void>;
    /**
        * Save the datbase to the web store
        * @param database
        * @returns Promise<void>
        * @since 2.1.1
        */
    saveToStore(database: string): Promise<void>;
    /**
    * Echo a value
    * @param value
    * @returns Promise<{value: string}>
    * @since 1.0.0 refactor
    */
    echo(value: string): Promise<capEchoResult>;
    /**
     * Get platform
     * @returns Promise<{platform: string}>
     * @since 1.0.0 refactor
     */
    getPlatform(): Promise<{
        platform: string;
    }>;
    /**
     * Get CapacitorSQLite plugin
     * @returns Promise<{plugin: any}}>
     * @since 2.0.5
     */
    getCapacitorSQLite(): Promise<{
        plugin: any;
    }>;
    /**
     * Add an Upgrade Statement to Update Database Version
     * @param dbName database name
     * @param upgrade upgrade statement
     * @returns Promise<void>
     * @since 2.0.0
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade): Promise<void>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @param readonly since 3.0.2
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0
     */
    createConnection(database: string, encrypted?: boolean, mode?: string, version?: number, readonly?: boolean): Promise<SQLiteDBConnection>;
    /**
     * Check if a connection exists
     * @param database
     * @param readonly since 3.0.2
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isConnection(database: string, readonly?: boolean): Promise<Result>;
    /**
    * Retrieve an existing database connection
    * @param database
    * @param readonly since 3.0.2
    * @returns Promise<SQLiteDBConnection>
    * @since 2.0.0
    */
    retrieveConnection(database: string, readonly?: boolean): Promise<SQLiteDBConnection>;
    /**
     * Retrieve all database connections
     * @returns Promise<Map<string, SQLiteDBConnection>>
     * @since 2.0.0
     */
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    /**
     * Close a database connection
     * @param database
     * @param readonly since 3.0.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeConnection(database: string, readonly?: boolean): Promise<void>;
    /**
     * Close all database connections
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeAllConnections(): Promise<void>;
    /**
     * Import a database From a JSON
     * @param jsonstring string
     * @returns Promise<Changes>
     * @since 1.0.0 refactor
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    isJsonValid(jsonstring: string): Promise<Result>;
    /**
     * Copy databases from assets to application database folder
     * @param overwrite // since 2.1.3
     * @returns Promise<void>
     * @since 2.0.0
     */
    copyFromAssets(overwrite?: boolean): Promise<void>;
    /**
     * Get databases from HTTP request
     * @param url
     * @param overwrite
     * @since 3.0.3
     */
    getFromHTTPRequest(url: string, overwrite?: boolean): Promise<void>;
    /**
     * Check if a database exists
     * @param database
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isDatabase(database: string): Promise<Result>;
    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.5
     */
    getNCDatabasePath(folderPath: string, database: string): Promise<capNCDatabasePathResult>;
    /**
     * Create a Non-Conformed database connection
     * @param databasePath
     * @param version
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.5
     */
    createNCConnection(databasePath: string, version?: number): Promise<SQLiteDBConnection>;
    /**
     * Retrieve a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.5
     */
    retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection>;
    /**
     * Close a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<void>
     * @since 2.1.5
     */
    closeNCConnection(databasePath: string): Promise<void>;
    /**
     * Check if Non-Conformed database connection exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.5
     */
    isNCConnection(databasePath: string): Promise<Result>;
    /**
     * Check if Non-Conformed database exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.5
     */
    isNCDatabase(databasePath: string): Promise<Result>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 2.0.0
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Get Migratable Cordova database List
     * @param folderPath
     * @returns Promise<capSQLiteValues>
     * @since 2.1.2
     */
    getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>;
    /**
     * Add SQLIte Suffix to existing Cordova databases
     * @param folderPath
     * @param dbNameList since 2.1.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @param dbNameList since 2.1.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     * @returns Promise<Result>
     * @since 2.0.1
     */
    checkConnectionsConsistency(): Promise<Result>;
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    isSecretStored(): Promise<Result>;
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase
     * @returns Promise<void>
     * @since 2.0.2
     */
    setEncryptionSecret(passphrase: string): Promise<void>;
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase
     * @param oldpassphrase
     * @returns Promise<void>
     * @since 2.0.2
     */
    changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void>;
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */
    clearEncryptionSecret(): Promise<void>;
    /**
    * Remove Json Listeners
    * @since 2.0.1
    */
    removeListeners(): Promise<void>;
}
export interface MySet {
    statement?: string;
    values?: any[];
}
export interface VersionUpgrade {
    toVersion: number;
    statements: string[];
}
export interface Result {
    result?: boolean;
    message?: string;
}
export declare let availableFeatures: any;
/**
 * useSQLite Hook
 */
export declare function useSQLite(onProgress?: SQLiteProps): SQLiteHook;
