// Seleciona todos os links com a classe "myLink"
const links = document.querySelectorAll('.myLink');
// Seleciona o parágrafo
const paragraph = document.getElementById('myParagraph');

// Adiciona o evento mouseover a todos os links
links.forEach(link => {
    link.addEventListener('mouseover', function () {
        // Obtém o valor do atributo data-text do link e altera o texto do parágrafo
        paragraph.textContent = this.getAttribute('data-text');
    });

    // Adiciona o evento mouseout para reverter a alteração
    link.addEventListener('mouseout', function () {
        paragraph.textContent = 'Texto original do parágrafo.';
    });
});
// Seleciona todas as divs com a classe 'company'
const companyDivs = document.querySelectorAll('.company');

// Seleciona os elementos que serão alterados
const descriptionParagraph = document.getElementById('description');
const emp = document.getElementById('empn');
const jobTitle = document.getElementById('jobTitle');
const jobDates = document.getElementById('jobDates');

// Adiciona um evento de clique a cada div com a classe 'company'
companyDivs.forEach(div => {
    div.addEventListener('click', function () {
        // Remove a classe 'selected' de todas as divs
        companyDivs.forEach(div => div.classList.remove('selected'));

        // Adiciona a classe 'selected' à div clicada
        this.classList.add('selected');

        // Altera o texto e estilos com base na classe da div clicada
        if (this.classList.contains('digitaljundiai')) {
            emp.textContent = 'Digital Jundiaí';
            descriptionParagraph.textContent = 'Realizei manutenção e configuração de computadores e servidores Windows, dispositivos de rede (cabos, switches, roteadores, DVR, firewalls), e Active Directory. Ofereci suporte a usuários e instalei softwares de gestão de impressão, incluindo NDD, Papercut, SafeQ e Printwayy, além de soluções de autenticação biométrica. Também configurei softwares de gestão de documentos como HTF/Alfresco e mantive impressoras e multifuncionais, incluindo impressoras térmicas.'
            jobTitle.textContent = 'Analista de Suporte Junior';
            jobDates.textContent = 'Fev 2021 - Atualidade';

        } else if (this.classList.contains('printmac')) {
            emp.textContent = 'Printmac';
            descriptionParagraph.textContent = 'Realizei manutenção e configuração de computadores e servidores Windows, dispositivos de rede (cabos, switches, roteadores, DVR, firewalls), e Active Directory. Ofereci suporte a usuários para diversos softwares e executei a instalação de soluções de gestão de impressão e documentos, incluindo autenticação biométrica. Também fiz manutenção avançada de impressoras e possuo conhecimento em impressoras térmicas.';
            jobTitle.textContent = 'Tecnico de TI';
            jobDates.textContent = 'Set 2019 - Fev 2021';

        }
    });
});
