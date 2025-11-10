const collections = [];


const collectionTitleInput = document.getElementById('collection-title');
const createCollectionBtn = document.getElementById('create-collection-btn');
const collectionSelect = document.getElementById('collection-select');
const collectionList = document.getElementById('collections-list');
const cardQuestionInput = document.getElementById('card-question');
const cardAnswerInput = document.getElementById('card-answer');
const addCardBtn = document.getElementById('add-card-btn');
const cardsDisplay = document.getElementById('cards-display');
const flashcard = document.getElementById('flashcard');
const currentCollectionTitle = document.getElementById('current-collection-title');
const prevCardBtn = document.getElementById('prev-card');
const nextCardBtn = document.getElementById('next-card');

let currentCollection = null;
let currentCardIndex = 0;
let showAnswer = false;


createCollectionBtn.addEventListener('click', () => 
  {
  const title = collectionTitleInput.value.trim();
  if (!title) return alert("Entre un titre.");

  const newCollection = { title, cards: [] };
  collections.push(newCollection);

  const option = document.createElement('option');
  option.value = title;
  option.textContent = title;
  collectionSelect.appendChild(option);

  /*const div = document.createElement('div');
  div.textContent = title;
  div.className = "h-16 flex items-center justify-center bg-aymane-green text-body-bg rounded-full cursor-pointer hover:scale-105 transition font-ay-cyber";
  div.addEventListener('click', () => showCollection(newCollection));
  collectionList.appendChild(div);*/

    const card = document.createElement('div');

  card.className = `
  bg-aymane-gray border-2 border-aymane-violet
  rounded-2xl shadow-ay-cyber p-5 w-full cursor-pointer
  hover:scale-105 hover:border-aymane-cyan transition-all duration-200
  flex flex-col justify-between
`;


card.innerHTML = `
  <h3 class="text-xl font-ay-cyber text-aymane-cyan mb-2">${title} /*or option.value*/</h3>
  <p class="text-sm text-aymane-text/80 shadow-sy-cyber">0 cartes</p>
`;
 


card.addEventListener('click', () => showCollection(newCollection));

collectionList.appendChild(card);


  collectionTitleInput.value = "";
});


addCardBtn.addEventListener('click', () => 
  {
  const selectedTitle = collectionSelect.value;
  const question = cardQuestionInput.value.trim();
  const answer = cardAnswerInput.value.trim();

  if (!selectedTitle || !question || !answer)
    return alert("Remplis tous les champs.");

  const target = collections.find(c => c.title === selectedTitle);
  if (!target) return;

  target.cards.push({ question, answer });

  cardQuestionInput.value = "";
  cardAnswerInput.value = "";
  alert("Carte ajoutée !");
});


function showCollection(collection) 
{
  if (collection.cards.length === 0) 
  {
    alert("Aucune carte dans cette collection !");
    return;
  }

  currentCollection = collection;
  currentCardIndex = 0;
  showAnswer = false;

  currentCollectionTitle.textContent = collection.title;
  cardsDisplay.classList.remove('hidden');

  renderCard();
}


function renderCard() 
{
  const card = currentCollection.cards[currentCardIndex];
  flashcard.textContent = showAnswer ? card.answer : card.question;
}


flashcard.addEventListener('click', () => 
  {
  showAnswer = !showAnswer;
  renderCard();
});

nextCardBtn.addEventListener('click', () => 
  {
  if (!currentCollection) return;
  currentCardIndex = (currentCardIndex + 1) % currentCollection.cards.length;
  showAnswer = false;
  renderCard();
});

prevCardBtn.addEventListener('click', () => 
  {
  if (!currentCollection) return;
  currentCardIndex = (currentCardIndex - 1 + currentCollection.cards.length) % currentCollection.cards.length;
  showAnswer = false;
  renderCard();
});


localStorage.setItem('nom', 'aymane');
console.log(localStorage.getItem('nom'));

function savedCollection() 
{
    
}

