export function LoadingComponent(title = "Loading") {
  return `
    <div class="loading-container">
                <p>${title}...</p>
                <div class="loading-spinner"></div>
              </div>
    `;
}

export function ErrorComponent(title = "Error") {
  return `
    <div class="error-container">
      <p class="error">${title}</p>
      <p>Something went wrong. Please try again.</p>
    </div>
  `;
}
