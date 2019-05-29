export class Event{
  _id: string;
  category: string;
  event_type: string;
  alert_type:string;
  correspondance: string; 
  corr_email:boolean;
  corr_email_text:string;
  corr_email_subject:string;
  corr_sms:boolean;
  corr_sms_text:string;
  corr_twitter:boolean;
  corr_twitter_text:string;
}