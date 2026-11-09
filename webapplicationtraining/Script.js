
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var productsContainer = document.getElementById("productsContainer");
var searchInput = document.getElementById("searchInput");
var invalidMsg = document.getElementById("invalidAlert");
 
var productlist = [];

if (localStorage.getItem("list") != null) {
  productlist = JSON.parse(localStorage.getItem("list")); // null
  displayProduct();
}

function createProduct(){

    var errors = [];

    // Validate all inputs
    if (validateName() == false) {
        errors.push("Product Name");
    }

    if (validatePrice() == false) {
        errors.push("Product Price");
    }

    if (validateCategory() == false) {
        errors.push("Product Category");
    }

    if (validateDescription() == false) {
        errors.push("Product Description");
    }

    if (validateImage() == false) {
        errors.push("Product Image");
    }

    // Check validation errors
    if (errors.length > 0) {

        Swal.fire({
            icon: "error",
            title: "Invalid Input!",
            html: `Please correct the following fields:<br><b>${errors.join("<br>")}</b>`,
            confirmButtonText: "OK"
        });

        return;
    }

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: "images/" + productImageInput.files[0].name,
    };

    // Check if product already exists
    var isExist = productlist.some(function(item) {

        return (
            item.name === product.name &&
            item.price === product.price &&
            item.category === product.category &&
            item.description === product.description &&
            item.image === product.image
        );

    });

    // Show duplicate product message
    if (isExist) {

        Swal.fire({
            icon: "warning",
            title: "Product Already Exists!",
            text: "This product has already been added.",
            confirmButtonText: "OK"
        });

        return;
    }

    productlist.push(product);
    localStorage.setItem("list", JSON.stringify(productlist));
    sweetOk();
    displayProduct();
    clearForm(); 
    totalProducts();
  }

function clearForm(){
  productNameInput.value = ""; // OR NULL
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  invalidMsg.innerHTML = "";
  productNameInput.classList.remove("is-valid", "is-invalid");
  productPriceInput.classList.remove("is-valid", "is-invalid");
  productCategoryInput.classList.remove("is-valid", "is-invalid");
  productDescriptionInput.classList.remove("is-valid", "is-invalid");

}

function displayProduct() {
    var cartona= ""; 
    for (var i=0; i< productlist.length; i++) {
      cartona+= `
      <div class="col-md-4">

                <div class="product-card">

                    <!-- Product Image -->
                    <div class="product-image-box">

                        <img src="${productlist[i].image}"
                             alt="Product Image"
                             class="product-image">

                    </div>

                    <!-- Product Information -->
                    <div class="product-card-body">

                        <div class="product-info">

                            <span class="product-category">
                                <i class="bi bi-tag-fill"></i>
                                ${productlist[i].category}
                            </span>

                            <span class="product-price">
                                ${productlist[i].price}
                            </span>

                        </div>

                        <h5 class="product-name">
                            ${productlist[i].name}
                        </h5>

                        <p class="product-description">
                            ${productlist[i].description}
                        </p>

                        <!-- Product Actions -->
                        <div class="product-actions">

                            <button onclick="updateOne(${i})" class="btn edit-btn">
                                <i class="bi bi-pencil-square"></i>
                                Edit
                            </button>

                            <button onclick="deleteProduct(${i})" class="btn delete-btn">
                                <i class="bi bi-trash"></i>
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>
      `;

    };
productsContainer.innerHTML = cartona;

}

function deleteProduct(index) {

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
      productList.splice(index, 1);
      displayProduct();
      checkEmpty();
      totalProducts();
      localStorage.setItem("list", JSON.stringify(productList));
  }
});

}

var updateIndex;
function updateOne(index) {
  updateIndex = index;
  productNameInput.value = productlist[index].name;
  productPriceInput.value = productlist[index].price;
  productCategoryInput.value = productlist[index].category;
  productDescriptionInput.value = productlist[index].description;
}

function updateTwo() {

  if (
    productlist[updateIndex].name === productNameInput.value &&
    productlist[updateIndex].price === productPriceInput.value &&
    productlist[updateIndex].category === productCategoryInput.value &&
    productlist[updateIndex].description === productDescriptionInput.value
  ) {
    alert("No changes detected! Please update at least one field.");
  }
  else {
    productlist[updateIndex].name = productNameInput.value;
    productlist[updateIndex].price = productPriceInput.value;
    productlist[updateIndex].category = productCategoryInput.value;
    productlist[updateIndex].description = productDescriptionInput.value;

    clearForm();
    displayProduct();
  }
}

function totalProducts(){
    var totalProductsCount= document.getElementById("totalProductsCount");
    totalProductsCount.innerHTML= productlist.length;
}

function searchByName() {
  var searchWord = searchInput.value.trim().toLowerCase();
  var cartona = "";
  for (var i = 0; i < productlist.length; i++) {
    if (productlist[i].name.toLowerCase().includes(searchWord) == true) {
      cartona += ` 
             <div class="col-md-4">

                <div class="product-card">

                    <!-- Product Image -->
                    <div class="product-image-box">

                        <img src="${productlist[i].image}"
                             alt="Product Image"
                             class="product-image">

                    </div>

                    <!-- Product Information -->
                    <div class="product-card-body">

                        <div class="product-info">

                            <span class="product-category">
                                <i class="bi bi-tag-fill"></i>
                                ${productlist[i].category}
                            </span>

                            <span class="product-price">
                                ${productlist[i].price}
                            </span>

                        </div>

                        <h5 class="product-name">
                            ${productlist[i].name}
                        </h5>

                        <p class="product-description">
                            ${productlist[i].description}
                        </p>

                        <!-- Product Actions -->
                        <div class="product-actions">

                            <button onclick="updateOne(${i})" class="btn edit-btn">
                                <i class="bi bi-pencil-square"></i>
                                Edit
                            </button>

                            <button onclick="deleteProduct(${i})" class="btn delete-btn">
                                <i class="bi bi-trash"></i>
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>
      `;
    }
  }

  productsContainer.innerHTML = cartona;
}

checkEmpty();

function checkEmpty() {
  // condition ==>
  if (productlist.length === 0) {
    productsContainer.innerHTML = `
          <div class="empty-state text-center text-muted py-5">
        <i class="bi bi-inbox display-3" style="color: var(--eloop-red)"></i>
        <p class="mt-3 mb-0">No products yet. Add your first eLoop product above.</p>
      </div>
    `;
  }
}

function validateName() {
  var productNameRegex = /^[A-Z][\w]{4,}$/;
  if (productNameRegex.test(productNameInput.value)) {
    console.log("valid");
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    invalidMsg.innerHTML = `<p class="mb-0 alert alert-success p-1 mt-3">input valid </p>`;
    return true;
  } else {
    console.log("invalid");
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    invalidMsg.innerHTML = `<p class="mb-0 alert alert-danger p-1 mt-3">the first letter of product name must be capital </p>`;
    return false;
  }
}

function validatePrice() {
  var productPriceRegex = /^[1-9][\d]{2,}$/;
  if (productPriceRegex.test(productPriceInput.value) == true) {
    console.log("valid");
    //is-valid
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    return true;
  } else {
    console.log("invalid");
    //is-invalid
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    return false;
  }
}

function validateCategory() {
  var productCategoryRegex = /^(tv|mobile|laptop)$/i;
  if (productCategoryRegex.test(productCategoryInput.value) == true) {
    console.log("valid");
    //is-valid
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    return true;
  } else {
    console.log("invalid");
    //is-invalid
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    return false;
  }
}


function validateDescription() {
  var productDescriptionRegex = /^.{4,}$/i;
  if (productDescriptionRegex.test(productDescriptionInput.value) == true) {
    console.log("valid");
    //is-valid
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    return true;
  } else {
    console.log("invalid");
    //is-invalid
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    return false;
  }
}

function validateImage() {

    if (
        productImageInput.files.length > 0 &&
        ["image/png", "image/jpeg"].includes(productImageInput.files[0].type)
    ) {
        console.log("valid");
        productImageInput.classList.add("is-valid");
        productImageInput.classList.remove("is-invalid");
        return true;
    }
    else {
        console.log("invalid");
        productImageInput.classList.add("is-invalid");
        productImageInput.classList.remove("is-valid");
        return false;
    }
}

function sweetOk() {
  Swal.fire({
    title: "the Product is added",
    icon: "success",
    timerProgressBar: true,
    timer: 2000,
    draggable: false,
  });
}