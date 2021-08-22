goog.provide('todopad')
goog.provide('todopad.Todo')

goog.require('goog.dom')
goog.require('goog.dom.TagName');
goog.require('goog.ui.Zippy');


todopad.makeTodos = function(data, todoContainer){
    for(let i = 0; i < data.length; i++){
        const todo = new todopad.Todo(data[i], todoContainer)
        todo.makeTodoDom()
    }
}

todopad.Todo = class {
    constructor(data, noteContainer) {
        this.title = data.title;
        this.done = data.done;
        this.parent = noteContainer;
    }
    makeTodoDom(){
        this.titleElement = goog.dom.createDom(goog.dom.TagName.SPAN, null, this.title);
        const doneState = this.done ? "完了": "未完了"
        this.doneElement = goog.dom.createDom(goog.dom.TagName.BUTTON, {'style': 'margin-right:30px;'}, doneState)
        const todoElement = goog.dom.createDom(goog.dom.TagName.DIV, null, this.doneElement, this.titleElement)
        this.parent.appendChild(todoElement);
    }

}