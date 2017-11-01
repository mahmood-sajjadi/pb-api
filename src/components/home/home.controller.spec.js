import AppModule from '../../app.module';
import HomeController from './home.controller';

describe('Component: Home', () => {
  let component, scope, promise;
  class MockConfigService {
    get() {
      return promise;
    }
  }

  class Mock$log {
    error() {}
  }

  beforeEach(() => {
    angular.mock.module(AppModule);
  });

  beforeEach(angular.mock.inject(() => {
    let resolver;
    let rejector;
    promise = new Promise( (resolve, reject) => {
      resolver = resolve;
      rejector = reject;
    });
    promise.resolve = resolver;
    promise.reject = rejector;
    let configService = new MockConfigService();
    let log = new Mock$log();
    scope = {};
    component = new HomeController(log, scope, configService);
  }));

  it('should be defined', () => {
    promise.resolve({data:{}});
    expect(component).toBeDefined();
  });

  it('should have $scope', () => {
    promise.resolve({data:{}});
    expect(scope).toBeDefined();
  });
});