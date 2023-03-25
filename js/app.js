
window.addEventListener("load", async () => await loadPosts())

async function loadPosts() {
     const container = document.querySelector("#posts")

     const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
     const posts = await response.json()

     container.innerHTML = posts.map(toCard).join('\n')
}

function toCard(post) {
     return `
    <div class="card">
      <div class="card-title">
        ${post.title}
      </div>
      <div class="card-body">
        ${post.body}
      </div>
    </div>
  `
}