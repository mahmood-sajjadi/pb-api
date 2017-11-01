import angular from 'angular';

import homeComponent from './components/home/home.component';

import progressbar from './directives/progressbar/progressbar.directive';

import ConfigService from './services/config.service';

import styles from './styles/styles.scss';

const appModule = angular
	.module('pb-api', [
	])
  .service('ConfigService', ConfigService)
	.directive('progressbar', progressbar)
	.component('appHome', homeComponent);

export default appModule;
