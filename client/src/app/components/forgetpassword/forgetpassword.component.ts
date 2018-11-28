import { Component, OnInit } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';  
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  loginurl='http://localhost:3000/sendemail';
  constructor(private http: Http,private router:Router) { }
   Email;
   checkemailurl='http://localhost:3000/logincheck';
   reseturl="http://localhost:3000/resetpassword";
   passwordset="http://localhost:3000/resetchange"
   verify_code=0;
   Code;
   forget_emailstatus=0;
   repassword;
   status=0;
   Password;
   code_status=0;
   Password_status=0;
   
  ngOnInit() 
  {
      this.status=0;
  }
  veripassword()
  {
     var plen=this.Password.length;
    if(this.Password == undefined)
    {
        this.Password_status=203;
    }
    else if(plen<6)
     {
          this.Password_status=202;
     }
     else
     {
         this.Password_status=200;
     }
     

  }
  codevalidation()
  {
    console.log(this.Code.length);
     if( this.Code==undefined)
     {
        this.code_status=203;
     }
     
     if(this.Code.length>3 || this.Code.length<3)
     {
         this.code_status=202;
         
     }
     else
     {
        this.code_status=200;
     }
  }
  check()
{
 
  if(this.Email=="")
  {
      return;
  }
  var myData=JSON.stringify({
    checkemail:this.Email
  });
  
  let headers = new Headers({
    'Content-Type': 'application/json'
});
let options = new RequestOptions({
    headers: headers
});
this.http.post(this.checkemailurl,myData, options).subscribe(data=>
  {
     if(data)
     { 
         var logininfo=data.json();
         console.log(logininfo);
         if(logininfo.status==400)
         {
              this.forget_emailstatus=400;
             
         }
         else
         {
              this.forget_emailstatus=200; 
         }
     }

  });
   
}
resetpassword()
{
  if(this.Code == undefined)
  {
     this.code_status=203;
     return;
  }
  if(this.code_status==202)
  {
     return;
 }
 if(this.Password == undefined)
 {
    this.Password_status=203;
    return;
 }
 if(this.Password_status == 202)
 {
    return;
 }
 var myData=JSON.stringify({
  Chkcode:this.Code,
  password:this.Password
});

let headers = new Headers({
  'Content-Type': 'application/json'
});
let options = new RequestOptions({
  headers: headers
});
this.http.post(this.passwordset,myData, options).subscribe(
  data=>
{

  //if to email sending is success
  this.verify_code=1;
});

}

  senmail()
  {
   if(this.forget_emailstatus==400)
   {
     return;
   }
    if(this.Email == undefined)
    {
      this.forget_emailstatus=202;
      return;   
    }
   
    if(this.forget_emailstatus==0)
    {
           return;
    }
 
    if(this.forget_emailstatus==404)
    {
      return; 
    }
    if(this.forget_emailstatus== 202)
    {
      return;
    }
    
    console.log("****");
    this.verify_code=1;
    this.status=1;
    var myData=JSON.stringify({
      checkemail:this.Email
    });
  
    
      let headers = new Headers({
        'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
        headers: headers
    }); 
    this.http.post(this.reseturl,myData, options).subscribe(
      data=>
    {

      //if to email sending is success
      this.verify_code=1;
    })
    // this.verify_code=1;
}

}
  