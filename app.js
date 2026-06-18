// =========================
// Animated Counters
// =========================

function animateValue(id, start, end, duration) {

    let current = start;
    const range = end - start;

    const increment = range / (duration / 20);

    const element = document.getElementById(id);

    const timer = setInterval(() => {

        current += increment;

        if (current >= end) {
            current = end;
            clearInterval(timer);
        }

        if (id === "riskScore") {
            element.innerText = Math.floor(current) + "%";
        } else {
            element.innerText = Math.floor(current).toLocaleString();
        }

    }, 20);
}

animateValue("filesScanned", 0, 12453, 2000);
animateValue("threatsDetected", 0, 18, 1500);
animateValue("riskScore", 0, 78, 1800);

// =========================
// Threat Trend Chart
// =========================

const threatCtx = document.getElementById("threatChart");

new Chart(threatCtx, {
    type: "line",
    data: {
        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],
        datasets: [{
            label: "Threat Events",
            data: [5, 8, 4, 12, 7, 15, 10],
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34,211,238,0.2)",
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white"
                }
            },
            x: {
                ticks: {
                    color: "white"
                }
            }
        }
    }
});

// =========================
// Severity Pie Chart
// =========================

const severityCtx =
document.getElementById("severityChart");

new Chart(severityCtx, {

    type: "doughnut",

    data: {

        labels: [
            "Low",
            "Medium",
            "High",
            "Critical"
        ],

        datasets: [{
            data: [35, 25, 20, 20],

            backgroundColor: [
                "#22c55e",
                "#f59e0b",
                "#3b82f6",
                "#ef4444"
            ]
        }]
    },

    options: {

        plugins: {

            legend: {

                labels: {
                    color: "white"
                }
            }
        }
    }
});

// =========================
// Toast Notification
// =========================

function showToast(message) {

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 500);

    }, 3000);
}

// =========================
// Simulated Attack
// =========================

function simulateAttack() {

    const alerts = [

        "Encryption behaviour detected",

        "Multiple file extensions modified",

        "Rapid file rename attack detected",

        "Suspicious process execution",

        "Unauthorized backup deletion",

        "Mass file access detected",

        "Potential ransomware signature matched"

    ];

    const randomAlert =
    alerts[Math.floor(
        Math.random() * alerts.length
    )];

    const alertList =
    document.getElementById("alertList");

    const item =
    document.createElement("li");

    item.innerHTML =
        "🚨 " +
        new Date().toLocaleTimeString() +
        " - " +
        randomAlert;

    alertList.prepend(item);

    const threats =
    document.getElementById(
        "threatsDetected"
    );

    threats.innerText =
        parseInt(threats.innerText) + 1;

    let currentRisk =
    parseInt(
        document
        .getElementById("riskScore")
        .innerText
    );

    if (currentRisk < 100) {

        currentRisk +=
        Math.floor(Math.random() * 4) + 1;

        document.getElementById(
            "riskScore"
        ).innerText =
            currentRisk + "%";
    }

    showToast(
        "⚠ New Security Event Detected"
    );
}

// =========================
// Generate Report Button
// =========================

const reportButton =
document.querySelector(
".primary-btn"
);

reportButton.addEventListener(
"click",
function() {

    const report = `

RANSOMWARE EARLY WARNING SYSTEM

Files Scanned:
${document.getElementById("filesScanned").innerText}

Threats Detected:
${document.getElementById("threatsDetected").innerText}

Risk Score:
${document.getElementById("riskScore").innerText}

System Status:
Protected

Generated:
${new Date().toLocaleString()}
`;

    const blob =
    new Blob(
        [report],
        { type: "text/plain" }
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "Threat_Report.txt";

    link.click();

    showToast(
        "📄 Report Generated Successfully"
    );
});

// =========================
// Auto Threat Simulation
// =========================

setInterval(() => {

    if (Math.random() > 0.7) {
        simulateAttack();
    }

}, 12000);