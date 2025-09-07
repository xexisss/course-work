const loan_calculator_button = document.getElementById('loan_calculator_button');
loan_calculator_button.addEventListener('click', () => {
    window.location.href = '../loan_calculator.html';
});

const order_button = document.getElementById('order_button');
order_button.addEventListener('click', () => {
    window.location.href = '../services.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.partners__slider');
    const slides = Array.from(slider.children);
    const prevBtn = document.querySelector('.carousel__button--left');
    const nextBtn = document.querySelector('.carousel__button--right');
    const nav = document.querySelector('.carousel__nav');

    let currentIndex = 0;
    let visibleCount = getVisibleCount();

    // Инициализация
    update();
    window.addEventListener('resize', () => {
        visibleCount = getVisibleCount();
        currentIndex = Math.min(currentIndex, slides.length - visibleCount);
        update();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - visibleCount);
        update();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(slides.length - visibleCount, currentIndex + visibleCount);
        update();
    });

    function getVisibleCount() {
        return window.innerWidth > 1024 ? 4 : 1;
    }

    function update() {
        const slideWidth = slides[0].getBoundingClientRect().width + 32;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= slides.length - visibleCount;

        renderDots();
        setActiveDot();
    }

    function renderDots() {
        nav.innerHTML = '';
        const pages = Math.ceil(slides.length / visibleCount);
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel__nav-dot';
            dot.addEventListener('click', () => {
                currentIndex = i * visibleCount;
                update();
            });
            nav.append(dot);
        }
    }

    function setActiveDot() {
        const dots = Array.from(nav.children);
        const activePage = Math.floor(currentIndex / visibleCount);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activePage);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="Закрыть">&times;</button>
        <h2>Добро пожаловать!</h2>
        <p>Рады видеть вас на нашем сайте.</p>
      </div>
    `;
    document.body.append(overlay);

    const closeBtn = overlay.querySelector('.modal-close');

    function closeModal() {
        overlay.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    setTimeout(() => {
        overlay.style.display = 'flex';
    }, 500);
});