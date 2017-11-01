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

  it('should onClick to be define', () => {
    promise.resolve({data:{}});
    expect(scope.onClick).toBeDefined();
  });

  it('should have same scope as config service response', () => {
    promise.resolve({data:{"buttons":[16,10,-43,-34],"bars":[85,33,76],"limit":210}})
    promise.then(() => {
      expect(scope.buttons).toEqual([16,10,-43,-34]);
      expect(scope.bars).toEqual([85,33,76]);
      expect(scope.limit).toEqual(210);
    })
  });

  it('should change progressbar value, On Click', () => {
    promise.resolve({data:{"buttons":[16,10,-43,-34],"bars":[85,33,76],"limit":210}})
    promise.then(() => {
      scope.onClick(0,10);
      expect(scope.bars[0]).toEqual(95);
    })
  });

  it('should go over limit', () => {
    promise.resolve({data:{"buttons":[16,10,-43,-34],"bars":[85,33,76],"limit":210}})
    promise.then(() => {
      scope.onClick(0,800);
      expect(scope.bars[0]).toEqual(885);
    })
  });

  it('should not go under zero', () => {
    promise.resolve({data:{"buttons":[16,10,-43,-34],"bars":[85,33,76],"limit":210}})
    promise.then(() => {
      scope.onClick(0,-800);
      expect(scope.bars[0]).toEqual(0);
      scope.onClick(0,10);
      expect(scope.bars[0]).toEqual(10);
    })
  });
});