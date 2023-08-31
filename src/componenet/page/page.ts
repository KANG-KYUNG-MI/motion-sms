import { Component, BaseComponent } from './../component.js';


export interface Composable {
    addChild(child: Component): void;
    removeFrom(parent: HTMLElement): void;
}

//SectionContainer가 되기 위한 규약사항 

interface SectionContainer extends Component, Composable {
    setOnCloseListener(Listener: OnCloseListener): void;
}
type SectionContainerConstructor={
    new(): SectionContainer;
}

type OnCloseListener = () => void;

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {

    private closeListener?: OnCloseListener;
    constructor() {
        //텅텅빈 section 안에 image, note, todo, video 가 들어간다. 
        super(`<li class="page-item">
    <section class="page-item_body">
    </section>

    <div class="page-item_controls">
        <button class="close">
            &times;
        </button>
    </div>
</li>`)

        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }

    //외부에서 어떤 아이템을 전달하냐에 따라서 sectiond에 추가 됨.
    addChild(child: Component) {
        const container = this.element.querySelector('.page-item_body')! as HTMLElement;
        child.attachTo(container);
        //child.attachTo(section); child는 .page-item_body에 붙일 수 있다.
    }

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }
}


export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    //private element: HTMLUListElement;
    constructor( private pageItemConstructor: SectionContainerConstructor) {
        super('<ul class = "page"></ul>');

    }

    //section = new image, new note, new todo or new video
    addChild(section: Component) {
        const item = new this.pageItemConstructor();

        item.addChild(section);
        //addChild( New Image : component){
        //const item = new PageItemComponent();
        //newPageItemComponent().addChild( New Image());
        //NewImage().attachTo( container);
        //container.inserAdjacentElemnet(this.element)
        //container.inserAdjacentElement( 
        //<section class="image">
        // <div class="image_holder"><img class="image_thumnail"> 
        // </div>
        // <p class="image_title"></p>
        // </section>
        //)}

        item.attachTo(this.element, 'beforeend');
        //this.element = ul
        //new PageItemComponent().attachTo( ul, 'beforeend');

        //this.element = <li>...</LI>;
        //ul.insertAdjacentElement( <li>..</li>);
        //ul.inserAdjacentElement(<li>..</li>)

        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })

    }
}

