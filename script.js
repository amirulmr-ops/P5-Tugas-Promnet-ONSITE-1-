const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const errorMessage = document.getElementById("errorMessage");
const list = document.getElementById("daftar");

loadData(); // muat data dari localStorage saat awal

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = input.value.trim();

  if (value === "") {
    errorMessage.textContent = "Field tidak boleh kosong";
    input.classList.add("invalid");
    return;
  }

  errorMessage.textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");

  addItem(value);
  saveData();
  input.value = "";
});

function addItem(value, done = false) {
  const li = document.createElement("li");
  li.textContent = value;
  if (done) li.classList.add("done");

  // Tandai tugas selesai
  li.addEventListener("click", function () {
    li.classList.toggle("done");
    saveData();
  });

  // Tombol hapus
  const btn = document.createElement("button");
  btn.textContent = "Hapus";
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    saveData();
  });

  li.append(btn);
  list.append(li);
}

function saveData() {
  const items = [];
  document.querySelectorAll("#daftar li").forEach(li => {
    items.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("todos", JSON.stringify(items));
}

function loadData() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    const items = JSON.parse(saved);
    items.forEach(item => addItem(item.text, item.done));
  }
}
