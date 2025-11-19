        // Mobile Menu Toggle
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('show');
        });

        // Smooth Scroll
        // document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // FAQ Accordion
        document.querySelectorAll('.faq-btn').forEach(button => {
            button.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('svg');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-content').forEach(item => {
                    if (item !== content) {
                        item.style.maxHeight = '0';
                    }
                });
                
                document.querySelectorAll('.faq-btn svg').forEach(svg => {
                    if (svg !== icon) {
                        svg.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current FAQ
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        // Booking Form Handler
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const jemput = document.getElementById('jemput').value;
            const tujuan = document.getElementById('tujuan').value;
            const tanggal = document.getElementById('tanggal').value;
            const penumpang = document.getElementById('penumpang').value;
            const catatan = document.getElementById('catatan').value;
            
            // Format tanggal ke format yang lebih readable
            const tanggalObj = new Date(tanggal);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const tanggalFormatted = tanggalObj.toLocaleDateString('id-ID', options);
            
            // Create WhatsApp message
            let message = `*BOOKING TRAVEL KEREN*\n\n`;
            message += `Nama: ${nama}\n`;
            message += `No. WhatsApp: ${whatsapp}\n`;
            message += `Lokasi Jemput: ${jemput}\n`;
            message += `Tujuan: ${tujuan}\n`;
            message += `Tanggal: ${tanggalFormatted}\n`;
            message += `Jumlah Penumpang: ${penumpang} orang\n`;
            
            if (catatan) {
                message += `Catatan: ${catatan}\n`;
            }
            
            message += `\nTerima kasih! 🚐`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/6282372404544?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });

        // Navbar Background on Scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('nav');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 26, 68, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });

        // Set minimum date for booking to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tanggal').setAttribute('min', today);

        // Add loading animation to buttons
        document.querySelectorAll('button[type="submit"], a[href*="wa.me"]').forEach(button => {
            button.addEventListener('click', function() {
                // Optional: Add loading state
                const originalText = this.innerHTML;
                if (this.tagName === 'BUTTON') {
                    this.innerHTML = '<span class="loading"></span> Mengirim...';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }
            });
        });

// Intersection Observer untuk animasi fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe semua elemen dengan class fade-in
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));