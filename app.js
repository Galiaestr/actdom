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
                <button class="icon" type="button" data-action="fav">☆</button>
                <button class="icon" type="button" data-action="done">✓</button>
                <button class="icon danger" type="button" data-action="del">🗑</button>
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

    inputTitulo.value = ''; 
    aplicarFiltro(); 
});

// Evento para eliminar tareas
listaTareas.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="del"]');
    if (!btn) return;
    const card = btn.closest('.card');
    if (!card) return;
    card.remove();
    aplicarFiltro(); 
});

// Evento para marcar como completada
listaTareas.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="done"]');
    if (!btn) return;
    const card = btn.closest('.card');
    if (!card) return;
    card.classList.toggle('is-done');
});

// Evento para marcar como favorita
listaTareas.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="fav"]');
    if (!btn) return;
    const card = btn.closest('.card');
    if (!card) return;

    const fav = card.dataset.fav === '1';
    card.dataset.fav = fav ? '0' : '1';
    btn.textContent = fav ? '☆' : '★';
    aplicarFiltro(); 
});

// Filtro de tareas 
let filtroActivo = 'all'; 

const chips = $$('.filters .chip'); 

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    // quitar la clase activa de todos
    chips.forEach(c => c.classList.remove('is-active'));
    // activar el chip seleccionado
    chip.classList.add('is-active');
    // guardar el filtro elegido
    filtroActivo = chip.dataset.filter;
    // aplicar el filtro
    aplicarFiltro();
  });
});

function aplicarFiltro() {
  const cards = $$('#listaTareas .card');

  cards.forEach(card => {
    const tag = card.dataset.tag;
    const esFav = card.dataset.fav === '1';

    let mostrar = false;

    if (filtroActivo === 'all') {
      mostrar = true;
    } else if (filtroActivo === 'fav') {
      mostrar = esFav;
    } else {
      mostrar = (tag === filtroActivo);
    }

    card.style.display = mostrar ? '' : 'none'; 
  });
}
