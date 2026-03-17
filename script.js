// Change this to the URL you got from Render/Koyeb
const PROXY_SERVER_URL = "https://api.render.com/deploy/srv-d6sfgn7fte5s73f74ftg?key=E4u3Kl5wcIs";

document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let input = document.getElementById('proxyInput').value.trim();
    
    // 1. Fix the URL if it's just a search
    let targetUrl;
    if (input.includes('.') && !input.includes(' ')) {
        targetUrl = input.startsWith('http') ? input : 'https://' + input;
    } else {
        targetUrl = 'https://www.google.com/search?q=' + encodeURIComponent(input);
    }

    // 2. Encode the URL for the proxy engine
    // Most proxies use a specific encoding (Ultraviolet uses XOR or Base64)
    // For a simple setup, we just append it to our service URL
    const finalProxyUrl = PROXY_SERVER_URL + btoa(targetUrl); 

    // 3. Open the proxied site
    // To stay "inside" your OS, we should open it in an Iframe
    openInWindow(finalProxyUrl);
});

function openInWindow(url) {
    // This creates a new 'Window' div with an <iframe> inside it
    const desktop = document.getElementById('desktop');
    const browserWin = document.createElement('div');
    browserWin.className = 'window';
    browserWin.style.width = "80%";
    browserWin.style.height = "70%";
    browserWin.style.top = "50px";
    browserWin.style.left = "10%";

    browserWin.innerHTML = `
        <div class="window-header">
            <span>🌐 Browser</span>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="window-content" style="height: calc(100% - 40px); padding: 0;">
            <iframe src="${url}" style="width:100%; height:100%; border:none; border-radius: 0 0 12px 12px;"></iframe>
        </div>
    `;
    desktop.appendChild(browserWin);
}
