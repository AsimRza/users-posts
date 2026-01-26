// DOM Elements
const elements = {
  editModal: document.getElementById("edit-modal"),
  editFields: document.getElementById("edit-fields"),
  modalTitle: document.getElementById("modal-title"),
  closeModal: document.querySelector(".close"),
  cancelEdit: document.getElementById("cancel-edit"),
  userList: document.querySelector("#users-list"),
  postList: document.querySelector("#posts-list"),
  addUserForm: document.querySelector("#add-user-form"),
  userSubmitBtn: document.querySelector("#user-submit-btn"),
};

// Global variables
let currentEditItem = null;
let currentEditType = null;

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  // Modal
  if (elements.closeModal) {
    elements.closeModal.addEventListener("click", closeModal);
  }
  if (elements.cancelEdit) {
    elements.cancelEdit.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === elements.editModal) {
      closeModal();
    }
  });
}

// Edit Modal Functions
function openEditModal(type, item) {
  if (!elements.editModal || !elements.editFields || !elements.modalTitle) {
    console.error("Modal elements not found");
    return;
  }

  currentEditItem = item;
  currentEditType = type;

  elements.modalTitle.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  if (type === "user") {
    elements.editFields.innerHTML = `
      <input type="text" id="edit-name" value="${item.name || ""}" placeholder="Name" required>
      <input type="email" id="edit-email" value="${item.email || ""}" placeholder="Email" required>
      <input type="number" id="edit-age" value="${item.age || ""}" placeholder="Age">
    `;
  } else if (type === "post") {
    elements.editFields.innerHTML = `
      <input type="text" id="edit-title" value="${item.title || ""}" placeholder="Title" required>
      <textarea id="edit-content" placeholder="Content" required>${item.content || ""}</textarea>
      <input type="number" id="edit-userId" value="${item.userId || ""}" placeholder="User ID">
    `;
  }

  elements.editModal.style.display = "block";
}

function closeModal() {
  if (elements.editModal) {
    elements.editModal.style.display = "none";
  }
  currentEditItem = null;
  currentEditType = null;
}

// Example usage functions
function openUserEditModal() {
  const sampleUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
  };
  openEditModal("user", sampleUser);
}

function openPostEditModal() {
  const samplePost = {
    id: 1,
    title: "Sample Post",
    content: "This is a sample post content",
    userId: 1,
  };
  openEditModal("post", samplePost);
}

/*---------------------*/

function LoadingComponent(title = "Loading") {
  return `
    <div class="loading-container">
                <p>${title}...</p>
                <div class="loading-spinner"></div>
              </div>
    `;
}

function ErrorComponent(title = "Error") {
  return `
    <div class="error-container">
      <p class="error">${title}</p>
      <p>Something went wrong. Please try again.</p>
    </div>
  `;
}

async function fetchUsers() {
  let response = await fetch("http://localhost:3000/api/users");
  let users = await response.json();
  return users;
}

function showUsers() {
  elements.userList.innerHTML = LoadingComponent("Loading users");
  fetchUsers()
    .then((users) => {
      elements.userList.innerHTML = "";
      users.forEach((user) => {
        elements.userList.innerHTML += `
                      <div class="user-card">
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>ID:</strong> ${user.id}</p>
                <div class="card-actions">
                  <button class="edit" onclick="openUserEditModal()">
                    Edit
                  </button>
                  <button class="danger">Delete</button>
                </div>
              </div>
        `;
      });
    })
    .catch(() => {
      elements.userList.innerHTML = ErrorComponent(
        "Error occured fetch users ",
      );
    });
}

async function fetchPost() {
  let response = await fetch("http://localhost:3000/api/posts");
  let posts = await response.json();
  return posts;
}

function showPost() {
  let postListElement = elements.postList;
  postListElement.innerHTML = LoadingComponent("Loading posts");
  fetchPost()
    .then((posts) => {
      postListElement.innerHTML = "";
      posts.forEach((post) => {
        postListElement.innerHTML += `
                          <div class="post-card">
                <h4>    ${post.title}</h4>
                <p>
            ${post.content}
                </p>
                <p><strong>User ID:</strong>   ${post.userId}</p>
                <p><strong>Post ID:</strong> ${post.id}</p>
                <div class="card-actions">
                  <button class="edit" onclick="openPostEditModal()">
                    Edit
                  </button>
                  <button class="danger">Delete</button>
                </div>
              </div>
        `;
      });
    })
    .catch(() => {
      postListElement.innerHTML = ErrorComponent("Error occured fetch posts");
    });
}

function createUser(user) {
  return fetch("http://localhost:3000/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function submitUserForm(e) {
  e.preventDefault();
  let name = e.target.elements["user-name"].value;
  let email = e.target.elements["user-email"].value;
  let age = e.target.elements["user-age"].value;
  let newUser = {
    name,
    email,
    age,
  };
  elements.userSubmitBtn.classList.add("loading");
  createUser(newUser)
    .then(() => {
      showUsers();
    })
    .catch(() => alert("Xeta bash verdi"))
    .finally(() => {
      elements.userSubmitBtn.classList.remove("loading");
    });
}

elements.addUserForm.addEventListener("submit", submitUserForm);

document.addEventListener("DOMContentLoaded", function () {
  showUsers();
  showPost();
});
