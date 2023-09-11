import { PageComponent, PageItemComponent } from './componenet/page/page.js';
import { ImageComponent } from './componenet/page/item/image.js';
import { TodoComponent } from './componenet/page/item/todo.js';
import { NoteComponent } from './componenet/page/item/note.js';
import { VideoComponent } from './componenet/page/item/video.js';
import { InputDialog } from './componenet/dialog/dialog.js';
import { MediaSectionInput } from './componenet/dialog/input/media-input.js';
import { TextSectionInput } from './componenet/dialog/input/text-input.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog('#new-image', MediaSectionInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElementToDialog('#new-video', MediaSectionInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElementToDialog('#new-note', TextSectionInput, (input) => new NoteComponent(input.title, input.body));
        this.bindElementToDialog('#new-todo', TextSectionInput, (input) => new TodoComponent(input.title, input.body));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/500/250'));
        this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=m3DZsBw5bnE'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.attachTo(this.dialogRoot);
            dialog.addChild(input);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector('.document'), document.body);
