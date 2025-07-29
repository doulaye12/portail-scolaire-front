import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.css'
})
export class CustomToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'fail' = 'success';

  visible: boolean = true;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.visible = false;
    // }, 5000);
  }
}
