import NormanModel from '@shell/plugins/steve/norman-class';

export interface KamateraConfig {
    displayName?: string
}

export interface NormanCluster extends NormanModel {
    description?: string,
    kamateraConfig?: KamateraConfig,
    name?: string,
    id?: string,
    status? : {[key:string]: any},
    waitForCondition(name: any, withStatus?: string | undefined, timeoutMs?: number | undefined, intervalMs?: number | undefined): Promise<void>
}
