

import { BaseComponent } from './../component.js';

export class PageComponent extends BaseComponent <HTMLUListElement>{
    //private element: HTMLUListElement;

    constructor() {
 super('<ul class="page">This is PageComponenet!</ul>');
   //super('<ul class ='page'>This is  PageComponent!</ul>' );

        // this.element = document.createElement(`ul`);
        // this.element.setAttribute(`class`, `page`);
        // this.element.textContent = `This is PageComponent`;
    }

    //원하는 곳에 page 추가
    //  attachTo(parent: HTMLElement, position: InsertPosition = `afterbegin`) {
    //     parent.insertAdjacentElement(position, this.element);
    //  }

};
