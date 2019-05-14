import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  constructor(
    private data: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  type: string;
  user: string;
  inputType: string;
  inputValue: string;
  incomingInput: string;
  checkboxValue: string;
  buttonValue: string;

  todo = [
    {
      type: 'text',
      label: 'Input Box'
    },
    {
      type: 'select',
      label: 'Select Box'
    },
    {
      type: 'checkbox',
      label: 'Check Box'
    },
    {
      type: 'radio',
      label: 'Radio Button'
    },
    {
      type: 'button',
      label: 'Button'
    }
  ];

  todo1 = [
    {
      type: 'text',
      label: 'Input Box'
    },
    {
      type: 'select',
      label: 'Select Box'
    }
  ];
  todo2 = [
    {
      type: 'checkbox',
      label: 'Check Box'
    },
    {
      type: 'radio',
      label: 'Radio Button'
    }
  ];
  todo3 = [
    {
      type: 'button',
      label: 'Button'
    }
  ];

  done = [];

  ngOnInit() {
    this.data.cast.subscribe(user => (this.user = user));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      height: '300px',
      data: { inputType: this.incomingInput, value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.done[this.done.length - 1].checkboxValue = result.checkboxValue;
        this.done[this.done.length - 1].buttonValue = result.buttonValue;
        this.done[this.done.length - 1].inputType = result.inputType;
        this.done[this.done.length - 1].inputValue = result.inputValue;
        this.getJSON();
      } else {
        this.done.splice(this.done.length - 1, 1);
      }

    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.getJSON();
    } else {
      if (this.done.length < 5) {
        this.incomingInput = event.previousContainer.data[event.previousIndex]['type'];

        if (
          event.previousContainer.data[event.previousIndex]['type'] === 'text' ||
          event.previousContainer.data[event.previousIndex]['type'] === 'checkbox' ||
          event.previousContainer.data[event.previousIndex]['type'] === 'button'
        ) {
          this.openDialog();
        }

        this.done.push(event.previousContainer.data[event.previousIndex]);

      } else {
        alert('Cannot add more than 5 Items');
      }
      this.getJSON();
    }
  }
  drop1(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      this.done.splice(event.previousIndex, 1);
    }
    this.getJSON();
  }

  editType() {
    this.data.editType(this.done);
    this.router.navigate(['/select']);
  }

  getJSON() {
    this.type = JSON.stringify(this.done);
    const t = /]/gi;
    const t1 = /[[]/gi;
    const rep = /{/gi;
    const rep1 = /","/gi;
    const rep2 = /"},/gi;
    this.type = this.type.replace(t1, '');
    this.type = this.type.replace(t, '');
    this.type = this.type.replace(rep, '{\n');
    this.type = this.type.replace(rep1, '";\n"');
    this.type = this.type.replace(rep2, '";\n}\n');
    this.type = this.type.replace(rep2, '"\n}');

    if (this.done.length === 0) {
      this.type = '';
    }
  }
}
export interface DialogData {
  inputType: string;
  value: string;
  inputValue: string;
  checkboxValue: string;
  buttonValue: string;
}
