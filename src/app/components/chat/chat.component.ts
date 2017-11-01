import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
// import { Feathers } from '../../services/feathers.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<any[]>;
  users$: Observable<any[]>;

  chat$: Observable<any>;

  // id$ = new Subject<string | number>();
  chat: any;
  @Input() id: string | number;
  //  = new Subject<string | number>();
  // set id(id) {
  //   this.id$.next(id);
  // };

  constructor(private data: DataService, private auth: AuthService) {
    this.chat$ = Observable.of(this.id).filter(id => !!id).mergeMap((id: string) => data.chat$(id));

    // get messages from data service
    this.messages$ = this.chat$.map(({messages}) => messages);
    this.users$ = this.chat$.map(({users}) => users);
    // this.messages$ = data.messages$()
    //   // our data is paginated, so map to .data
    //   .map(m => m.data)
    //   // reverse the messages array, to have the most recent message at the end
    //   // necessary because we get a descendingly sorted array from the data service
    //   .map(m => m.reverse());

    // get users from data service
    // this.users$ = data.users$()
    //   // our data is paginated, so map to .data
    //   .map(u => u.data);
  }

  ngOnInit() {
    this.data.joinChat(this.id);
  }

  ngOnDestroy() {
    // this.id$.complete();
  }

  sendMessage(message: string) {
    this.data.sendMessage(message, this.id);
  }

  logOut() {
    this.auth.logOut();
  }
}
