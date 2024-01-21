import { TestBed } from '@angular/core/testing';

import { AddressStructureResolver } from './address-structure.resolver';

describe('AddressStructureResolver', () => {
  let resolver: AddressStructureResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AddressStructureResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
