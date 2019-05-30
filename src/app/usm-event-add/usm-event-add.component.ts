import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import { FormControl,AbstractControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-usm-event-add',
  templateUrl: './usm-event-add.component.html',
  styleUrls: ['./usm-event-add.component.scss']
})
export class UsmEventAddComponent implements OnInit {

  eventForm: FormGroup;
  categoryOptions: string[] = ['Protect Your Super','Insurance','Investment Switch - Super','Pension - Income Election','Binding Nomination Renewal - Super'];
  eventOptions: string[] = ['New Application or Increase in Existing Insurance','Decrease or Cancellation','Application Decision','Application Acknowledgement','Initial Reminder - No Contribution - Month 16th Notification'];
  alertTypeOptions: string[] = ['Real Time','Time-Based'];
  recurTypeOptions: string[] = ['One Off','Recurring'];
  intervalTypeOptions: string[] = ['Daily','Weekly','Fortnightly','Annually'];


 /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.eventForm.get('formArray'); }

  category: string = '';
  event_type: string= '';
  alert_type:string = '';
  correspondance: string =''; 
  corr_email:boolean= true;
  corr_email_text:string= '';
  corr_email_subject:string= '';
  corr_sms:boolean= false;
  corr_sms_text:string = '';
  corr_twitter:boolean=false;
  corr_twitter_text:string='';
  isLoadingResults = false;
  recur_type : string ='';
  from_date:string = '';
  to_date:string = '';
  interval:string ='';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.eventForm = this.formBuilder.group({
      formArray:this.formBuilder.array([
        this.formBuilder.group({
      'category' : [null, Validators.required],
      'event_type' : [null, Validators.required],
      'alert_type' : [null, Validators.required]
        }),
      this.formBuilder.group({
      'corr_email' : true,
      'corr_email_subject' : [null],
      'corr_email_text' : [null],

      'corr_sms' : [null],
      'corr_sms_text' : [null],      

      'corr_twitter' : [null], 
      'corr_twitter_text' : [null]

        }),
           this.formBuilder.group({
      'recur_type' : [null],
      'from_date':[null],
      'to_date':[null],
      'interval':[null]
        })

      ])
   
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addEvent(form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/usm-events']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}


