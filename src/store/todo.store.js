import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore :)');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}
const saveToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}
const getTodo = (filter = Filters.All) =>{
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed: 
            return state.todos.filter(todo => todo.done)
        case Filters.Pending: 
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Opcion ${ filter } is not valid`)
    }
}
const addTodo = (descripcion) => {
    if (!descripcion) throw new Error('Description is required');
    state.todos.push(new Todo(descripcion))
    saveToLocalStorage()
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo;
    })
    saveToLocalStorage()
}
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveToLocalStorage()
}
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)
    saveToLocalStorage()
}
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveToLocalStorage()
}
const getCurrentFilter = () => {
    return state.filter;
}


export default {
    initStore,
    loadStore,  
    getTodo,
    addTodo,    
    toggleTodo, 
    deleteTodo, 
    deleteCompleted,    
    setFilter,  
    getCurrentFilter,   
}