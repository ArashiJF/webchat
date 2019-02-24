import { TestBed } from '@angular/core/testing';

import { SavetokenService } from './savetoken.service';

describe('SavetokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavetokenService = TestBed.get(SavetokenService);
    expect(service).toBeTruthy();
  });
});
