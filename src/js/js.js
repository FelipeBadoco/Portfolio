document.addEventListener('DOMContentLoaded', function () {
      const experiences = {
        digitaljundiai: {
          title: "Suporte N2",
          dates: "2022 - Atualmente",
          company: "DJ Locação",
          description: "Realizei manutenção e configuração de computadores e servidores Windows, dispositivos de rede (cabos, switches, roteadores, DVR, firewalls), e Active Directory. Ofereci suporte a usuários e instalei softwares de gestão de impressão, incluindo NDD, Papercut, SafeQ e Printwayy, além de soluções de autenticação biométrica. Também configurei softwares de gestão de documentos como HTF/Alfresco e mantive impressoras e multifuncionais, incluindo impressoras térmicas."
        },
        printmac: {
          title: "Tecnico de TI",
          dates: "2021 - 2022",
          company: "Printmac",
          description: "Realizei manutenção e configuração de computadores e servidores Windows, dispositivos de rede (cabos, switches, roteadores, DVR, firewalls), e Active Directory. Ofereci suporte a usuários para diversos softwares e executei a instalação de soluções de gestão de impressão e documentos, incluindo autenticação biométrica. Também fiz manutenção avançada de impressoras e possuo conhecimento em impressoras térmicas."
        }
      };

      const jobTitleEl = document.getElementById('jobTitle');
      const jobDatesEl = document.getElementById('jobDates');
      const companyNameEl = document.getElementById('empn');
      const descriptionEl = document.getElementById('description');
      const clickableItems = document.querySelectorAll('.clickable');

      function updateExperience(companyKey) {
        const experience = experiences[companyKey];
        jobTitleEl.textContent = experience.title;
        jobDatesEl.textContent = experience.dates;
        companyNameEl.textContent = experience.company;
        descriptionEl.textContent = experience.description;
      }

      clickableItems.forEach(item => {
        item.addEventListener('click', function () {
          clickableItems.forEach(i => i.classList.remove('selected'));
          this.classList.add('selected');
          const companyKey = this.getAttribute('data-company');
          updateExperience(companyKey);
        });
      });

      // Inicializa com a primeira experiência
      updateExperience('digitaljundiai');

      // Efeito de hover para 'Conhecimentos'
      const links = document.querySelectorAll('.myLink');
      const paragraph = document.getElementById('myParagraph');
      const originalText = paragraph.textContent;

      links.forEach(link => {
        link.addEventListener('mouseover', function () {
          paragraph.textContent = this.getAttribute('data-text');
        });
        link.addEventListener('mouseout', function () {
          paragraph.textContent = originalText;
        });
      });
    });
