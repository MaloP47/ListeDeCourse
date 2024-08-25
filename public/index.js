import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	apiKey: "AIzaSyBU7afJDV7uk7SD026bKBZ5TlW4iNClxhY",
	authDomain: "listedecourse-4df62.firebaseapp.com",
	databaseURL: "https://listedecourse-4df62-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "listedecourse-4df62",
	storageBucket: "listedecourse-4df62.appspot.com",
	messagingSenderId: "751834613669",
	appId: "1:751834613669:web:3203166752678d8d380a4c"
  };

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if (inputValue) {
    	push(shoppingListInDB, inputValue)
	}
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
	clearShoppingListEl()
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
