import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageCaptureService {

  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private video!: HTMLVideoElement;
  private stream: MediaStream | null = null; // Track the stream for later closing

  constructor(private http: HttpClient) { }

  async startImageCapture() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video = document.createElement('video');
      this.video.srcObject = this.stream;

      // Wait for the video to be loaded to get its dimensions
      await new Promise((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          this.canvas = document.createElement('canvas');
          this.context = this.canvas.getContext('2d')!;
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
          resolve(true);
        };
      });

      // Start capturing images and pausing for 20 seconds
      await this.captureImageAndPauseLoop();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  async restartImageCapture() {
    // Stop capturing images and release the camera stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Pause for 5 seconds before restarting capture
    await new Promise(resolve => setTimeout(resolve, 10000)); 

    // Restart image capture
    if (!this.stream) {
      await this.startImageCapture();
    }
  }

  async captureImageAndPauseLoop() {
    while (true) {
      const imageData = this.captureImage();
      console.log("usbrous",imageData);

      // Display the image on the screen
      const image = new Image();
      image.src = imageData;
      document.body.appendChild(image);
      await this.restartImageCapture();
    }
  }

  captureImage(): string {
    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    return this.canvas.toDataURL();
  }
}