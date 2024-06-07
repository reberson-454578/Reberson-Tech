document.addEventListener('DOMContentLoaded', () => {
    // Menu de navegação responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Validação de formulário e mensagem de sucesso/erro
    const form = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                showMessage('Todos os campos são obrigatórios!', 'red');
            } else {
                fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        _replyto: email,
                        message: message,
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    showMessage('Mensagem enviada com sucesso!', 'green');
                    form.reset();
                })
                .catch(error => {
                    showMessage('Erro ao enviar a mensagem. Tente novamente mais tarde.', 'red');
                });
            }
        });
    }

    function showMessage(text, color) {
        messageBox.style.display = 'block';
        messageBox.style.color = color;
        messageBox.innerText = text;
    }

    // Paginação de posts (se houver)
    const postsPerPage = 6;
    const posts = document.querySelectorAll('.post-card');
    const paginationLinks = document.querySelectorAll('.pagination a.page-num');
    const prevLink = document.querySelector('.pagination a.prev');
    const nextLink = document.querySelector('.pagination a.next');
    let currentPage = 1;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    function showPage(page) {
        posts.forEach((post, index) => {
            post.style.display = 'none';
            if (index >= (page - 1) * postsPerPage && index < page * postsPerPage) {
                post.style.display = 'block';
            }
        });

        paginationLinks.forEach(link => link.classList.remove('active'));
        if (paginationLinks[page - 1]) {
            paginationLinks[page - 1].classList.add('active');
        }
    }

    if (paginationLinks.length > 0) {
        paginationLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = index + 1;
                showPage(currentPage);
            });
        });

        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });

        showPage(currentPage);
    }

    // Filtro de posts
    const filter = document.getElementById('category-filter');
    const postCards = document.querySelectorAll('.post-card');

    if (filter) {
        filter.addEventListener('change', function() {
            const category = this.value;
            postCards.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Busca de posts
    const searchBar = document.getElementById('search-bar');

    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            postCards.forEach(post => {
                const title = post.dataset.title.toLowerCase();
                if (title.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Scroll suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');

    if (links.length > 0) {
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('open');
        if (navList.classList.contains('open')) {
            menuToggle.innerHTML = '&#10005;'; // X icon
        } else {
            menuToggle.innerHTML = '&#9776;'; // Hamburger icon
        }
    });
});
