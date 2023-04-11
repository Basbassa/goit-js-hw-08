// Importowanie metody throttle z biblioteki Lodash
import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');

// Funkcja do zapisywania wartości do localStorage przy zmianie
const saveStateToLocalStorage = () => {
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const state = { email, message };

  localStorage.setItem('feedback-form-state', JSON.stringify(state));
};

// Funkcja do wypełniania pól formularza danymi z localStorage po załadowaniu strony
const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    form.elements.email.value = state.email;
    form.elements.message.value = state.message;
  }
};

// Zapisywanie wartości pól do localStorage przy zmianie z wykorzystaniem throttle
form.addEventListener('input', throttle(saveStateToLocalStorage, 500));

// Wypełnianie pól formularza danymi z localStorage po załadowaniu strony
window.addEventListener('load', loadStateFromLocalStorage);

// Wysłanie formularza
form.addEventListener('submit', event => {
  event.preventDefault();

  // Pobranie wartości pól
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  // Logowanie wartości do konsoli
  console.log({ email, message });

  // Czyszczenie pól formularza
  form.reset();

  // Usuwanie zapisanego stanu z localStorage
  localStorage.removeItem('feedback-form-state');
});
