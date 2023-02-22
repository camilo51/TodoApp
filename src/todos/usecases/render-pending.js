import todoStore, { Filters } from "../../store/todo.store";

let element;

export const renderPending = (elementId) => {
    if(!element)
        element = document.querySelector(elementId)
    if(!element)
        throw new Error('Element ${elementId} not Found');
    
    element.innerHTML = todoStore.getTodo(Filters.Pending).length;
}