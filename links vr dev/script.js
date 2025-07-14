document.addEventListener("DOMContentLoaded", () => {
  // Create floating particles
  createFloatingParticles()

  // Add hover effects to links
  addLinkHoverEffects()

  // Add loading animation
  addLoadingAnimation()
})

function createFloatingParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 5 + "s"
    particle.style.animationDuration = 3 + Math.random() * 4 + "s"

    particlesContainer.appendChild(particle)
  }
}

function addLinkHoverEffects() {
  const linkItems = document.querySelectorAll(".link-item")

  linkItems.forEach((link, index) => {
    link.addEventListener("mouseenter", function () {
      this.classList.add("glowing")
    })

    link.addEventListener("mouseleave", function () {
      this.classList.remove("glowing")
    })

    // Add click animation
    link.addEventListener("click", function (e) {
      const ripple = document.createElement("div")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(59, 130, 246, 0.3)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.left = e.clientX - this.offsetLeft + "px"
      ripple.style.top = e.clientY - this.offsetTop + "px"
      ripple.style.width = ripple.style.height = "20px"
      ripple.style.marginLeft = ripple.style.marginTop = "-10px"
      ripple.style.pointerEvents = "none"

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

function addLoadingAnimation() {
  const content = document.querySelector(".content")
  content.style.opacity = "0"
  content.style.transform = "translateY(30px)"

  setTimeout(() => {
    content.style.transition = "all 1s ease-out"
    content.style.opacity = "1"
    content.style.transform = "translateY(0)"
  }, 100)
}

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth"

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeIn 0.8s ease-out forwards"
    }
  })
}, observerOptions)

// Observe all link items
document.querySelectorAll(".link-item").forEach((item) => {
  observer.observe(item)
})
