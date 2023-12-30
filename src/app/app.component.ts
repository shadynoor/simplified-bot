import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Task } from './task.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'challenge';

  @ViewChildren('input') inputField!: QueryList<ElementRef>;
  @ViewChildren('tasks') tasksQuery!: QueryList<ElementRef>;

  // Start Inspection
  inspectionActivated = true;
  canSelect = true;

  // Inputs Array
  tasksInput: Task[] = [
    {
      name: 'task-1',
      value: '',
      isSelected: false,
    },
    {
      name: 'task-2',
      value: '',
      isSelected: false,
    },
    {
      name: 'task-3',
      value: '',
      isSelected: false,
    },
  ];

  // Tasks Array
  tasks: Task[] = [
    {
      name: 'Wake up',
      value: 'Wake up',
      isSelected: false,
      isCompleted: false,
    },
    {
      name: 'Work',
      value: 'Work',
      isSelected: false,
      isCompleted: false,
    },
    {
      name: 'Game',
      value: 'Game',
      isSelected: false,
      isCompleted: false,
    },
    {
      name: 'Sleep',
      value: 'Sleep',
      isSelected: false,
      isCompleted: false,
    },
  ];

  // to blur another section
  customSelect = false;
  blurTasks = false;
  blurInputs = false;

  // to handle text for controls div
  selectedInputArr: Task[] = [];
  selectedTasksArr: Task[] = [];
  currentSelect = '';

  // next step for controls
  next = false;

  // Add Task to checkboxes array
  addTask(input: Task) {
    if (input.value) {
      this.tasks.push({ ...input, isCompleted: false, isSelected: false });
      input.value = '';
    }
  }

  // Remove Task to checkboxes array
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  // Complete Task by check it
  completeTask(event: Event, task: Task) {
    task.isCompleted = (event.target as HTMLInputElement).checked;
  }

  // Select similar inputs
  selectSimilar(index: number, type: string) {
    if (this.canSelect) {
      this.inspectionActivated = true;
      if (type == 'input') {
        this.currentSelect = 'input';
        if (this.customSelect) {
          this.blurTasks = true;
          this.blurInputs = false;
        }

        this.tasksInput[index].isSelected = true;
        if (!this.selectedInputArr.includes(this.tasksInput[index])) {
          this.selectedInputArr.push(this.tasksInput[index]);
        }
        this.inputField.forEach((elem) => {
          elem.nativeElement.classList.add('similar-elements');
        });
      } else {
        this.currentSelect = 'task';
        if (this.customSelect) {
          this.blurTasks = false;
          this.blurInputs = true;
        }
        this.tasks[index].isSelected = true;
        if (!this.selectedTasksArr.includes(this.tasks[index])) {
          this.selectedTasksArr.push(this.tasks[index]);
        }
        this.tasksQuery.forEach((elem) => {
          elem.nativeElement.classList.add('similar-elements');
        });
      }
    }
  }

  // go to actions controls
  startInspect() {
    this.next = true;
  }

  // Reset everything
  removeInspect() {
    this.selectedInputArr = [];
    this.selectedTasksArr = [];
    this.currentSelect = '';

    this.inputField.forEach((elem) => {
      elem.nativeElement.classList.remove('similar-elements');
    });
    this.tasksQuery.forEach((elem) => {
      elem.nativeElement.classList.remove('similar-elements');
    });

    this.tasks.forEach((e) => {
      e.isSelected = false;
    });

    this.tasksInput.forEach((e) => {
      e.isSelected = false;
    });

    this.blurTasks = false;
    this.blurInputs = false;
  }

  // Blur the other section
  doAction(type: string) {
    if (type == 'button') {
      this.blurInputs = true;
      this.blurTasks = false;
      this.inputField.forEach((elem) => {
        elem.nativeElement.classList.remove('similar-elements');
      });
      this.tasksInput.forEach((e) => {
        e.isSelected = false;
      });
    } else {
      this.blurInputs = false;
      this.blurTasks = true;
      this.tasksQuery.forEach((elem) => {
        elem.nativeElement.classList.remove('similar-elements');
      });
      this.tasks.forEach((e) => {
        e.isSelected = false;
      });
    }
  }

  // complete all tasks
  runBot() {
    this.removeInspect();
    this.tasks.forEach((e) => {
      e.isCompleted = true;
    });

    this.tasksInput.forEach((e, i) => {
      e.value = 'New Task ' + (i + 1);
    });
  }
}
