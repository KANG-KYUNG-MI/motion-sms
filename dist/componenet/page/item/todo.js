import { BaseComponent } from './../../component.js';
export class TodoComponent extends BaseComponent {
    constructor(title, todo) {
        super(`
        <section class="note">
        <h2 class="todo_title"></h2>     
        <input type="checkbox" class="todo-checkbox"></input>
        </section>
        `);
        const titleElement = this.element.querySelector('.todo_title');
        titleElement.textContent = title;
        const todoElememnt = this.element.querySelector('.todo-checkbox');
        todoElememnt.insertAdjacentText('afterend', todo);
    }
}
