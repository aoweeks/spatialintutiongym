import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsUtilsService {

  constructor() { }

  public getLineFromPoints(point1, point2) {
    const slope = (point1.x - point2.x) / (point1.y - point2.y);
  }
}
