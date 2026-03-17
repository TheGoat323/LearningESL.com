// This is your Render URL + the path to the unblocker
const PROXY_SERVER = "https://learningesl-com.onrender.com/static/"; 

proxyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let input = proxyInput.value.trim();
    
    let targetUrl;
    if (input.includes('.') && !input.includes(' ')) {
        targetUrl = input.startsWith('http') ? input : 'https://' + input;
    } else {
        targetUrl = 'https://www.google.com/search?q=' + encodeURIComponent(input);
    }

    // This encodes the site so the filter doesn't see it
    const finalUrl = PROXY_SERVER + "#" + btoa(targetUrl); 

    launchBrowser(finalUrl);
});
