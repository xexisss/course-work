(function () {
    const css = `
      #preloader {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #eee;
        border-top-color: #ed017f;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      #preloader.fade-out {
        opacity: 0;
        pointer-events: none;
      }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    (document.head || document.getElementsByTagName('head')[0]).appendChild(style);

    // 2. Функция для вставки HTML прелоадера
    function injectPreloader() {
        const overlay = document.createElement('div');
        overlay.id = 'preloader';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.prepend(overlay);

        // 3. Ждём полной загрузки страницы, добавляем fade-out и удаляем
        window.addEventListener('load', () => {
            overlay.classList.add('fade-out');
            overlay.addEventListener('transitionend', () => overlay.remove());
        });
    }

    // 4. Если <body> уже есть — вставляем сразу, иначе ждём DOMContentLoaded
    if (document.body) {
        injectPreloader();
    } else {
        document.addEventListener('DOMContentLoaded', injectPreloader);
    }
})();