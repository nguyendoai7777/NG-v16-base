import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe',
  standalone: true,
})
export class TestPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return !value ? '' : value.toString().toUpperCase();
  }
}

@Pipe({
  name: 'includes',
  standalone: true,
})
export class IncludesPipe implements PipeTransform {
  transform<T>(value: T[], item: T): boolean {
    return value?.includes(item);
  }
}
