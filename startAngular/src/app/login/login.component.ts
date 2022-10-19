// import components
import { Component, OnInit, OnChanges } from "@angular/core";
// import https services and form validators
import { HttpService } from "../Shared/http.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
// create and export login components
export class LoginComponent implements OnInit {
  image =
    "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";
  name1;
  age;
  loading = false;
  buttonText = "Submit";
// login user email validators
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
// add form control validators
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(public http: HttpService) {}

  ngOnInit() {
    console.log(this.http.test);
  }

  changeImage() {
    this.http.test = "changed";
    this.image =
      "https://images.pexels.com/photos/635529/pexels-photo-635529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
  }

  register() {
    this.loading = true;
    this.buttonText = "Submiting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    // send confirmation email upon successful registration
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `Voila! ${user.name} is successfully register 👏 and mail has been sent and the message id is ${res.messageId}`
        );
      },
       // add error handling functionality
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
  }
}
