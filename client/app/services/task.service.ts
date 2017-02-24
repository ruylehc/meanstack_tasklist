import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class TaskService{
  constructor(private http:Http){
    console.log('Task Service initialized...');
  }

  getTasks(){
    return this.http.get('/api/tasks')
      .map(res => res.json());
  }

  addTask(newTask){
  //using http module so we need to set our headers
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/tasks', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
  }

  deleteTask(id){
    return this.http.delete('/api/tasks/'+id)
      .map(res => res.json());
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/tasks/'+task._id, JSON.stringify(task), {headers: headers})
      .map(res => res.json());
  }

}
