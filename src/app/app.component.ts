import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import domtoimage from 'dom-to-image';
import jspdf from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cv';
  downloading = false;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  download () {
    let img: any;
    let filename: any;
    let newImage: any;
    this.downloading = true;

    setTimeout(() => {
      const node: any = this.document.getElementById('body');
      domtoimage
      .toPng(node, { bgcolor: '#fff' })
      .then((dataUrl) => {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = () => {
          let doc;
          let pdfWidth = img.width;
          let pdfHeight = img.height;

          if (pdfWidth > pdfHeight) {
            doc = new jspdf('l', 'px', [pdfWidth , pdfHeight]);
          }
          else {
            doc = new jspdf('p', 'px', [pdfWidth , pdfHeight]);
          }

          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();

          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'pabilonia_ronald_cv' + '.pdf';
          doc.save(filename);
          this.downloading = false;
        };
      })
      .catch((error) => {
        this.downloading = false;
      });
    }, 500);
  }
}