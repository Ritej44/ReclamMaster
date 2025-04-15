import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Client, IMessage, Stomp, StompConfig } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
messages: any;

  constructor(private renderer: Renderer2,private router:Router) {}

  ngOnInit(): void {
    this.loadScript('/assets/js/main.js');
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.head, script);
  }
  private stompClient: any;

  sendMessage() {
    if (this.stompClient) {
      this.stompClient.send('/app/send', {}, JSON.stringify({content: 'Hello'}));
    }
  }
  Retour(){
    
    this.router.navigate(['/dashbord-admin'])
  }
  
}