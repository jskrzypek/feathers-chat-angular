import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Feathers } from '../../services/feathers.service';

@Component({
  selector: 'app-chat-select',
  templateUrl: './chat-select.component.html',
  styleUrls: ['./chat-select.component.css']
})
export class ChatSelectComponent {
  chats$: Observable<any[]>;
  messages: string[] = [];
  // name: any;
  // id: any;
  chat: { _id?: string | number, name?: string } = {};

  constructor(private feathers: Feathers, private router: Router, private auth: AuthService, private data: DataService) {
    this.chats$ = data.chats$()
      // our data is paginated, so map to .data
      .map(m => {
        console.log(m);
        return m.data;
      });
  }

  selectChat(chat) {
    this.data.joinChat(chat);
    // this.router.navigate(['/chat', chat._id]);
  }

  createChat(name) {
    this.feathers.service('chats')
      .create({ name })
      .then((chat) => {
        this.messages.push(`Chat '${chat.name}' created.`);
        this.chat = chat;
      })
      .catch(err => this.messages.push('Could not create chat!'));
  }
  log(evt) {
    console.log(evt);
    console.log(JSON.stringify(evt));
    this.messages.push(JSON.stringify(evt));
  }
}
