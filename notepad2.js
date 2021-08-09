// Copyright 2009 Google Inc. All Rights Reserved.

goog.provide('tutorial.notepad');
goog.provide('tutorial.notepad.Note');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.Zippy');


// tutorial.notepad.Note.prototype.openEditor = function(e) {
//     const elt = e.target;
//     console.log(elt);
//     const content = goog.dom.getTextContent(elt);

//     const editorContainer = goog.dom.getElementSibling(elt);
//     const editor = goog.dom.getFirstElementChild(editorContainer);

//     editor.innerHTML = content;

//     elt.style.display = "none";
//     editorContainer.style.display = "inline";
// }


tutorial.notepad.makeNotes = function(data, noteContainer) {
    var notes = [];
    for (var i = 0; i < data.length; i++) {
      var note = new tutorial.notepad.Note(data[i], noteContainer);
      notes.push(note);
      note.makeNoteDom();
    }
    return notes;
};


tutorial.notepad.Note = class {
    /**
     * @param {Array.<Object>} data The data for a single note.
     * @param {Element} noteContainer The element under which DOM nodes for
     *     the notes should be added.
     */
    constructor(data, noteContainer) {
      this.title = data.title;
      this.content = data.content;
      this.parent = noteContainer;
    }

    /**
     * Creates the DOM structure for the note and adds it to the document.
     */
    makeNoteDom() {
      this.headerElement = goog.dom.createDom(goog.dom.TagName.DIV, null, this.title);
      this.contentElement = goog.dom.createDom(goog.dom.TagName.DIV, null, this.content);

      this.editorElement = goog.dom.createDom(goog.dom.TagName.TEXTAREA);
      const saveBtn = goog.dom.createDom(goog.dom.TagName.INPUT, {'type': 'button', 'value': 'Save'});
      this.editorContainer = goog.dom.createDom(goog.dom.TagName.DIV, {'style': 'display:none;'}, this.editorElement,saveBtn);
      this.contentContainer = goog.dom.createDom(goog.dom.TagName.DIV, null, this.contentElement, this.editorContainer);

      const newNote = goog.dom.createDom(goog.dom.TagName.DIV, null, this.headerElement, this.contentContainer);

      this.parent.appendChild(newNote);

      goog.events.listen(this.contentElement, goog.events.EventType.CLICK, this.openEditor, false, this);
      goog.events.listen(saveBtn, goog.events.EventType.CLICK, this.save, false, this);

      this.zippy = new goog.ui.Zippy(this.headerElement, this.contentContainer);
    }
  };

tutorial.notepad.Note.prototype.save = function(e) {
    this.content = this.editorElement.value;
    this.closeEditor();
  };

  tutorial.notepad.Note.prototype.closeEditor = function() {
    this.contentElement.innerHTML = this.content;
    this.contentElement.style.display = "inline";
    this.editorContainer.style.display = "none";
  };

  tutorial.notepad.Note.prototype.openEditor = function(e) {
    this.editorElement.value = this.content;
    this.contentElement.style.display = "none";
    this.editorContainer.style.display = "inline";
  };