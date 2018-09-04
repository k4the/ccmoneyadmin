import {trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';

export const slideDown = trigger('slideDown', [
    state('closed', style({
        top: '*'
    })),
    state('open', style({
        top: '0'
    })),
    transition('closed <=> open', animate('300ms ease-in'))
]);


// export const slideDown =
//   trigger('slideDown', [
//     state('*',
//       style({
//         opacity: 1,
//         transform: 'perspective(500px) translateZ(0px)',
//       })
//     ),
//     transition(':enter', [
//       style({
//         opacity: 0,
//         transform: 'perspective(500px) translateZ(-400px)',
//       }),
//       animate('10s ease')
//     ]),
//     transition(':leave', [
//       animate('10s ease', style({
//         opacity: 0,
//         transform: 'perspective(500px) translateZ(-400px)',
//       }))
//     ])
//   ]);
