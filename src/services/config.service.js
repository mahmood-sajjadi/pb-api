export default class ConfigService {
  constructor($http) {
		'ngInject';

		this.$http = $http;
  }

  get() {
    return this.$http.get('/bars');
  }
}