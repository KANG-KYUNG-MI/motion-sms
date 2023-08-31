import { BaseComponent } from './../../component.js';

export class TodoComponent extends BaseComponent<HTMLElement>{

    constructor(title: string, todo: string) {
        super(`
        <section class="note">
        <h2 class="todo_title"></h2>     
        <input type="checkbox" class="todo-checkbox"></input>
        </section>
        `);

        const titleElement = this.element.querySelector('.todo_title')! as HTMLHeadingElement;
        titleElement.textContent = title;

        const todoElememnt = this.element.querySelector('.todo-checkbox')! as HTMLInputElement;
        todoElememnt.insertAdjacentText('afterend', todo);
    }
} 