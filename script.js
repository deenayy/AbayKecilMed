function showDetail(obatId) {
    let detailContainer = document.getElementById("detail-container");
    detailContainer.style.display = "flex";
    detailContainer.style.position = "fixed"; // Fullscreen
    detailContainer.style.top = "0";
    detailContainer.style.left = "0";
    detailContainer.style.width = "100%";
    detailContainer.style.height = "100vh"; // Full tinggi layar
    detailContainer.style.backgroundColor = "rgba(10, 0, 43, 0.95)"; // Transparan sedikit untuk efek elegan
    detailContainer.style.zIndex = "1000"; // Biar di atas
    detailContainer.style.justifyContent = "center";
    detailContainer.style.alignItems = "center";
    detailContainer.style.transition = "opacity 0.3s ease"; // Animasi masuk
    detailContainer.style.opacity = "0";

    // Sembunyikan semua detail dulu
    document.querySelectorAll(".detail").forEach(detail => {
        detail.style.display = "none";
    });

    // Tampilkan detail yang sesuai
    let detailEl = document.getElementById(obatId);
    detailEl.style.display = "block";

    setTimeout(() => {
        detailContainer.style.opacity = "1"; // Transisi masuk
    }, 10); // Beri jeda kecil untuk efek animasi

    // Tambahkan tombol kembali dalam teks jika belum ada
    if (!detailEl.querySelector(".back-link")) {
        let backLink = document.createElement("a");
        backLink.innerText = "← Kembali";
        backLink.classList.add("back-link");
        backLink.style.cursor = "pointer";
        backLink.style.display = "block";
        backLink.style.marginTop = "20px";
        backLink.onclick = hideDetail;
        detailEl.appendChild(backLink);
    }
}

function hideDetail() {
    let detailContainer = document.getElementById("detail-container");
    detailContainer.style.opacity = "0"; // Efek animasi keluar
    setTimeout(() => {
        detailContainer.style.display = "none"; // Sembunyikan setelah animasi selesai
    }, 300);
}



document.addEventListener("DOMContentLoaded", function () {
    const astronautImages = ["astronot1.png", "astronot2.png", "astronot3.png", "astronot4.png"];
    const numAstronauts = 12; // Total 8 (4 jatuh, 4 blink)
    const minDistance = 100; // Jarak minimal antar-astronot
    let astronautPositions = [];

    for (let i = 0; i < numAstronauts; i++) {
        let img = document.createElement("img");
        img.src = astronautImages[i % astronautImages.length];
        img.classList.add("astronot");
        img.style.opacity = "1"; // Tidak transparan

        document.body.appendChild(img);
        positionAstronaut(img, i);
    }

    function positionAstronaut(astronaut, index) {
        let x, y, attempts = 0;
        do {
            x = Math.random() * (window.innerWidth - 80);
            y = Math.random() * (window.innerHeight - 80);
            attempts++;
        } while (isOverlapping(x, y) && attempts < 50);

        astronaut.style.left = `${x}px`;
        astronaut.style.top = `${y}px`;
        astronautPositions.push({ x, y });

        if (index < 4) {
            moveFall(astronaut); // Astronot 1-4 jatuh
        } else {
            moveBlink(astronaut); // Astronot 5-8 teleportasi
        }
    }

    function moveBlink(astronaut) {
        setInterval(() => {
            let newX, newY, moveAttempts = 0;
            let maxHeight = document.body.scrollHeight; // Tinggi halaman penuh
    
            do {
                newX = Math.random() * (window.innerWidth * 0.9); // Hindari terlalu ke tepi
                newY = Math.random() * (maxHeight - 80); // Bisa muncul di bagian bawah juga
                moveAttempts++;
            } while (isOverlapping(newX, newY) && moveAttempts < 50);
    
            astronaut.style.left = `${newX}px`;
            astronaut.style.top = `${newY}px`;
        }, 4000 + Math.random() * 2000);
    }
    

    function moveFall(astronaut) {
        let startX = Math.random() * window.innerWidth * 0.9; // Hindari jatuh terlalu kanan/kiri
        astronaut.style.left = `${startX}px`;
        astronaut.style.top = `-100px`; // Mulai dari atas layar
    
        function fall() {
            let speed = 0.5 + Math.random() * 1.5; // Kecepatan jatuh
            let posY = -100;
            let maxHeight = document.body.scrollHeight; // Ambil tinggi halaman penuh
    
            function animate() {
                posY += speed;
                astronaut.style.top = `${posY}px`;
    
                if (posY < maxHeight) {
                    requestAnimationFrame(animate);
                } else {
                    // Reset ke atas layar setelah jatuh
                    startX = Math.random() * window.innerWidth * 0.9;
                    astronaut.style.left = `${startX}px`;
                    astronaut.style.top = `-100px`;
                    posY = -100;
                    animate();
                }
            }
            animate();
        }
        fall();
    }
    

    function isOverlapping(x, y) {
        return astronautPositions.some(pos => {
            let dx = pos.x - x;
            let dy = pos.y - y;
            return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });
    }

    function updatePageHeight() {
        document.body.style.height = "auto"; // Reset tinggi
        requestAnimationFrame(() => {
            document.body.style.height = `${document.documentElement.scrollHeight}px`; // Perbarui tinggi
        });
    }
    
    // Panggil saat pertama kali halaman dimuat
    updatePageHeight();
    
    // Panggil setiap kali ukuran layar berubah
    window.addEventListener("resize", () => {
        updatePageHeight();
        resetAstronautPositions();
    });
    
    // Fungsi untuk mereset posisi astronot
    function resetAstronautPositions() {
        const astronauts = document.querySelectorAll(".astronot");
        astronauts.forEach(astronaut => {
            let newX = Math.random() * (window.innerWidth * 0.9);
            let newY = Math.random() * (window.innerHeight * 0.9);
            astronaut.style.left = `${newX}px`;
            astronaut.style.top = `${newY}px`;
        });
    }
    
});
