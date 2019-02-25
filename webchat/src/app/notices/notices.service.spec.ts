import { TestBed } from '@angular/core/testing';

import { NoticeService } from './notices.service';

describe('NoticesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticeService = TestBed.get(NoticeService);
    expect(service).toBeTruthy();
  });
});
