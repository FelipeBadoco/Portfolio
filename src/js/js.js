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
      // Função de autoplay para carrosséis
      function initAutoPlay(containerId, intervalTime = 4000) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let intervalId = null;
        let isHovered = false;

        function scrollNext() {
          const scrollAmount = container.offsetWidth * 0.8;
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }

        function start() {
          if (intervalId) clearInterval(intervalId);
          intervalId = setInterval(() => {
            if (!isHovered) {
              scrollNext();
            }
          }, intervalTime);
        }

        function reset() {
          start();
        }

        container.addEventListener("mouseenter", () => {
          isHovered = true;
        });

        container.addEventListener("mouseleave", () => {
          isHovered = false;
        });

        container.addEventListener("touchstart", () => {
          isHovered = true;
        }, { passive: true });

        container.addEventListener("touchend", () => {
          setTimeout(() => {
            isHovered = false;
          }, 2000);
        }, { passive: true });

        start();

        // Salva o controller no registro global
        autoPlayIntervals[containerId] = { reset };
      }

      // Inicializa autoplay para os slides (tempo aumentado para maior conforto na leitura)
      initAutoPlay("projetos-slider", 8000);
      initAutoPlay("certificados-slider", 10000);

      // Lógica de Zoom / Lightbox para as Imagens com Navegação Contextual
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxCaption = document.getElementById("lightbox-caption");
      const closeBtn = document.querySelector(".lightbox-close");
      const prevBtn = document.getElementById("lightbox-prev-btn");
      const nextBtn = document.getElementById("lightbox-next-btn");

      // Seleciona todas as imagens que podem ser ampliadas
      const allZoomableImages = document.querySelectorAll(".card img, .slider-item img");
      let activeGroupImages = [];
      let currentImgIndex = 0;

      function updateLightboxImage() {
        const img = activeGroupImages[currentImgIndex];
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || "Visualização ampliada";

        // Oculta as setas se o grupo tiver apenas 1 imagem
        if (activeGroupImages.length <= 1) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }
      }

      allZoomableImages.forEach(img => {
        img.addEventListener("click", () => {
          // Determina o contêiner do grupo correspondente à imagem clicada
          let parentContainer = img.closest(".carousel"); // Carrossel interno de um projeto
          if (!parentContainer) {
            parentContainer = img.closest("#certificados-slider"); // Slider de certificados
          }
          if (!parentContainer) {
            parentContainer = img.closest(".card"); // Apenas o card individual do projeto
          }

          // Filtra o grupo de imagens pertencentes a esse contêiner
          activeGroupImages = Array.from(parentContainer.querySelectorAll("img"));
          currentImgIndex = activeGroupImages.indexOf(img);

          lightbox.classList.add("show");
          updateLightboxImage();
          document.body.style.overflow = "hidden"; // Desativa rolagem ao abrir o lightbox
        });
      });

      function showNextImage() {
        if (activeGroupImages.length <= 1) return;
        currentImgIndex = (currentImgIndex + 1) % activeGroupImages.length;
        updateLightboxImage();
      }

      function showPrevImage() {
        if (activeGroupImages.length <= 1) return;
        currentImgIndex = (currentImgIndex - 1 + activeGroupImages.length) % activeGroupImages.length;
        updateLightboxImage();
      }

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Impede o fechar do lightbox ao clicar no botão
        showNextImage();
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Impede o fechar do lightbox ao clicar no botão
        showPrevImage();
      });

      function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.style.overflow = ""; // Restaura a rolagem do corpo da página
      }

      // Fecha ao clicar no botão de fechar (X)
      closeBtn.addEventListener("click", closeLightbox);

      // Fecha ao clicar fora da imagem (na área desfocada)
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
          closeLightbox();
        }
      });

      // Fecha ao apertar a tecla ESC no teclado e navega pelas setas direcionais esquerda e direita
      document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("show")) {
          if (e.key === "Escape") {
            closeLightbox();
          } else if (e.key === "ArrowRight") {
            showNextImage();
          } else if (e.key === "ArrowLeft") {
            showPrevImage();
          }
        }
      });
    });

    // Registro global de autoplays para carrosséis
    const autoPlayIntervals = {};

    // Global slide function for carousels
    function slide(containerId, direction) {
      const container = document.getElementById(containerId);
      const scrollAmount = container.offsetWidth * 0.8; // Slide 80% of the view width
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });

      // Reinicia o tempo do autoplay ao interagir manualmente
      if (autoPlayIntervals[containerId]) {
        autoPlayIntervals[containerId].reset();
      }
    }
