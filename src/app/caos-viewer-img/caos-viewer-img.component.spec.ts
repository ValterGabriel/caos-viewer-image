import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaosViewerImgComponent } from './caos-viewer-img.component';

describe('CaosViewerImgComponent', () => {
  let component: CaosViewerImgComponent;
  let fixture: ComponentFixture<CaosViewerImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaosViewerImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaosViewerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
