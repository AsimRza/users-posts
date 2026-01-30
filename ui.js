export const elements = {
  editModal: document.getElementById("edit-modal"),
  editForm: document.getElementById("edit-modal").querySelector("form"),
  editFields: document.getElementById("edit-fields"),
  modalTitle: document.getElementById("modal-title"),
  closeModal: document.querySelector(".close"),
  cancelEdit: document.getElementById("cancel-edit"),
  userList: document.querySelector("#users-list"),
  postList: document.querySelector("#posts-list"),
  addUserForm: document.querySelector("#add-user-form"),
  userSubmitBtn: document.querySelector("#user-submit-btn"),
};

export function setupEventListeners() {
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

export function closeModal(callback) {
  if (elements.editModal) {
    elements.editModal.style.display = "none";
  }
  callback();
}
