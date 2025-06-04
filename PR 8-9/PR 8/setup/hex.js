const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
document.getElementById("btn").addEventListener("click", function() {
    let hexColor = "#";
    // Создаем 6-значный HEX-код
    for (let i = 0; i < 6; i++) {
        hexColor += hex[Math.floor(Math.random() * hex.length)];
    }
    // Меняем цвет фона
    document.body.style.backgroundColor = hexColor;
});


