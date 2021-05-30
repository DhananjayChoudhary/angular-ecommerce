import { Component, OnInit } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-data',
  templateUrl: './book-data.component.html',
  styleUrls: ['./book-data.component.css']
})
export class BookDataComponent implements OnInit {

  books!: Book[];

  totalRecords!:number;
  
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().
      then(books => this.books = books);
      this.totalRecords = this.books.length;
  }
  
 
}
