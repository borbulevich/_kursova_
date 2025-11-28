document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        if (content && icon) {
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '-';
            } else {
                content.style.maxHeight = '0';
                icon.textContent = '+';
            }

            header.addEventListener('click', () => {
                const isActive = item.classList.toggle('active');

                if (isActive) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.textContent = '-';
                } else {
                    content.style.maxHeight = '0';
                    icon.textContent = '+';
                }
            });
        }
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
                observer.unobserve(entry.target); 
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const mainHeader = document.getElementById("mainHeader");

    const scrollThresholdTopButton = 300;
    const scrollThresholdHeader = 50;

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function toggleScrollToTopButton() {
        if (document.body.scrollTop > scrollThresholdTopButton || document.documentElement.scrollTop > scrollThresholdTopButton) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    function toggleStickyHeader() {
        if (document.documentElement.scrollTop > scrollThresholdHeader) {
            mainHeader.classList.add("sticky-scrolled");
        } else {
            mainHeader.classList.remove("sticky-scrolled");
        }
    }

    function handleScrollEvents() {
        toggleScrollToTopButton();
        toggleStickyHeader();
    }

    if (scrollToTopBtn && mainHeader) {
        window.addEventListener("scroll", handleScrollEvents);
        scrollToTopBtn.addEventListener("click", scrollToTop);
        handleScrollEvents();
    }

    const modal = document.getElementById("subscriptionModal");
    const btn = document.getElementById("subscribeLink");
    const span = document.getElementsByClassName("close-button")[0];

    if (modal && btn && span) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "flex";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});