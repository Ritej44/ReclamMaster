import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  newMessagesCount: number = 0;
  
  constructor(private chatService: ChatService, private authService:AuthService ,private router :Router) {}




  ngOnInit(): void {
    this.messages = this.chatService.getMessages();
    this.updateNewMessagesCount();
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const message: Message = {
        sender: 'User', // Peut être dynamique en fonction de l'utilisateur connecté
        content: this.newMessage,
        timestamp: new Date()
      };
      this.chatService.addMessage(message);
      this.newMessage = ''; // Réinitialiser l'input après l'envoi
      this.updateNewMessagesCount();
    }
  }

  updateNewMessagesCount(): void {
    // Logique pour mettre à jour le compteur de nouveaux messages
    // Par exemple, vous pouvez vérifier les messages non lus et mettre à jour newMessagesCount
    this.newMessagesCount = this.messages.filter(msg => !msg.isRead).length;
  }

  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }
}
