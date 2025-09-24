    document.addEventListener("DOMContentLoaded", function () {
      
      // Update copyright year automatically
      document.getElementById('copyright-year').textContent = new Date().getFullYear();

      // Back to top button logic
      const backToTopButton = document.querySelector(".back-to-top");
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) { 
          backToTopButton.style.display = "block";
        } else {
          backToTopButton.style.display = "none";
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
    });
