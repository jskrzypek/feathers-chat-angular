import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  messages$: Observable<any[]>;
  chats$: Observable<any[]>;

  user$: Observable<any>;

  id: string | number;

  constructor(private data: DataService, private auth: AuthService) {
    this.user$ = data.user$(this.id);
    // get messages from data service
    this.messages$ = data.messages$()
      // our data is paginated, so map to .data
      .map(m => m.data)
      // reverse the messages array, to have the most recent message at the end
      // necessary because we get a descendingly sorted array from the data service
      .map(m => m.reverse());

    // get chats from data service
    this.chats$ = data.chats$()
      // our data is paginated, so map to .data
      .map(u => u.data);
  }

  logOut() {
    this.auth.logOut();
  }
}
