// @todo: Темплейт карточки

import { putLikeCard, putDislikeCard } from "./api";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки

export function createCard(cardData, mestoImage, likeIcon, deletePhoto, userId) {
  const cardElement = cardTemplate.cloneNode(true);
  //const card = getTemplate();
  
  const cardImage = cardElement.querySelector(".card__image");
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.id = cardData["_id"];

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  // @todo: Условия для удаления карточки
  //обработка клика по корзинке удаления карточки cardDeleteButton

  if (cardData.owner["_id"] != userId) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deletePhoto(cardElement.id);
    });
  }

  // @todo: Условия для проставления лайка на карточке с поиском айди
  // закрашиваем лайк при условии, что мы поставили лайк, присутствует id пользователя

  if (cardData.likes.some(card => card._id === userId)) {
    likeCardButton.classList.toggle("card__like-button_is-active");
  }
  likeCardButton.addEventListener("click", () =>
  likeIcon(likeCardButton, cardLikeCounter, cardElement.id)
  );
  cardImage.addEventListener("click", mestoImage);
  return cardElement;
};

 // @todo: Условия для проставления лайка/дизлайк на карточке

 export function handleLikeClick (likeCardButton, cardCounterElement, cardId) {
  if (likeCardButton.classList.contains("card__like-button_is-active")) {
    putDislikeCard(cardId).then((data) => {
      likeCardButton.classList.remove("card__like-button_is-active");
      cardCounterElement.textContent = data.likes.length;
    })
    .catch(console.error);
  } else {
    putLikeCard(cardId)
      .then((data) => {
        likeCardButton.classList.add("card__like-button_is-active");
        cardCounterElement.textContent = data.likes.length;
      })
      .catch(console.error);
  }
};


