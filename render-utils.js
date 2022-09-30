export function renderList(list) {
    const li = document.createElement('li');
    if (list.complete) {
        li.classList.add('complete');
    }

    const p = document.createElement('p');
    p.textContext = list.item;
    li.append(p);

    return li;
}
