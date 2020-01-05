import { Programme } from './../../models/programme';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home-component',
  templateUrl: '../home/home.component.html',
  styleUrls: ['../home/home.component.css']

})
export class HomePageComponent {

  uploadedFileData: string;
  uploadedFileName: string;

  programmes: Programme[] = []; // store Programmes
  suggestedProgrammes: Programme[] = []; // store suggested Programmes
  imagePathTest = './../assets/programmeShowChoices/danishgirl.jpg';
  processed: string;
  helpSection = false;

  constructor() {
  }

  openFile(event) {
    const input = event.target;
    for (let index = 0; index < input.files.length; index++) {
        const reader = new FileReader();
        reader.onload = () => {
            this.uploadedFileData = reader.result;
            this.uploadedFileName = event.target.files[0].name;
        };
        reader.readAsText(input.files[index]);
      }
  }

  processXML() {
          const parser = new DOMParser();
          const xmlData = parser.parseFromString(this.uploadedFileData, 'application/xml');
          const node = xmlData.getElementsByTagName('*');
          console.log(this.uploadedFileName);
          if (this.uploadedFileName === undefined) {
            this.processed = 'Invalid File Format';
          }else {
            this.processed = 'Processed: ' + this.uploadedFileName;
          }

          for (let i = 0; i < node.length; i++) {
            if (node[i].nodeType === Node.ELEMENT_NODE) {
              if (node[i].hasAttribute('id')) {
                this.createProgrammeArray(node[i].getAttribute('id'), node[i].childNodes);
              }
            }
          }
  }

  onSliderInputChange(event, moodId: string) {
      this.populateSuggestedProgramme(moodId, event.value);
  }


  // TODO: Allow storing of all slider values.
  // TODO: With more than 5 of each mood, should pick random programmes.
  populateSuggestedProgramme(moodId: string, moodValue: number) {
    this.suggestedProgrammes = [];
    let moodChosen = '';
    const mood = [] = moodId.split(',');
    if (moodValue < 50) {
      moodChosen = mood[0];
    } else {
      moodChosen = mood[1];
    }
    for (let i = 0; i < this.programmes.length; i++) {
      for (let j = 0; j < this.programmes[i].getMood().length; j++) {
        if (this.programmes[i].getMood()[j].includes(moodChosen)) {
          this.suggestedProgrammes.push(this.programmes[i]);
        }
      }
    }
  }

  createProgrammeArray(id: string, programmes: NodeList) {
    this.programmes.push(new Programme(programmes.item(1).textContent,
      programmes.item(3).textContent,
      programmes.item(5).textContent.split(',')));
  }

  openHelpSection() {
    this.helpSection = !this.helpSection;
  }
}
