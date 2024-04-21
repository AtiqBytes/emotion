import { TestBed } from '@angular/core/testing';

import { ImageCaptureService } from './image-capture.service';

describe('ImageCaptureService', () => {
  let service: ImageCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
