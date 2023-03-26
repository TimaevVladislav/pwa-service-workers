
window.addEventListener("load", async () => {

    if ('serviceWorker' in navigator) {
       try {
           const register = await navigator.serviceWorker.register("/sw.config.js")
           console.log("Service worker register success", register)
       } catch (e) {
           console.log("Service worker register fail")
       }
    }

    await loadPosts()
})

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