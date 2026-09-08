console.log("JavaScript-filen er forbundet");

"use strict";

/*
    ==========================================
    1. VARIABLER, DATATYPER, ARRAYS OG OBJEKTER
    ==========================================
*/


// PRIMITIVE DATATYPER

// String: En tekstværdi
const shopName = "Søstrene Grene";

// Number: En talværdi
const freeShippingLimit = 500;

// Boolean: Enten true eller false
const shopIsOpen = true;

// Null: Værdien er bevidst tom
const currentDiscount = null;

// Undefined: Variablen har endnu ikke fået en værdi
let selectedProduct;


/*
    IKKE-PRIMITIVE DATATYPER

    products er et array.
    Hvert produkt inde i arrayet er et objekt.
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
    cart er et array, der begynder tomt.
    Produkter bliver tilføjet til arrayet senere.
*/

const cart = [];


/*
    let bruges, fordi værdien kan ændre sig.
    Brugeren kan vælge en anden kategori.
*/

let selectedCategory = "alle";


/*
    ==========================================
    2. DOM
    ==========================================

    DOM gør det muligt for JavaScript at finde
    og ændre elementer i HTML-dokumentet.
*/

const productContainer = document.querySelector("#product-container");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartItems = document.querySelector("#cart-items");
const cartPanel = document.querySelector("#cart-panel");
const cartButton = document.querySelector("#cart-button");
const closeCartButton = document.querySelector("#close-cart-button");
const clearCartButton = document.querySelector("#clear-cart-button");
const filterButtons = document.querySelectorAll(".filter-button");
const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");
const readMoreButton = document.querySelector("#read-more-button");
const extraText = document.querySelector("#extra-text");
const newsletterForm = document.querySelector("#newsletter-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");
const notification = document.querySelector("#notification");


/*
    ==========================================
    3. FUNCTIONS, LOOP OG KONTROLSTRUKTUR
    ==========================================
*/


// Funktionen modtager en pris og returnerer den i dansk format
function formatPrice(price) {
    return price.toLocaleString("da-DK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// Funktionen gør kategorinavnet pænere
function formatCategory(category) {
    /*
        Kontrolstruktur med if og else.
        Comparison-operatoren === sammenligner værdier.
    */

    if (category === "koekken") {
        return "Køkken";
    } else if (category === "kreativitet") {
        return "Kreativitet";
    } else {
        return "Bolig";
    }
}


// Funktionen viser produkterne på hjemmesiden
function showProducts(category) {
    productContainer.innerHTML = "";

    let visibleProducts;

    /*
        Logic-operatoren || betyder "eller".
        Hvis kategorien er "alle", viser vi hele arrayet.
    */

    if (category === "alle" || category === "") {
        visibleProducts = products;
    } else {
        /*
            filter gennemgår arrayet og vælger kun
            produkter med den rigtige kategori.
        */

        visibleProducts = products.filter(function (product) {
            return product.category === category;
        });
    }

    /*
        Et for...of-loop gennemgår alle produkterne.
        Der oprettes ét produktkort for hvert produkt.
    */

    for (const product of visibleProducts) {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        /*
            Kontrolstruktur og comparison.

            Hvis inStock er lig med false,
            bliver knappen deaktiveret.
        */

        let stockText = "";
        let disabledText = "";

        if (product.inStock === false) {
            stockText = '<p class="stock-message">Midlertidigt udsolgt</p>';
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
                    ${disabledText}
                >
                    ${product.inStock ? "Læg i kurv" : "Udsolgt"}
                </button>
            </div>
        `;

        productContainer.appendChild(productCard);
    }

    addProductButtonEvents();
}


// Funktionen tilføjer events til alle produktknapper
function addProductButtonEvents() {
    const productButtons = document.querySelectorAll(
        ".add-to-cart-button"
    );

    /*
        forEach er også en form for loop.
        Det gennemgår alle knapperne.
    */

    productButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.productId);

            addToCart(productId);
        });
    });
}


// Funktionen finder et produkt og lægger det i kurven
function addToCart(productId) {
    selectedProduct = products.find(function (product) {
        return product.id === productId;
    });

    /*
        Logic-operatoren && betyder "og".

        Produktet bliver kun tilføjet, hvis det både
        findes og er på lager.
    */

    if (selectedProduct && selectedProduct.inStock === true) {
        cart.push(selectedProduct);

        updateCart();
        showNotification(selectedProduct.name + " er lagt i kurven");
    }
}


// Funktionen fjerner en vare fra kurven
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// Funktionen opdaterer kurvens indhold
function updateCart() {
    cartItems.innerHTML = "";

    /*
        Assignment-operator:
        = tildeler variablen en værdi.

        Variablen er lokal, fordi den kun findes
        inde i funktionen updateCart.
    */

    let totalPrice = 0;

    /*
        Kontrolstruktur:
        Hvis arrayets længde er 0, er kurven tom.
    */

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Deres kurv er tom.</p>";
    } else {
        /*
            Et almindeligt for-loop.

            let index starter på 0.
            Loopet fortsætter, mens index er mindre
            end antallet af varer.
            index++ lægger 1 til index.
        */

        for (let index = 0; index < cart.length; index++) {
            const product = cart[index];

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div>
                    <strong>${product.name}</strong>
                    <p>${formatPrice(product.price)} kr.</p>
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

            /*
                Arithmetic-operatoren + lægger priser sammen.
                Assignment-operatoren += gemmer det nye resultat.
            */

            totalPrice += product.price;
        }
    }

    // DOM ændrer teksten på hjemmesiden
    cartCount.textContent = cart.length;
    cartTotal.textContent = formatPrice(totalPrice);

    const removeButtons = document.querySelectorAll(".remove-button");

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.cartIndex);
            removeFromCart(index);
        });
    });

    /*
        Comparison og logic.

        Hvis prisen er større end eller lig med
        fragtgrænsen, og kurven ikke er tom,
        vises en besked.
    */

    if (totalPrice >= freeShippingLimit && cart.length > 0) {
        showNotification("De har opnået gratis fragt");
    }
}


// Funktionen tømmer hele kurven
function clearCart() {
    /*
        Arrayets længde sættes til 0.
        Det fjerner alle elementerne i arrayet.
    */

    cart.length = 0;
    updateCart();
}


// Funktionen viser en kort besked
function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove("hidden");

    setTimeout(function () {
        notification.classList.add("hidden");
    }, 2500);
}


/*
    ==========================================
    4. EVENTS
    ==========================================
*/


// Event: Brugeren klikker på en kategoriknap
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        showProducts(selectedCategory);
    });
});


// Event: Brugeren åbner kurven
cartButton.addEventListener("click", function () {
    cartPanel.classList.remove("hidden");
});


// Event: Brugeren lukker kurven
closeCartButton.addEventListener("click", function () {
    cartPanel.classList.add("hidden");
});


// Event: Brugeren tømmer kurven
clearCartButton.addEventListener("click", function () {
    clearCart();
});


// Event: Brugeren åbner eller lukker mobilmenuen
menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("menu-open");
});


// Event: Brugeren trykker på "Læs mere"
readMoreButton.addEventListener("click", function () {
    extraText.classList.toggle("hidden");

    if (extraText.classList.contains("hidden")) {
        readMoreButton.textContent = "Læs mere";
    } else {
        readMoreButton.textContent = "Vis mindre";
    }
});


// Event: Brugeren indsender nyhedsbrevsformularen
newsletterForm.addEventListener("submit", function (event) {
    /*
        preventDefault forhindrer siden i at genindlæse,
        når formularen indsendes.
    */

    event.preventDefault();

    const email = emailInput.value.trim();

    /*
        Logic-operatoren && betyder "og".
        Begge betingelser skal være opfyldt.
    */

    if (email !== "" && email.includes("@")) {
        formMessage.textContent =
            "Tak for Deres tilmelding til " + shopName + ".";

        emailInput.value = "";
    } else {
        formMessage.textContent =
            "Skriv venligst en gyldig e-mailadresse.";
    }
});


/*
    ==========================================
    5. VARIABLE SCOPE
    ==========================================
*/


// Global scope: Kan bruges i hele JavaScript-filen
const globalMessage = "Velkommen til vores hjemmeside";


function demonstrateLocalScope() {
    /*
        Local scope:
        localMessage kan kun bruges inde i denne funktion.
    */

    const localMessage = "Denne tekst findes kun inde i funktionen";

    console.log(globalMessage);
    console.log(localMessage);
}


// Funktionen kaldes
demonstrateLocalScope();


/*
    localMessage kan ikke bruges herude.
    Hvis vi skrev console.log(localMessage),
    ville JavaScript give en fejl.
*/


/*
    ==========================================
    6. PROGRAMMET STARTES
    ==========================================
*/


console.log("Butikken hedder:", shopName);
console.log("Er butikken åben?", shopIsOpen);
console.log("Aktuel rabat:", currentDiscount);
console.log("Alle produkter:", products);


// Vis alle produkter, når siden indlæses
showProducts("alle");


// Vis den tomme kurv ved sidens start
updateCart();