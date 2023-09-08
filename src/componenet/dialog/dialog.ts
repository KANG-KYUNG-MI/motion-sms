import { BaseComponent, Component } from './../component.js';
import { Composable } from '../page/page.js';

type onCloseListener = () => void;
type onSubmitListener = () => void;

//closeListener, submitListener를 외부에서 받는다고????
//그리고 등록된 listener가 존재한다면 호출해준다고???

export interface MediaData {
    readonly title: string;
    readonly url: string;
}

export interface TextData {
  readonly title: string;
   readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {

    closeListener?: onCloseListener;
    submitListener?: onSubmitListener;

    constructor() {
        super(`<dialog class="dialog">
               <div class= "dialog_container">
               <button class="close">*</button>
               <div id="dialog_body">
               
               </div>
               <button class="dialog_submit">ADD</button>
               </div>
               </dialog>`);

        const closeBtn = this.element.querySelector('.close')! as HTMLElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        }

        const submitBtn = this.element.querySelector('.dialog_submit')! as HTMLElement;
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        }
    }

    setOnCloseListener(listener: onCloseListener) {
        this.closeListener = listener;
    }

    setOnSubmitListener(listener: onSubmitListener) {
        this.submitListener = listener;
    }
//dialog_body
    addChild(child: Component) {
        const body = this.element.querySelector('#dialog_body')! as HTMLElement;
        child.attachTo(body);
    }

}