export default class HomeController {
	constructor($log, $scope, ConfigService) {
		'ngInject';

		this.$scope = $scope;
		
		$scope.onClick = (index, value) => {
			const newval = $scope.bars[index] + value;
			$scope.bars[index] = newval > 0 ? newval : 0;
		};

		ConfigService.get()
		.then(res => {
			const values = res.data;

			$scope.limit = values.limit;
			$scope.buttons = values.buttons;
			$scope.bars = values.bars;
		}, err => {
			$log.error('an http error happend', err);
		});
	}

	$onInit = () => {
		this.$scope.selectedpb = 0;
	};
}
