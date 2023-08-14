import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertyfy from 'alertifyjs';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editData: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetSudentById(this.data.id).subscribe(response => {
        this.editData = response;
        console.log(this.editData);

        this.studentForm.patchValue({
          studentId: this.editData.studentId,
          firstName: this.editData.firstName,
          lastName: this.editData.lastName,
          contactNo: this.editData.contactNo,
          email: this.editData.email,
          ssn: this.editData.ssn,
          dob: this.editData.dob,
          title: this.editData.title,
          startDate: this.editData.startDate,
          PrimaryAdressLine: this.editData.PrimaryAdressLine,
          street: this.editData.street,
          city: this.editData.city,
          country: this.editData.country,
          url: "./assets/profile.jpg",
        })
        this.url = this.studentForm.getRawValue().url;
      });
    }
  }

  url: any;

  studentForm = this.builder.group({
    studentId: this.builder.control(''),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    contactNo: this.builder.control('', Validators.maxLength(10)),
    email: this.builder.control('', Validators.email),
    ssn: this.builder.control('', Validators.required),
    dob: this.builder.control('', Validators.required),
    title: this.builder.control('', Validators.required),
    startDate: this.builder.control('', Validators.required),
    PrimaryAdressLine: this.builder.control('', Validators.required),
    street: this.builder.control('', Validators.required),
    city: this.builder.control('', Validators.required),
    country: this.builder.control('', Validators.required),
    url: this.builder.control(''),
  })

  SaveStudent() {
    if (this.studentForm.valid) {
      const editId = this.studentForm.getRawValue().studentId;
      if (editId != '' && editId != null) {
        this.api.UpdateStudent(editId, this.studentForm.getRawValue()).subscribe(response => {
          this.ClosePopup();
          alertyfy.success("Updated successfully.");
        });
      } else {
        this.api.saveStudent(this.studentForm.value).subscribe(response => {
          alertyfy.success("Saved Successfully");
          this.ClosePopup();
        });
      }
    }
  }

  ClosePopup() {
    this.dialog.closeAll();
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        const formdata: FormData = new FormData();
        formdata.append('url', e.target.files[0], "profile");

        this.api.SaveProfileImage(1, formdata).subscribe(result => {
          alertyfy.success("Image Saved Successfully");
        })
      }
    }

  }

}
