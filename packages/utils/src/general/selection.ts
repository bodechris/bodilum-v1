/**
 * 
 * This file contains functions to help with text selection in contenteditable divs
 * 
 */

export function getCurrentRange() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  return sel.getRangeAt(0);
}

interface ContentEditableElement extends HTMLElement {
    contentEditable: "true";
}

export function placeCaretAtEnd(el: ContentEditableElement | HTMLDivElement): void {
    el.focus();
    const range: Range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false); // false = end, true = start
    const sel: Selection | null = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
}

interface SelectableNode extends Node {}

export function selectNode(node: SelectableNode): void {
    const range: Range = document.createRange();
    range.selectNode(node); // includes the node itself
    const sel: Selection | null = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
}


interface InsertTextAtCaretOptions {
    text: string;
}

export function insertTextAtCaret(text: string): void {
    const range: Range | null = getCurrentRange();
    if (!range) return;
    range.deleteContents();
    const textNode: Text = document.createTextNode(text);
    range.insertNode(textNode);
    // move caret to after the inserted text
    range.setStartAfter(textNode);
    range.collapse(true);
    const sel: Selection | null = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
}


export function wrapSelection(tagName = 'strong') {
  const range = getCurrentRange();
  if (!range || range.collapsed) return; // nothing selected
  const wrapper = document.createElement(tagName);

  // Extract the selection into a DocumentFragment
  const frag = range.extractContents();

  // Surrounding with arbitrary elements sometimes fails if selection
  // partially covers elements; surroundContents() throws in that case.
  // Using extract+append avoids that.
  wrapper.appendChild(frag);
  range.insertNode(wrapper);

  // Reselect newly wrapped content (optional)
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  const newRange = document.createRange();
  newRange.selectNodeContents(wrapper);
  sel.addRange(newRange);
}


interface ReplaceSelectionWithHTMLOptions {
    html: string;
}

export function replaceSelectionWithHTML(html: ReplaceSelectionWithHTMLOptions['html']): void {
    const range: Range | null = getCurrentRange();
    if (!range) return;
    range.deleteContents();
    const tpl: HTMLTemplateElement = document.createElement('template');
    tpl.innerHTML = html.trim();
    const frag: DocumentFragment = tpl.content;
    const lastNode: ChildNode | null = frag.lastChild;
    range.insertNode(frag);
    // put caret after inserted content
    if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        const sel: Selection | null = window.getSelection();
        if (!sel) return;
        sel.removeAllRanges();
        sel.addRange(range);
    }
}


interface CaretMarkerElements {
    el: HTMLElement;
}

export function saveCaret(el: HTMLElement): CaretMarkerElements | null {
    const range: Range | null = getCurrentRange();
    if (!range) return null;

    // Create markers
    const start: HTMLSpanElement = document.createElement('span');
    start.id = 'caret-start';
    const end: HTMLSpanElement = document.createElement('span');
    end.id = 'caret-end';
    start.style.display = end.style.display = 'none';

    const r1: Range = range.cloneRange();
    r1.collapse(true);
    r1.insertNode(start);

    const r2: Range = range.cloneRange();
    r2.collapse(false);
    r2.insertNode(end);

    return { el };
}

export function restoreCaret() {
  const start = document.getElementById('caret-start');
  const end = document.getElementById('caret-end');
  if (!start || !end) return;

  const range = document.createRange();
  range.setStartAfter(start);
  range.setEndAfter(end);

  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);

  start.remove();
  end.remove();
}


export function getCaretRect() {
  const range = getCurrentRange();
  if (!range) return null;

  // Insert a temporary marker if collapsed
  if (range.collapsed) {
    const marker = document.createElement('span');
    marker.textContent = '\u200b'; // zero-width space
    range.insertNode(marker);
    const rect = marker.getBoundingClientRect();
    const { top, left, bottom, right } = rect;
    // cleanup and restore caret after marker
    const r = document.createRange();
    r.setStartAfter(marker);
    r.collapse(true);
    const sel = window.getSelection();
    if (!sel) {
      marker.remove();
      return { top, left, bottom, right };
    }
    sel.removeAllRanges();
    sel.addRange(r);
    marker.remove();
    return { top, left, bottom, right };
  } else {
    const rects = range.getBoundingClientRect();
    return rects; // {top,left,...} of the selection box
  }
}

 // Optional caret preservation helpers (useful if you switch to 'input')
  interface CaretPosition {
    start: number;
    end: number;
  }

  function saveCaret2(container: HTMLElement): CaretPosition | null {
    const sel: Selection | null = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range: Range = sel.getRangeAt(0);
    return {
      start: getCharOffset(container, range.startContainer, range.startOffset),
      end: getCharOffset(container, range.endContainer, range.endOffset)
    };
  }

  interface RestoreCaret2Position {
    start: number;
    end: number;
  }

  interface NodeOffset {
    node: Node;
    offset: number;
  }

  function restoreCaret2(container: HTMLElement, pos: RestoreCaret2Position | null): void {
    if (!pos) return;
    const sel: Selection | null = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    const range: Range = document.createRange();
    const start: NodeOffset = getNodeAtOffset(container, pos.start);
    const end: NodeOffset = getNodeAtOffset(container, pos.end);
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    sel.addRange(range);
  }

  // Linearize text to compute offsets (simple, robust for most contenteditable uses)
  interface GetCharOffsetParams {
    root: Node;
    node: Node;
    nodeOffset: number;
  }

  function getCharOffset(root: Node, node: Node, nodeOffset: number): number {
    const walker: TreeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let offset = 0;
    while (walker.nextNode()) {
      const n: Node = walker.currentNode;
      if (n === node) return offset + nodeOffset;
      offset += n.nodeValue ? n.nodeValue.length : 0;
    }
    return offset;
  }

  interface NodeOffset {
    node: Node;
    offset: number;
  }

  function getNodeAtOffset(root: Node, target: number): NodeOffset {
    const walker: TreeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let offset = 0, last: Node = root;
    while (walker.nextNode()) {
      const n: Node = walker.currentNode;
      const len: number = n.nodeValue ? n.nodeValue.length : 0;
      if (offset + len >= target) {
        return { node: n, offset: target - offset };
      }
      offset += len;
      last = n;
    }
    // Fallback to end
    return { node: last, offset: last.nodeValue ? last.nodeValue.length : 0 };
  }


// beforeinput: fires before mutations; check event.inputType (insertText, deleteContentBackward, insertFromPaste, etc.) and event.data for characters.

// input: fires after the DOM change.

// compositionstart/update/end: IME input (important for mobile/Asian languages).

// paste: for sanitization.

// keydown: for custom shortcuts (e.g., Ctrl+B).

