import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

}
