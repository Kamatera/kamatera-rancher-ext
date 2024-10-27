import { IClusterProvisioner, ClusterProvisionerContext } from '@shell/core/types';
import CruKamatera from './components/CruKamatera.vue';
import { mapDriver } from '@shell/store/plugins';
import { Component } from 'vue/types/umd';

export class KamateraProvisioner implements IClusterProvisioner {
    static ID = 'kamatera'

    constructor(private context: ClusterProvisionerContext) {
        mapDriver(this.id, 'kamatera' );
    }

    get id(): string {
        return KamateraProvisioner.ID;
    }

    get icon(): any {
        return require('./assets/kamatera.svg');
    }

    get group(): string {
        return 'kontainer';
    }

    get label(): string {
        return "Kamatera";
    }

    get component(): Component {
        return CruKamatera;
    }

    get detailTabs(): any {
        return {
            machines:     false,
            logs:         false,
            registration: false,
            snapshots:    false,
            related:      true,
            events:       false,
            conditions:   false,
        };
    }
}
