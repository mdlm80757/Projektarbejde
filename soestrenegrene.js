"use strict";

console.log("JavaScript-filen er forbundet");


/*
    1. VARIABLER OG DATATYPER
*/

// Primitive datatyper
const shopName = "Søstrene Grene"; // String
const freeShippingLimit = 500;     // Number
const shopIsOpen = true;           // Boolean
const currentDiscount = null;      // Null

// Undefined, indtil brugeren vælger et produkt
let selectedProduct;


/*
    2. ARRAYS OG OBJEKTER

    products er et array.
    Hvert produkt i arrayet er et objekt.
*/

const products = [
    {
        id: 1,
        name: "Keramisk vase",
        price: 129.95,
        category: "bolig",
        inStock: true,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Dekorativ lysestage",
        price: 79.95,
        category: "bolig",
        inStock: true,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Flettet opbevaringskurv",
        price: 149.95,
        category: "bolig",
        inStock: false,
        image: "https://images.unsplash.com/photo-1594224457860-23bdb45f8e3d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Stentøjskrus",
        price: 49.95,
        category: "koekken",
        inStock: true,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Serveringsskål",
        price: 99.95,
        category: "koekken",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Kreativt malesæt",
        price: 89.95,
        category: "kreativitet",
        inStock: true,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
    }
];


/*
    Kategorierne er også et array med objekter.
*/

const popularCategories = [
    {
        name: "Bolig",
        icon: "🛋️",
        productFilter: "bolig"
    },
    {
        name: "Interiør",
        icon: "🏺",
        productFilter: "bolig"
    },
    {
        name: "Møbler",
        icon: "🪑",
        productFilter: "bolig"
    },
    {
        name: "Køkkenudstyr",
        icon: "🍽️",
        productFilter: "koekken"
    },
    {
        name: "Gaver",
        icon: "🎁",
        productFilter: "kreativitet"
    },
    {
        name: "Julegaver",
        icon: "🎄",
        productFilter: "kreativitet"
    }
];


// Kurven er et tomt array ved sidens start
const cart = [];

// let bruges, fordi kategorien ændrer sig
let selectedCategory = "alle";


/*
    3. DOM

    JavaScript finder elementerne fra HTML.
*/

const productContainer =
    document.querySelector("#product-container");

const cartCount =
    document.querySelector("#cart-count");

const cartTotal =
    document.querySelector("#cart-total");

const cartItems =
    document.querySelector("#cart-items");

const cartPanel =
    document.querySelector("#cart-panel");

const cartButton =
    document.querySelector("#cart-button");

const closeCartButton =
    document.querySelector("#close-cart-button");

const clearCartButton =
    document.querySelector("#clear-cart-button");

const filterButtons =
    document.querySelectorAll(".filter-button");

const menuButton =
    document.querySelector("#menu-button");

const navLinks =
    document.querySelector("#nav-links");

const readMoreButton =
    document.querySelector("#read-more-button");

const extraText =
    document.querySelector("#extra-text");

const newsletterForm =
    document.querySelector("#newsletter-form");

const emailInput =
    document.querySelector("#email");

const formMessage =
    document.querySelector("#form-message");

const notification =
    document.querySelector("#notification");

const popularCategoriesContainer =
    document.querySelector("#popular-categories");

const selectedCategoryMessage =
    document.querySelector("#selected-category-message");


/*
    4. FUNCTIONS
*/


// Formaterer en pris som et dansk beløb
function formatPrice(price) {
    return price.toLocaleString("da-DK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// Gør kategoriernes navne pænere
function formatCategory(category) {
    if (category === "koekken") {
        return "Køkken";
    } else if (category === "kreativitet") {
        return "Kreativitet";
    } else {
        return "Bolig";
    }
}


// Opretter de seks populære kategorier
function showPopularCategories() {
    popularCategoriesContainer.innerHTML = "";

    /*
        for...of er et loop.
        Loopet gennemgår alle kategoriobjekterne.
    */

    for (const category of popularCategories) {
        const categoryButton =
            document.createElement("button");

        categoryButton.type = "button";

        categoryButton.classList.add(
            "popular-category-button"
        );

        categoryButton.dataset.categoryName =
            category.name;

        categoryButton.dataset.productFilter =
            category.productFilter;

        categoryButton.innerHTML = `
            <span class="popular-category-icon">
                ${category.icon}
            </span>

            <span class="popular-category-name">
                ${category.name}
            </span>
        `;

        popularCategoriesContainer.appendChild(
            categoryButton
        );
    }

    addPopularCategoryEvents();
}


// Tilføjer klik-events til de populære kategorier
function addPopularCategoryEvents() {
    const categoryButtons =
        document.querySelectorAll(
            ".popular-category-button"
        );

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const categoryName =
                button.dataset.categoryName;

            const productFilter =
                button.dataset.productFilter;

            categoryButtons.forEach(
                function (categoryButton) {
                    categoryButton.classList.remove(
                        "active"
                    );
                }
            );

            button.classList.add("active");

            selectedCategoryMessage.textContent =
                "De har valgt kategorien: " +
                categoryName;

            selectedCategory = productFilter;

            showProducts(selectedCategory);
            markMatchingFilter(selectedCategory);

            document
                .querySelector("#produkter")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    });
}


// Markerer den filterknap, der svarer til kategorien
function markMatchingFilter(category) {
    filterButtons.forEach(function (button) {
        button.classList.remove("active");

        if (button.dataset.category === category) {
            button.classList.add("active");
        }
    });
}


// Viser og filtrerer produkterne
function showProducts(category) {
    productContainer.innerHTML = "";

    let visibleProducts;

    /*
        || betyder "eller".
    */

    if (category === "alle" || category === "") {
        visibleProducts = products;
    } else {
        visibleProducts = products.filter(
            function (product) {
                return product.category === category;
            }
        );
    }

    /*
        Kontrolstruktur:

        Hvis listen er tom, vises en besked.
        Ellers oprettes produktkortene.
    */

    if (visibleProducts.length === 0) {
        productContainer.innerHTML =
            "<p>Der blev ikke fundet nogen produkter.</p>";

        return;
    }

    /*
        Loopet opretter ét kort for hvert produkt.
    */

    for (const product of visibleProducts) {
        const productCard =
            document.createElement("article");

        productCard.classList.add("product-card");

        let stockText = "";
        let disabledText = "";

        if (product.inStock === false) {
            stockText =
                '<p class="stock-message">' +
                'Midlertidigt udsolgt</p>';

            disabledText = "disabled";
        }

        productCard.innerHTML = `
            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-information">
                <p class="product-category">
                    ${formatCategory(product.category)}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ${formatPrice(product.price)} kr.
                </p>

                ${stockText}

                <button
                    class="add-to-cart-button"
                    data-product-id="${product.id}"
                    type="button"
                    ${disabledText}
                >
                    ${
                        product.inStock
                            ? "Læg i kurv"
                            : "Udsolgt"
                    }
                </button>
            </div>
        `;

        productContainer.appendChild(productCard);
    }

    addProductButtonEvents();
}


// Tilføjer events til produktknapperne
function addProductButtonEvents() {
    const productButtons =
        document.querySelectorAll(
            ".add-to-cart-button"
        );

    productButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId =
                Number(button.dataset.productId);

            addToCart(productId);
        });
    });
}


// Lægger et produkt i kurven
function addToCart(productId) {
    selectedProduct = products.find(
        function (product) {
            return product.id === productId;
        }
    );

    /*
        && betyder "og".

        Produktet skal både eksistere og være på lager.
    */

    if (
        selectedProduct &&
        selectedProduct.inStock === true
    ) {
        cart.push(selectedProduct);

        updateCart();

        showNotification(
            selectedProduct.name +
            " er lagt i kurven"
        );
    }
}


// Fjerner ét produkt fra kurven
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// Opdaterer kurven og beregner samlet pris
function updateCart() {
    cartItems.innerHTML = "";

    /*
        totalPrice har local scope.
        += bruges til at lægge priser sammen.
    */

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p>Deres kurv er tom.</p>";
    } else {
        /*
            Almindeligt for-loop.
            index++ lægger 1 til index.
        */

        for (
            let index = 0;
            index < cart.length;
            index++
        ) {
            const product = cart[index];

            const cartItem =
                document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div>
                    <strong>${product.name}</strong>
                    <p>
                        ${formatPrice(product.price)} kr.
                    </p>
                </div>

                <button
                    class="remove-button"
                    data-cart-index="${index}"
                    type="button"
                >
                    Fjern
                </button>
            `;

            cartItems.appendChild(cartItem);

            totalPrice += product.price;
        }
    }

    cartCount.textContent = cart.length;

    cartTotal.textContent =
        formatPrice(totalPrice);

    const removeButtons =
        document.querySelectorAll(
            ".remove-button"
        );

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index =
                Number(button.dataset.cartIndex);

            removeFromCart(index);
        });
    });

    /*
        Comparison og logic.

        >= betyder større end eller lig med.
        && betyder "og".
    */

    if (
        totalPrice >= freeShippingLimit &&
        cart.length > 0
    ) {
        showNotification(
            "De har opnået gratis fragt"
        );
    }
}


// Tømmer hele kurven
function clearCart() {
    cart.length = 0;
    updateCart();
}


// Viser en kort besked på skærmen
function showNotification(message) {
    notification.textContent = message;

    notification.classList.remove("hidden");

    setTimeout(function () {
        notification.classList.add("hidden");
    }, 2500);
}


/*
    5. EVENTS
*/


// Filtreringsknapper ved produkterne
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory =
            button.dataset.category;

        filterButtons.forEach(
            function (filterButton) {
                filterButton.classList.remove(
                    "active"
                );
            }
        );

        button.classList.add("active");

        showProducts(selectedCategory);

        selectedCategoryMessage.textContent = "";
    });
});


// Åbn kurven
cartButton.addEventListener("click", function () {
    cartPanel.classList.remove("hidden");
});


// Luk kurven
closeCartButton.addEventListener(
    "click",
    function () {
        cartPanel.classList.add("hidden");
    }
);


// Tøm kurven
clearCartButton.addEventListener(
    "click",
    function () {
        clearCart();
    }
);


// Åbn og luk mobilmenuen
menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("menu-open");
});


// Vis og skjul den ekstra tekst
readMoreButton.addEventListener(
    "click",
    function () {
        extraText.classList.toggle("hidden");

        if (
            extraText.classList.contains("hidden")
        ) {
            readMoreButton.textContent = "Læs mere";
        } else {
            readMoreButton.textContent = "Vis mindre";
        }
    }
);


// Nyhedsbrevsformular
newsletterForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (
            email !== "" &&
            email.includes("@")
        ) {
            formMessage.textContent =
                "Tak for Deres tilmelding til " +
                shopName +
                ".";

            emailInput.value = "";
        } else {
            formMessage.textContent =
                "Skriv venligst en gyldig e-mailadresse.";
        }
    }
);


/*
    6. VARIABLE SCOPE
*/

// Global scope: Kan bruges i hele filen
const globalMessage =
    "Velkommen til vores hjemmeside";


function demonstrateLocalScope() {
    // Local scope: Kan kun bruges i funktionen
    const localMessage =
        "Denne tekst findes kun inde i funktionen";

    console.log(globalMessage);
    console.log(localMessage);
}


demonstrateLocalScope();


/*
    7. PROGRAMMET STARTER
*/

console.log("Butikken hedder:", shopName);
console.log("Er butikken åben?", shopIsOpen);
console.log("Aktuel rabat:", currentDiscount);
console.log("Alle produkter:", products);

showPopularCategories();
showProducts("alle");
updateCart();