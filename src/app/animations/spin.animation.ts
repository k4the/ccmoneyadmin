import { trigger, state, style, transition, animate } from '@angular/animations';

export const spin = trigger('spin', [
    state('forward', style({
      transform: 'rotateY(360deg)',
    })),
    state('backward', style({
      transform: 'rotateY(-360deg)',
    })),
    transition('forward <=> backward', animate('400ms ease-in'))
]);
