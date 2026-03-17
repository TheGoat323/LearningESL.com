// --- 1. Window Dragging Logic ---
document.querySelectorAll('.window-header').forEach(header => {
    header.onmousedown = function(e) {
        let win = header.parentElement;
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;

        // Bring clicked window to front
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = "10");
        win.style.zIndex = "100";

        function moveAt(pageX, pageY) {
            win.style.left = pageX - shiftX + 'px';
            win.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) { moveAt(e.pageX, e.pageY); }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };
});

// --- 2. Toggle Apps (Show/Hide) ---
function toggleApp(id) {
    const win = document.getElementById(id);
    win.style.display = (win.style.display === "none") ? "block" : "none";
}

// --- 3. Proxy/Search Logic ---
document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let input = document.getElementById('proxyInput').value;
    let url = input.includes('.') ? "https://" + input : "https://www.google.com/search?q=" + input;
    window.open(url, '_blank');
});

// --- 4. Audio Logic ---
document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        document.getElementById('audioPlayer').src = URL.createObjectURL(file);
        document.getElementById('audioPlayer').play();
    }
});

// --- 5. Clock ---
setInterval(() => {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);
