import { Injectable } from '@angular/core';


export interface Message {
  sender: string;
  content: string;
  timestamp: Date;
  isRead?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }



  private messages: Message[] = [];


  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): void {
    message.isRead = false; 
    this.messages.push(message);
  }
}


