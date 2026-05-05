    document.addEventListener("DOMContentLoaded", function () {
      
      // Update copyright year automatically
      document.getElementById('copyright-year').textContent = new Date().getFullYear();

      // Back to top button logic
      const backToTopButton = document.querySelector(".back-to-top");
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) { 
          backToTopButton.classList.add("show");
        } else {
          backToTopButton.classList.remove("show");
        }
      });

      // Active nav link on scroll (Scrollspy)
      const sections = document.querySelectorAll("main section[id]");
      const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
      const homeLink = document.querySelector('.navbar-nav .nav-link[href="#"]');

      function updateActiveNav() {
        let currentSectionId = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (window.pageYOffset >= sectionTop - 150) {
            currentSectionId = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          const linkHref = link.getAttribute("href");
          if (linkHref.includes(currentSectionId) && currentSectionId) {
            link.classList.add("active");
          }
        });
        
        // If at top, make "Quem Sou" active
        if (window.pageYOffset < sections[0].offsetTop - 150) {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('.navbar-nav .nav-link[href="#quemsou"]').classList.add('active');
        }
      }

      window.addEventListener("scroll", updateActiveNav);
      updateActiveNav();

      // Navbar scroll effect
      const navbar = document.querySelector(".navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Theme toggle logic
      const themeToggle = document.getElementById("theme-toggle");
      const themeIcon = themeToggle.querySelector("i");
      const body = document.body;

      // Check for saved theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        body.classList.add("light-theme");
        themeIcon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
      }

      themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        
        if (body.classList.contains("light-theme")) {
          localStorage.setItem("theme", "light");
          themeIcon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
        } else {
          localStorage.setItem("theme", "dark");
          themeIcon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
        }
      });
    });

    // Global slide function for carousels
    function slide(containerId, direction) {
      const container = document.getElementById(containerId);
      const scrollAmount = container.offsetWidth * 0.8; // Slide 80% of the view width
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
