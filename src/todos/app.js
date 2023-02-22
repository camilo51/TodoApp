import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./usecases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilter: '.filtro',
    PendingCount: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos )
        updatePendingCount()
    }
 
    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCount);
    } 

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filterLis = document.querySelectorAll(ElementIDs.TodoFilter);

    newDescriptionInput.addEventListener('keyup', event => {
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    })

    todoListUL.addEventListener('click', e => {
        const element = e.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos();
    })
    todoListUL.addEventListener('click', e => {
        const element = e.target.closest('[data-id]')
        const isDestroy = e.target.className === 'destroy';

        if ( !element || !isDestroy) return;

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
    })
    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos()
    })
    filterLis.forEach(element => {
        element.addEventListener('click', (element) => {
            filterLis.forEach(el => el.classList.remove('selected'))
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }
            displayTodos();
        })
    })

}