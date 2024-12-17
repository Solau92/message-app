import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { Messagedto } from '../model/messagedto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  messages: Messagedto[] = [];
  newMessage: string = '';
  email: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // todo : à remettre pour avoir liste initialement
    // this.getMessages();
    // this.refreshMessages();
  }

  // getMessages(): void {
  //   this.http.get<string[]>('http://localhost:8080/conversation/1')
  //     .subscribe(
  //       (data) => this.messages = data,
  //       (error) => console.error('Error fetching messages', error)
  //     );
  // }

  // Fonctionne : 
  // getMessages(): void {
  //   this.http.get<Message[]>('http://localhost:8080/conversation/1')
  //     .subscribe(
  //       (data) => this.messages = data,
  //       (error) => console.error('Error fetching messages', error)
  //     );
  // }

  //   getMessages(): void {
  //   this.http.get<Messagedto[]>('http://localhost:8080/conversation/1')
  //     .subscribe(
  //       (data) => this.messages = data,
  //       (error) => console.error('Error fetching messages', error)
  //     );
  // }

  getMessages(): void {
    this.http.get<Messagedto[]>('http://localhost:8080/conversation')
      .subscribe(
        (data) => this.messages = data,
        (error) => console.error('Error fetching messages', error)
      );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = { content: this.newMessage };
      this.http.post('http://localhost:8080/message/send', message)
        .subscribe(
          () => {
            this.newMessage = '';
            this.getMessages();
          },
          (error) => console.error('Error sending message', error)
        );
    }
  }

  connect(): void {
    if (this.email.trim()) {
      const email = { content: this.email };
      this.http.post('http://localhost:8080/connect', email)
        .subscribe(
          () => {
            this.getMessages();
          },
          (error) => console.error('Error connecting', error)
        );
    }
  }

  deconnect(): void {
    if (this.email.trim()) {
      const email = { content: this.email };
      this.http.post('http://localhost:8080/deconnect', email)
        .subscribe(
          () => {
            this.getMessages();
          },
          (error) => console.error('Error connecting', error)
        );
    }
  }

  // TODO : à remettre 
  // refreshMessages(): void {
  //   setInterval(() => {
  //     this.getMessages();
  //   }, 5000); // Actualise toutes les 5 secondes
  // }

  // TODO 
  sender(email: string): boolean {
    return email == this.email;
  }

}
