import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zeatr';
  constructor(){}
  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0, 0);
  }


}
