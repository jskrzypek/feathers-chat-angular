import { Injectable } from '@angular/core';
import { Feathers } from './feathers.service';

/**
 *  Abstraction layer for data management
 *  Technically this isn't needed for feathers-chat,
 *  but you will need it for more complex tasks.
 */
@Injectable()
export class DataService {
  constructor(private feathers: Feathers) {
  }

  messages$(query = {}) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers
      .service('messages')
      .watch()
      .find({
        query: Object.assign({}, query, {
          $sort: {createdAt: -1},
          $limit: 25
        })
      });
  }

  users$(query = {}) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers
      .service('users')
      .watch()
      .find(query);
  }
  user$(id: string | number, params?: any) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers
      .service('users')
      .watch()
      .get(id);
  }


  chats$(params?: any) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers
      .service('chats')
      .watch()
      .find(params && params.query);
  }

  chat$(id: string | number, params?: any) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers
      .service('chats')
      .watch()
      .get(id);
  }

  sendMessage(text: string, chatId: string | number) {
    if (text === '') {
      return;
    }

    // feathers-reactive Observables are hot by default,
    // so we don't need to subscribe to make create() happen.
    this.feathers
      .service('messages')
      .create({ chatId, text });
  }
  joinChat(chat) {
    this.feathers
      .service('chats')
      .patch(chat._id, chat);
  }
}
