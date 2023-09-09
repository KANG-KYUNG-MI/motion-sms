import { BaseComponent } from './../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
    // private element: HTMLElement;
    constructor(title: string, url: string) {
        super(`
        <section class="image">
        <div class="image_holder"><img class="image_thumnail"> 
        </div>
        <h1 class="image_title"></h1>
        </section>
        `);

        //private element: HTMLElement;
        //         const template = document.createElement('template');
        //         template.innerHTML = `
        // <section class="image">
        //     <div class="image_holder"><img class="image_thumnail"></div>
        // <p class="image_title"></p>
        // </section>`;

        //this.element = section> div
        // this.element = template.content.firstElementChild! as HTMLImageElement;

        const imageElement = this.element.querySelector('.image_thumnail')! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image_title')! as HTMLParagraphElement;
        titleElement.textContent = title;
    }

    // attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    //     parent.insertAdjacentElement(position, this.element);
    // }
}