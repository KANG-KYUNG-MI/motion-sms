import { BaseComponent } from './../../component.js';
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super(`
        <section class="note">
        <h2 class="note_title"></h2>     
        <p class="note_body"></p>
        </section>
        `);
        const titleElement = this.element.querySelector('.note_title');
        titleElement.textContent = title;
        const bodyElememnt = this.element.querySelector('.note_body');
        bodyElememnt.textContent = body;
    }
}
