document.addEventListener("DOMContentLoaded", loadProducts);

const form = document.querySelector(".grocery-form");
const input = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");

let editMode = false;
let editElement = null;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();

    if (!value) {
        showAlert("Будь ласка, введіть назву продукту", "danger");
        return;
    }

    if (editMode) {
        editElement.querySelector(".title").textContent = value;
        updateLocalStorage();
        showAlert("Продукт оновлено!", "success");
        submitBtn.textContent = "Додати";
        editMode = false;
    } else {
        addProduct(value);
        showAlert("Продукт додано!", "success");
    }

    input.value = "";
});

clearBtn.addEventListener("click", function () {
    groceryList.innerHTML = "";
    localStorage.removeItem("products");
    showAlert("Список очищено!", "danger");
});

function addProduct(value) {
    const article = document.createElement("article");
    article.classList.add("grocery-item");
    article.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

    article.querySelector(".edit-btn").addEventListener("click", function () {
        input.value = article.querySelector(".title").textContent;
        submitBtn.textContent = "Редагувати";
        editMode = true;
        editElement = article;
    });

    article.querySelector(".delete-btn").addEventListener("click", function () {
        article.remove();
        updateLocalStorage();
        showAlert("Продукт видалено!", "danger");
    });

    groceryList.append(article);
    updateLocalStorage();
}

function updateLocalStorage() {
    const products = [...document.querySelectorAll(".title")].map(p => p.textContent);
    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach(addProduct);
}

function showAlert(message, type) {
    alert.textContent = message;
    alert.classList.add(`alert-${type}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${type}`);
    }, 2000);
}