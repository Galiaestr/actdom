'use strict';

// Utilidades 
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const buildCard = ({ id, titulo, tag }) => {
    const li = document.createElement('li');
    li.className = 'card';
    li.dataset.id = id;
    li.dataset.tag = tag;
    li.dataset.fav = '0';

    li.innerHTML = `
        <div class="card__head">
            <span class="badge">${tag}</span>
            <div class="actions">
            <button class="icon" type="button" data-action="fav" aria-label="Marcar favorito">☆</button>
            <button class="icon" type="button" data-action="done" aria-label="Marcar completada">✓</button>
            <button class="icon danger" type="button" data-action="del" aria-label="Eliminar">🗑</button>
          </div>
        </div>
        <p class="card__title">${titulo}</p>
    `;
    return li;
};

// Referencias al DOM
const formTarea = $('#formTarea');
const inputTitulo = $('#inputTitulo');
const selectTag = $('#selectTag');
const listaTareas = $('#listaTareas');

// Evento para agregar tareas
formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = inputTitulo.value.trim();
    if (!titulo) return;

    const nuevaTarea = {
        id: Date.now().toString(),
        titulo,
        tag: selectTag.value
    };

    const card = buildCard(nuevaTarea);
    listaTareas.append(card);

    inputTitulo.value = ''; // limpiar campo
});

//Evento para eliminar tareas
listaTareas.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="del"]');
    if (!btn) return; //si no es boton eliminar ignorar
    const card = btn.closest('.card');
    if (!card) return;
    card.remove();
});

// Evento para marcar como completada
listaTareas.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="done"]');
    if (!btn) return; // si no es boton ignorar 
    const card = btn.closest('.card');
    if (!card) return;
    // Alternar clase visual 
    card.classList.toggle('is-done');
});
