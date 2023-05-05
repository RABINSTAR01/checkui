import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardsService } from './service/cards.service';
import { Card } from './models/card.model';
import { NgForm } from '@angular/forms';
import { __values } from 'tslib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  title = 'cards';
 
  cards:Card[]=[];
  card:Card={
    id:'',
    cardNumber:'',
    cardholderName:'',
    expiryMonth:'',
    expiryYear:'',
    cvc :''

  }
  constructor(private cardservice:CardsService)
  {

  }
  
  ngOnInit(): void {
    this.getAllCards();
  }
  getAllCards()
  {
   this.cardservice.getallcards().subscribe(response=>
    {
      console.log(response)
      this.cards=response
    });
    
  }

  onSubmit() {
if(this.card.id === '')
{
  this.cardservice.addCard(this.card).subscribe(response=>
    {
      console.log(response);
      this.getAllCards();
      this.card={
        id:'',
    cardNumber:'',
    cardholderName:'',
    expiryMonth:'',
    expiryYear:'',
    cvc :''

      }
    });
}else{
  this.updateCard(this.card)
  {

  }
}

  
  }
  updateCard(card: Card) {
    this.cardservice.updateCard(card).subscribe(response=>
      {
        this.getAllCards();
      });

  }

  // deleteCard(id: string) {
  //   this.cardservice.deleteCard(id).subscribe(
  //     response =>
  //     {
  //      this.getAllCards();
  //     }
  //   );
    
  //   }
  deleteCard(id: string) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.cardservice.deleteCard(id).subscribe(
        response => {
          this.getAllCards();
        }
      );
    }
  }
  

    updated(card:Card)
    {
      this.card=card;

    }
  



}
