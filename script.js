window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
            showNotification('Chào mừng đến với Huế Heritage!');
            showWeatherWidget();
        }, 500);
    }, 1500);
});

// Mobile Menu and Nav Links
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            window.location.href = targetId;
        }
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Gallery Modal
function openModal(title, desc) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.style.display = 'flex';
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('scale-in');
    setTimeout(() => {
        modalContent.classList.remove('scale-in');
    }, 800);
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('scale-in');
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.classList.remove('scale-in');
    }, 300);
}

document.getElementById('galleryModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('galleryModal')) {
        closeModal();
    }
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.9) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    const rect = counter.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) {
        updateCount();
    }
});

window.addEventListener('scroll', () => {
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9 && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        }
    });
});

// Form Submission
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    if (name && email && message) {
        showNotification('Tin nhắn của bạn đã được gửi thành công!');
        document.getElementById('contactForm').reset();
    } else {
        showNotification('Vui lòng điền đầy đủ thông tin!');
    }
});

// Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Weather Widget
function showWeatherWidget() {
    const widget = document.getElementById('weatherWidget');
    widget.classList.add('show');

    const apiKey = '489672c442e848ff2ec5e3cd183b62da';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hue,VN&appid=${apiKey}&units=metric&lang=vi`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể lấy dữ liệu thời tiết');
            }
            return response.json();
        })
        .then(data => {
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById('weatherTemp').textContent = `${temp}°C`;
            document.getElementById('weatherDesc').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
            document.getElementById('weatherIcon').src = iconUrl;
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
            document.getElementById('weatherTemp').textContent = '--°C';
            document.getElementById('weatherDesc').textContent = 'Không thể tải dữ liệu';
        });
}

// Video Placeholder Click
function playVideo() {
    showNotification('Video đang tải...');
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const speed = 0.2;
        const yPos = -(window.scrollY * speed);
        section.style.backgroundPositionY = `${yPos}px`;
    });
});

// Language Switcher


function switchLanguage(lang) {
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = Object.keys(translations[lang]);
        link.textContent = translations[lang][keys[index + 1]];
    });
    showNotification(translations[lang].welcome);
}

// Initialize language
switchLanguage('vi');
// Hàm mở modal
function openRecipeModal(title, description, price, image) {
    document.getElementById('recipeTitle').textContent = title;
    document.getElementById('recipeDesc').textContent = description;
    document.getElementById('recipePrice').textContent = price;
    document.getElementById('modalImage').src = image;
    document.getElementById('recipeModal').style.display = 'flex';
  }
  
  // Hàm đóng modal
  function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
  }
  
  // Đóng modal khi click ra ngoài
  window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  function openDetailModal(title, description) {
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailDesc').textContent = description;
    document.getElementById('detailModal').style.display = 'flex';
}

function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}
