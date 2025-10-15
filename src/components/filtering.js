import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                           // Перебираем по именам
        elements[elementName].append(                       // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])          // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                                                            // @todo: создать и вернуть тег опции
                        const option = document.createElement("option");
                        
                        option.value = name;
                        option.textContent = name;

                        return option;
                      })
        )
     });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentNode;
            const input = parent.querySelector('input');

            // Если input найден
            if (input) {
                // Сбрасываем значение input
                input.value = '';
                
                // Получаем имя поля из data-field
                const field = action.dataset.field;
                
                // Сбрасываем значение в state
                if (field && state[field]) {
                    state[field] = '';
                }
            }
        }


        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}