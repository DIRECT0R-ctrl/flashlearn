const collection = [];

const collectionTitleInput = document.getElementById('collection-title');
const createCollectionBtn = document.getElementById('create-collection-btn');


const collectionSelect = document.getElementById('collection-select');
const collectionList = document.getElementById('collections-list');

createCollectionBtn.addEventListener('click', () => {
  const title = collectionTitleInput.value.trim();
  if(!title) return;

  collection.push({title, cards: []});

  const option = document.createElement('option');
  option.value = title;
  option.textContent = title;
  collectionSelect.appendChild(option);

  const div = document.createElement('div');
  div.textContent = title;
  div.className = "p-4 bg-aymane-gray rounded-lg cursor-pointer hover:bg-aymane-cyan transition";
  collectionList.appendChild(div);

  collectionTitleInput.value = "";
  alert('new collection added');
});


/*function handlclick(){
  console.log('i am handlclick');
};

createCollectionBtn.addEventListener('click', handlclick);
*/





