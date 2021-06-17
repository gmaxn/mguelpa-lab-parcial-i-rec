import { trigger, animate, transition, style, group, query} from '@angular/animations';

export const sideNavAnimation = trigger('openClose', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      backgroundColor: 'rgba(30,30,30,0)'
    }),
    animate('0.2s 100ms ease-out', style({
      transform: 'translateX(0%)',
    })),
    animate('0.3s 100ms ease-in', style({
      backgroundColor: 'rgba(30,30,30,0.5)'
    })),
  ]),
  transition(':leave', [
    animate('0.3s 100ms ease-in', style({
      backgroundColor: 'rgba(30,30,30,0)'
    })),
    animate('0.2s 100ms ease-in', style({
      transform: 'translateX(-100%)',
      backgroundColor: 'rgba(30,30,30,0)'
    }))
  ])
]);