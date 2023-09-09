
import { Composable, PageComponent, PageItemComponent } from './componenet/page/page.js';
import { ImageComponent } from './componenet/page/item/image.js';
import { TodoComponent } from './componenet/page/item/todo.js';
import { NoteComponent } from './componenet/page/item/note.js';
import { VideoComponent } from './componenet/page/item/video.js';
import { Component } from './componenet/component.js';
import { InputDialog, MediaData, TextData } from './componenet/dialog/dialog.js';
import { MediaSectionInput } from './componenet/dialog/input/media-input.js';
import { TextSectionInput } from './componenet/dialog/input/text-input.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new(): T
};

class App {
    // private readonly page: PageComponent;
    private readonly page: Component & Composable;

    //appRoot = main
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {

        this.page = new PageComponent(PageItemComponent); //ul
        this.page.attachTo(appRoot);

        this.bindElementToDialog<MediaSectionInput>('#new-image', MediaSectionInput,
            (input: MediaSectionInput) => new ImageComponent(input.title, input.url));

        this.bindElementToDialog<MediaSectionInput>('#new-video',
            MediaSectionInput,
            (input: MediaSectionInput) => new VideoComponent(input.title, input.url));

        this.bindElementToDialog<TextSectionInput>('#new-note',
            TextSectionInput,
            (input: TextSectionInput) => new NoteComponent(input.title, input.body));

        this.bindElementToDialog<TextSectionInput>('#new-todo',
            TextSectionInput,
            (input: TextSectionInput) => new TodoComponent(input.title, input.body));

            
    //For demo :)
    this.page.addChild(new ImageComponent('Image Title',  'https://picsum.photos/500/250'));
    this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=m3DZsBw5bnE'));
    this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    //this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    //this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    //this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    //this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));

        //this.element = ul
        //New PageComponent().attachTo(main) =  main.insertAdjacentElement(position, ul);

        // const image = new ImageComponent('Image Title', ');'https://picsum.photos/600/300'
        // this.page.addChild(image);

        // const note = new NoteComponent('Note Title', 'Note Body');
        // this.page.addChild(note);
        // //note.attachTo(appRoot, 'beforeend');

        // const todo = new TodoComponent('Todo Title', 'Todo Item');
        // this.page.addChild(todo);
        // //todo.attachTo(appRoot, 'beforeend');

        // const video = new VideoComponent('Video Title', "https://www.youtube.com/embed/m3DZsBw5bnE");
        // this.page.addChild(video);
        // //video.attachTo(appRoot, 'beforeend');

        // const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        // imageBtn.addEventListener('click', () => {
        //     const dialog = new InputDialog();//cancel, submit
        //     const inputSection = new MediaSectionInput();//title, url

        //     dialog.attachTo(dialogRoot);
        //     //new inputDialog.attachTo(document.body);

        //     dialog.addChild(inputSection);
        //     //new InputDialog.addChild(inputSection);


        //     dialog.setOnCloseListener(() => {
        //         dialog.removeFrom(dialogRoot);
        //     });

        //     dialog.setOnSubmitListener(() => {

        //         const image = new ImageComponent(inputSection.title, inputSection.url);
        //         this.page.addChild(image);
        //         dialog.removeFrom(dialogRoot);
        //     });
        // });


        //     const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        //     videoBtn.addEventListener('click', () => {
        //         const dialog = new InputDialog();//cancel, submit
        //         const inputSection = new MediaSectionInput();//title, url

        //         dialog.attachTo(dialogRoot);
        //         //new inputDialog.attachTo(document.body);

        //         dialog.addChild(inputSection);
        //         //new InputDialog.addChild(inputSection);


        //         dialog.setOnCloseListener(() => {
        //             dialog.removeFrom(dialogRoot);
        //         });

        //         dialog.setOnSubmitListener(() => {

        //             const video = new VideoComponent(inputSection.title, inputSection.url);
        //             this.page.addChild(video);
        //             dialog.removeFrom(dialogRoot);
        //         });
        //     });


        //     const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        //     noteBtn.addEventListener('click', () => {
        //         const dialog = new InputDialog();//cancel, submit
        //         const inputSection = new TextSectionInput();//title, url

        //         dialog.attachTo(dialogRoot);
        //         //new inputDialog.attachTo(document.body);

        //         dialog.addChild(inputSection);
        //         //new InputDialog.addChild(inputSection);


        //         dialog.setOnCloseListener(() => {
        //             dialog.removeFrom(dialogRoot);
        //         });

        //         dialog.setOnSubmitListener(() => {

        //             const note = new NoteComponent(inputSection.title, inputSection.body);
        //             this.page.addChild(note);
        //             dialog.removeFrom(dialogRoot);
        //         });
        //     });


        //     const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        //     todoBtn.addEventListener('click', () => {
        //         const dialog = new InputDialog();//cancel, submit
        //         const inputSection = new TextSectionInput();//title, url

        //         dialog.attachTo(dialogRoot);
        //         //new inputDialog.attachTo(document.body);

        //         dialog.addChild(inputSection);
        //         //new InputDialog.addChild(inputSection);


        //         dialog.setOnCloseListener(() => {
        //             dialog.removeFrom(dialogRoot);
        //         });

        //         dialog.setOnSubmitListener(() => {

        //             const todo = new TodoComponent(inputSection.title, inputSection.body);
        //             this.page.addChild(todo);
        //             dialog.removeFrom(dialogRoot);
        //         });
        //     });

    }



    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string,
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component,
    ) {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();//cancel, submit
            const input = new InputComponent();//title, url, title, body

            dialog.attachTo(this.dialogRoot);
            //new inputDialog.attachTo(document.body);

            dialog.addChild(input);
            //new InputDialog.addChild(inputSection);


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

//appRoot = document.querySelector('.document')
new App(document.querySelector('.document')! as HTMLElement, document.body);

