import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../models/Client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    clients: Client[] = [];
  
    constructor(private clientService: ClientService) {}
  
    ngOnInit(): void {
      this.loadMembers();
    }
  
    loadMembers(): void {
      this.clientService.getMembers().subscribe(data => {
        this.clients = data;
      });
    }

}
