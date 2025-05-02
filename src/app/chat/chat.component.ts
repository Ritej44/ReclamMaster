import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { WebsocketService } from '../websocket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: string = '';  
  message: string = '';  
  messages: any[] = []; 
  isConnected = false;  // Tracks whether the user is connected to the WebSocket
  connectingMessage = 'Connexion...';  // Message to show while connecting

  constructor(private toastr :ToastrService,private websocketService: WebsocketService,private location:Location,private router: Router) {
    console.log('AppComponent constructor called');  
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit called'); 

     // Subscribe to messages observable to receive messages from the WebSocket service
     this.websocketService.messages$.subscribe(message => {
      if (message) {
        // Log and add the received message to the array of messages
        console.log(`Message received from ${message.sender}: ${message.content}`);
        this.messages.push(message);
      }
    });

    // Subscribe to connection status observable to monitor connection status
    this.websocketService.connectionStatus$.subscribe(connected => {
      this.isConnected = connected;  // Update the connection status
      if (connected) {
        this.connectingMessage = '';  // Clear the connecting message once connected
        console.log('WebSocket connection established');
      }
    });

  }

  connect(){

    console.log('Attempting to connect to WebSocket at http://localhost:8084/ws with username:', this.username);
    this.websocketService.connect(this.username);
    if(this.username==""){
      this.toastr.error('Veuillez entrer un nom d\'utilisateur');  
    }  
  }

  sendMessage(){
    if (this.message) {
      this.websocketService.sendMessage(this.username, this.message);  
      this.message = '';  
    }
  }
  onMessageReceived(message: any) {
    console.log('Message received:', message); 
  
    if (message.type === 'JOIN') {
      message.content = `${message.sender} `+ 'joindre Le chat' ;  // Format join message
    } else if (message.type === 'LEAVE') {
      message.content = `${message.sender}` +' quitte Le chat';  // Format leave message
    } else if (message.type === 'CHAT') {
      message.content = message.content;  // Format chat message
    } else {
      message.content = 'Unknown message type';  // Handle unknown message types
    }
    this.messages.push(message);  // Add the message to the array of messages   
  } // Log the received message

  getAvatarColor(sender:string):string{

     // Array of colors to choose from
     const colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];
     let hash = 0;
     for (let i = 0; i < sender.length; i++) {
       // Generate a hash from the sender's name
       hash = 31 * hash + sender.charCodeAt(i);  // Create a hash based on the username
     }
     // Return a color from the array based on the hash value
     return colors[Math.abs(hash % colors.length)];
   }

  Retour(){
    this.location.back();
  }
}