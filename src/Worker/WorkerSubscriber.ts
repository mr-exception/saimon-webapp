import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { IWorkerMessage } from "./utils";

class WorkerSubscriber {
  private worker: Worker;
  private onMessage$ = new Subject<IWorkerMessage>();
  constructor(path: string) {
    this.worker = new Worker(path);
    this.worker.addEventListener("message", (data) => {
      this.onMessage$.next(data.data as IWorkerMessage);
    });
  }
  public emit(event: string, data: any): void {
    this.worker.postMessage({ event, data });
  }

  public on<T>(event: string): Observable<T> {
    return this.onMessage$.pipe(
      filter((record) => record.event === event),
      map((record) => record.data)
    );
  }
}

export default WorkerSubscriber;
