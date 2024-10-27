import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import { KamateraProvisioner } from "./provisioner";

export default function(plugin: IPlugin): void {
  importTypes(plugin);
  plugin.metadata = require('./package.json');
  plugin.register('provisioner', 'kamatera', KamateraProvisioner);
}
