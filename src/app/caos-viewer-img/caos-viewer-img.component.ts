import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';


@Component({
  selector: 'app-caos-viewer-img',
  templateUrl: './caos-viewer-img.component.html',
  styleUrls: ['./caos-viewer-img.component.css']
})

export class CaosViewerImgComponent implements OnInit {

  @Input() imagem: string;
  safeImage: SafeResourceUrl;
  imagemEmTelaCheia = false;
  zoom = 1;
  antigoZoom = 0;
  originalImagePosition: { x: number, y: number };

  zoomIn() {
    if(this.zoom <= 6) {
      this.zoom += 0.1;
      this.setZoom();
    }
  }

  zoomOut() {
    if (this.zoom >= 0.2) {
      this.zoom -= 0.1;
      this.setZoom();
    }
  }

  setZoom() {
    const img = document.querySelector('.zoom') as HTMLElement;
    if (img) {
      if (this.zoom > 1) {
        img.classList.add('in');
        img.classList.remove('out');
      } else if (this.zoom < 1) {
        img.classList.add('out');
        img.classList.remove('in');
      } else {
        img.classList.remove('in', 'out');
      }
      img.style.transform = `scale(${this.zoom})`;
    }
  }

 
  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) { }

  ngOnInit() {
    this.safeImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.imagem);
    const imageElement = this.elementRef.nativeElement.querySelector('img');
    this.originalImagePosition = { x: imageElement.getBoundingClientRect().left, y: imageElement.getBoundingClientRect().top };
  }


  fullScreen() {
    if(!this.imagemEmTelaCheia) {
      if(this.zoom != 0) {
        this.antigoZoom = this.zoom;
        this.zoom = 1;
        this.setZoom();
      }
      
    }else {
      if(this.zoom != this.antigoZoom) {
        this.zoom = this.antigoZoom;
        this.setZoom();
      }
      
    }
    this.imagemEmTelaCheia = !this.imagemEmTelaCheia;
  }

  onImagemClicada(event) {
    this.fullScreen();
    
  }

  @HostListener('mousewheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    const container = img.parentElement;
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const scaleDiff = this.zoom - 1;
    
    if (scaleDiff > 0) {
      const offsetX = (event.clientX - containerRect.left) / containerRect.width;
      const offsetY = (event.clientY - containerRect.top) / containerRect.height;
      const imgOffsetX = (imgRect.left - containerRect.left) / containerRect.width;
      const imgOffsetY = (imgRect.top - containerRect.top) / containerRect.height;
      const deltaX = (offsetX - imgOffsetX) * scaleDiff;
      const deltaY = (offsetY - imgOffsetY) * scaleDiff;

      img.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
      img.style.transform = `scale(${this.zoom}) translate(${-deltaX}px, ${-deltaY}px)`;
    }
  }

  onMouseLeave(event: MouseEvent) {
    this.zoom = 1;
    this.setZoom();
  }

}
