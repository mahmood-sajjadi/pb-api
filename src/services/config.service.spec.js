import ConfigService from './config.service';

describe('ConfigService', () => {
  let requestUrl;
  let service;
  const mock$http = {get:(url) => requestUrl = url};
  
  beforeEach(() => {
    requestUrl = undefined;
    service= new ConfigService(mock$http);
  });

  it('should call /bars', () => {
    service.get();
    expect(requestUrl).toBe('/bars');
  });
});
