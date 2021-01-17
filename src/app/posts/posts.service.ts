import {Post} from './post.model';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]> ();

  constructor(private http: HttpClient){}

  // get : extracts and formats the data so we don't need to change it
  getPosts(): void{
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts; // salvam postarile fetch-uite de la server in variabila noastra posts asociata serviciului
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void{
    const post = {id: null, title , content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
