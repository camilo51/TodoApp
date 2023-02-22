export const createTodoHTML = (todo) => {
    if( !todo ) throw new Error('A TODO Object is required'); 
    const html = `            
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.descripcion}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`

    const lisElement = document.createElement('li');
    lisElement.setAttribute('data-id', todo.id);
    lisElement.innerHTML = html;
    if (todo.done)
        lisElement.classList.add('completed');
    
    return lisElement
}