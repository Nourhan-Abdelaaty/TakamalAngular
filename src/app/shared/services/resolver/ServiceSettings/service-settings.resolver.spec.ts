import { TestBed } from '@angular/core/testing';

import { ServiceSettingsResolver } from './service-settings.resolver';

describe('ServiceSettingsResolver', () => {
  let resolver: ServiceSettingsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServiceSettingsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
