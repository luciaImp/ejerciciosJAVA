document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".product-check");
    const quantities = document.querySelectorAll(".product-quantity");

    function updateCart() {
        let subtotal = 0;

        checkboxes.forEach((checkbox, index) => {
            const quantity = quantities[index].value;
            const price = parseFloat(checkbox.dataset.price);
            const totalElement = document.querySelector(`#${checkbox.value}-total`);

            if (checkbox.checked) {
                let productTotal = price * quantity;
                totalElement.textContent = `€${productTotal.toFixed(2)}`;
                subtotal += productTotal;
            } else {
                totalElement.textContent = "€0";
            }
        });

        document.getElementById("sub-total").textContent = `€${subtotal.toFixed(2)}`;
        
        let shipping = subtotal >= 100 ? 0 : 10;
        document.getElementById("shipping").textContent = `€${shipping.toFixed(2)}`;
        
        let taxes = subtotal * 0.2;
        document.getElementById("taxes").textContent = `€${taxes.toFixed(2)}`;
        
        let total = subtotal + shipping + taxes;
        document.getElementById("total").textContent = `€${total.toFixed(2)}`;
    }

    checkboxes.forEach(checkbox => checkbox.addEventListener("change", updateCart));
    quantities.forEach(quantity => quantity.addEventListener("input", updateCart));
});
