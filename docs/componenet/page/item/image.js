import { BaseComponent } from './../../component.js';
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`
        <section class="image">
        <div class="image_holder"><img class="image_thumnail"> 
        </div>
        <h1 class="image_title"></h1>
        </section>
        `);
        const imageElement = this.element.querySelector('.image_thumnail');
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector('.image_title');
        titleElement.textContent = title;
    }
}
