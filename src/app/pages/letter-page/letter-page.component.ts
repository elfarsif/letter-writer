import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { json, response } from 'express';
import { Subscription } from 'rxjs';
import { EndpointsService } from 'src/app/service/endpoints/endpoints.service';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-letter-page',
  templateUrl: './letter-page.component.html',
  styleUrls: ['./letter-page.component.css'],
})
export class LetterPageComponent {
  letterParameters: FormGroup = new FormGroup({
    postalCode: new FormControl(''),
    letterType: new FormControl(['']),
    promptIssue: new FormControl(''),
    requestPolicyPrompt: new FormControl(''),
    thankPrompt: new FormControl(''),
  });
  content!: any;
  prompt: string =
    'a call to action for more environmental policies in government';
  currentValue: any;
  isLoading = false;
  constructor(
    private sharedService: SharedService,
    private endpointsService: EndpointsService
  ) {}

  submitForm() {
    this.isLoading = true;
    console.log(this.letterParameters.value.requestPolicyPrompt);
    console.log('letter type', this.letterParameters.value.letterType);
    if (this.letterParameters.value.letterType == 'critique') {
      this.getLetterHeader(
        this.letterParameters.value.postalCode,
        'critique of general climate inaction in our government'
      );
    } else if (this.letterParameters.value.letterType == 'thank') {
      console.log('thank prompt', this.letterParameters.value.thankPrompt);
      this.getLetterHeader(
        this.letterParameters.value.postalCode,
        'a show of appreciation for advocacy of ' +
          this.letterParameters.value.thankPrompt
      );
    } else if (this.letterParameters.value.letterType == 'requestPolicy') {
      const prompt =
        'request more funding and research of ' +
        this.letterParameters.value.requestPolicyPrompt;

      console.log('requestPolicy', prompt);
      this.getLetterHeader(this.letterParameters.value.postalCode, prompt);
    }
  }

  getLetterHeader(postalCode: string, prompt: string) {
    console.log('______Calling Endpoint_______');
    this.endpointsService.greetWithName(postalCode, prompt).subscribe(
      (response) => {
        console.log('Greeting:', response.message);
        console.log(JSON.parse(response.message).body.paragraph1);
        this.content = this.jsonToStringWithBr(JSON.parse(response.message));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.isLoading = false;
        // Handle errors appropriately
      }
    );
  }
  jsonToStringWithBr(jsonObj: any): string {
    let result = '';

    function processObject(obj: any): void {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (typeof value === 'object') {
            processObject(value);
          } else if (key === 'complimentaryClose') {
            result += `${value}<br><br>`;
          } else if (key === 'postalCode') {
            result += `${value}<br><br>`;
          } else {
            result += `${value}<br>`;
          }
        }
      }
    }

    processObject(jsonObj);
    return result;
  }
}
