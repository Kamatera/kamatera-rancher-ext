<script lang='ts'>
import { defineComponent } from 'vue';
import { _CREATE, _EDIT, _VIEW } from '@shell/config/query-params';

import CruResource from '@shell/components/CruResource.vue';
import Loading from '@shell/components/Loading.vue';
import Banner from '@components/Banner/Banner.vue';
import LabeledInput from '@components/Form/LabeledInput/LabeledInput.vue';

import CreateEditView from '@shell/mixins/create-edit-view';
import FormValidation from '@shell/mixins/form-validation';
import { NORMAN } from '@shell/config/types';
// import { CREATOR_PRINCIPAL_ID } from '@shell/config/labels-annotations';
import { mapGetters, Store } from 'vuex';
import {KamateraConfig, NormanCluster} from "../types";

const DEFAULT_CLUSTER = {
  dockerRootDir:                       '/var/lib/docker',
  enableClusterAlerting:               false,
  enableClusterMonitoring:             false,
  enableNetworkPolicy:                 false,
  labels:                              {},
  annotations:                         {},
  windowsPreferedCluster:              false,
  fleetAgentDeploymentCustomization:   {},
  clusterAgentDeploymentCustomization: {}
};

export default defineComponent({
  name: 'CruKamatera',

  components: {
    CruResource,
    Loading,
    Banner,
    LabeledInput
  },

  mixins: [CreateEditView, FormValidation],

  props: {
    mode: {
      type:    String,
      default: _CREATE
    },

    // v2 provisioning cluster object
    value: {
      type:    Object,
      default: () => {
        return {};
      }
    }
  },

  async fetch() {
    const store = this.$store as Store<any>;

    if (this.value.id) {
      throw new Error('Not implemented');
    } else {
      this.normanCluster = await store.dispatch('rancher/create', { type: NORMAN.CLUSTER, ...DEFAULT_CLUSTER }, { root: true });
    }
    if (!this.normanCluster.kamateraConfig) {
      this.normanCluster['kamateraConfig'] = {
        displayName: ""
      };
    }
    this.config = this.normanCluster.kamateraConfig as KamateraConfig;
  },

  data() {
    return {
      normanCluster:     { name: '' } as unknown as NormanCluster,
      config:            { } as KamateraConfig,
    };
  },

  created() {
    // const registerAfterHook: Function = this.registerAfterHook;
    //
    // registerAfterHook(this.saveRoleBindings, 'save-role-bindings');
  },

  computed: {
    doneRoute(): string {
      return this.value?.listLocation?.name;
    },
  },

  methods: {
    setClusterName(name: string): void {
      this.normanCluster['name'] = name;
      this.config['displayName'] = name;
    },
  }

});
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <CruResource
      v-else
      ref="cruresource"
      :resource="value"
      :mode="mode"
      :can-yaml="false"
      :done-route="doneRoute"
      :errors="fvUnreportedValidationErrors"
      :validation-passed="fvFormIsValid"
      @error="e=>errors=e"
      @finish="save"
      @cancel="done"
  >
    <div class="row mb-10">
      <div class="col span-6">
        <LabeledInput
            required
            label="Cluster Name"
            :value="config.displayName"
            :mode="mode"
            @update:value="setClusterName"
        />
      </div>
    </div>

  </CruResource>
</template>

<style lang="scss" scoped>

</style>
