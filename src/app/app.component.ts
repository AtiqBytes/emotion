import { Component, OnInit } from '@angular/core';
import { ImageCaptureService } from './image-capture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'emotion';
  constructor(private imageCaptureService: ImageCaptureService) { }

  ngOnInit(): void {
    this.imageCaptureService.startImageCapture();
  }

}

