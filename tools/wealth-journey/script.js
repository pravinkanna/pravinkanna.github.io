// --- Configuration & Initial State ---
const CURRENCY_SYMBOL = "₹";
const LOCALE = "en-IN";

let funds = [
    { name: "Nifty 50 Index", amount: 10000, cagr: 12.0 },
    { name: "Nasdaq 100", amount: 10000, cagr: 15.0 },
    { name: "Liquid Fund", amount: 5000, cagr: 6.0 },
];

let wealthProjectionChart = null;
let sipAllocationChart = null;
let sipStepUpChart = null;
let wealthAllocationChart = null;
let netGainsChart = null;
let fundPerformanceChart = null;

// --- DOM Elements ---
const fundsContainer = document.getElementById('funds-container');
const totalSipDisplay = document.getElementById('total-sip-display');

// --- Initialization ---
function init() {
    renderFunds();
    calculate();
}

// --- Logic: Render Fund Inputs ---
function renderFunds() {
    fundsContainer.innerHTML = '';
    funds.forEach((fund, index) => {
        const div = document.createElement('div');
        div.className = "group bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors";
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <input type="text" value="${fund.name}" oninput="updateFund(${index}, 'name', this.value)" 
                    class="bg-transparent border-none p-0 font-medium text-sm text-slate-700 focus:ring-0 w-full" placeholder="Fund Name">
                <button onclick="removeFund(${index})" class="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Amount (${CURRENCY_SYMBOL})</label>
                    <input type="number" value="${fund.amount}" min="0" max="1000000000" oninput="updateFund(${index}, 'amount', this)" 
                        class="w-full text-sm bg-white border border-slate-200 rounded px-2 py-1 focus:border-indigo-500 outline-none invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500">
                </div>
                <div>
                    <label class="block text-[10px] uppercase text-slate-400 font-semibold mb-0.5">CAGR (%)</label>
                    <input type="number" step="0.1" value="${fund.cagr}" min="-90" max="100" oninput="updateFund(${index}, 'cagr', this)" 
                        class="w-full text-sm bg-white border border-slate-200 rounded px-2 py-1 focus:border-indigo-500 outline-none invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500">
                </div>
            </div>
        `;
        fundsContainer.appendChild(div);
    });
    updateTotalSipDisplay();
}

function addFund() {
    funds.push({ name: "New Fund", amount: 5000, cagr: 10.0 });
    renderFunds();
    calculate();
}

function removeFund(index) {
    funds.splice(index, 1);
    renderFunds();
    calculate();
}

function updateFund(index, field, inputOrValue) {
    let value;
    if (field === 'amount' || field === 'cagr') {
        // InputOrValue is the DOM element
        if (!inputOrValue.checkValidity()) return;
        value = inputOrValue.value;
        funds[index][field] = parseFloat(value) || 0;
    } else {
        // InputOrValue is the string value (for name)
        value = inputOrValue;
        funds[index][field] = value;
    }
    updateTotalSipDisplay();
    calculate();
}

function updateTotalSipDisplay() {
    const total = funds.reduce((sum, a) => sum + a.amount, 0);
    totalSipDisplay.textContent = formatCurrency(total);
}

// --- Logic: Calculation ---
function calculate() {
    // Global Validation Check
    const inputs = document.querySelectorAll('input');
    for (const input of inputs) {
        if (!input.checkValidity()) return;
    }

    const currentAge = parseInt(document.getElementById('current-age').value) || 25;
    const duration = parseInt(document.getElementById('investment-duration').value) || 20;
    const stepUpRate = parseFloat(document.getElementById('step-up-rate').value) / 100 || 0;
    const inflationRate = parseFloat(document.getElementById('inflation-rate').value) / 100 || 0;

    const labels = [];
    const investedData = [];
    const valueData = [];
    const inflationAdjustedData = [];
    const sipData = [];
    const profitData = [];
    const annualBreakdown = [];
    // Data structure for Fund Race: array of arrays, one per fund
    const fundRaceData = funds.map(() => []);

    let breakevenAge = null;
    let milestones = [];
    const valueMilestones = [
        { val: 100000, label: "1L" },
        { val: 500000, label: "5L" },
        { val: 1000000, label: "10L" },
        { val: 2500000, label: "25L" },
        { val: 5000000, label: "50L" },
        { val: 10000000, label: "1Cr" },
        { val: 50000000, label: "5Cr" },
        { val: 100000000, label: "10Cr" },
        { val: 500000000, label: "50Cr" },
        { val: 1000000000, label: "100Cr" }
    ];
    let hitMilestones = new Set();

    let totalAccumulatedValue = 0;
    let totalAccumulatedInvested = 0;

    let fundStates = funds.map(f => ({
        ...f,
        currentCorpus: 0,
        totalInvested: 0
    }));

    for (let year = 1; year <= duration; year++) {
        const age = currentAge + year;
        const stepUpMultiplier = Math.pow(1 + stepUpRate, year - 1);

        const currentYearTotalSip = funds.reduce((sum, f) => sum + (f.amount * stepUpMultiplier), 0);
        sipData.push(currentYearTotalSip);

        let yearlyInvested = 0;

        for (let month = 1; month <= 12; month++) {
            fundStates.forEach((fund, idx) => {
                const monthlyRate = fund.cagr / 100 / 12;
                const currentMonthlySip = fund.amount * stepUpMultiplier;

                fund.currentCorpus += currentMonthlySip;
                fund.totalInvested += currentMonthlySip;
                yearlyInvested += currentMonthlySip;
                fund.currentCorpus = fund.currentCorpus * (1 + monthlyRate);
            });

            // Update Race Data monthly? No, yearly is cleaner for the chart.
            // Just Milestone check here.

            const currentTotalValue = fundStates.reduce((sum, f) => sum + f.currentCorpus, 0);
            valueMilestones.forEach(m => {
                if (currentTotalValue >= m.val && !hitMilestones.has(m.label)) {
                    milestones.push({
                        label: m.label,
                        age: Math.round(currentAge + year - 1 + (month / 12)), // Corrected Age Calc
                        invested: fundStates.reduce((sum, f) => sum + f.totalInvested, 0),
                        value: currentTotalValue
                    });
                    hitMilestones.add(m.label);
                }
            });
        }

        // Push Yearly Snapshots
        fundStates.forEach((fund, idx) => {
            fundRaceData[idx].push(fund.currentCorpus);
        });

        totalAccumulatedInvested += yearlyInvested;
        totalAccumulatedValue = fundStates.reduce((sum, f) => sum + f.currentCorpus, 0);

        // Inflation Adjustment
        // Real Value = Nominal Value / (1 + inflationRate)^year
        const inflationDivisor = Math.pow(1 + inflationRate, year);
        const realValue = totalAccumulatedValue / inflationDivisor;

        labels.push(age);
        investedData.push(totalAccumulatedInvested);
        valueData.push(totalAccumulatedValue);
        inflationAdjustedData.push(realValue);

        const profit = totalAccumulatedValue - totalAccumulatedInvested;
        profitData.push(profit > 0 ? profit : 0);

        annualBreakdown.push(fundStates.map(f => ({
            name: f.name,
            invested: f.totalInvested,
            value: f.currentCorpus
        })));

        if (profit > totalAccumulatedInvested && breakevenAge === null) {
            breakevenAge = age;
        }
    }

    const finalValue = valueData[valueData.length - 1];
    const finalInvested = investedData[investedData.length - 1];
    const finalRealValue = inflationAdjustedData[inflationAdjustedData.length - 1];

    document.getElementById('summary-invested').textContent = formatBigCurrency(finalInvested);
    document.getElementById('summary-value').textContent = formatBigCurrency(finalValue);
    document.getElementById('summary-profit').textContent = `Profit: ${formatBigCurrency(finalValue - finalInvested)}`;
    document.getElementById('summary-real-value').textContent = `Real Value: ~${formatBigCurrency(finalRealValue)}`;
    document.getElementById('summary-breakeven').textContent = breakevenAge ? `Age ${breakevenAge}` : "N/A";

    updateCharts(labels, investedData, valueData, inflationAdjustedData, profitData, sipData, fundStates, annualBreakdown, fundRaceData);
    updateMilestonesTable(milestones);
}

// --- Helper: Formatters ---
function formatCurrency(num) {
    return CURRENCY_SYMBOL + num.toLocaleString(LOCALE, { maximumFractionDigits: 0 });
}

function formatBigCurrency(num) {
    if (LOCALE === 'en-IN') {
        if (num >= 10000000) return CURRENCY_SYMBOL + (num / 10000000).toFixed(2) + " Cr";
        if (num >= 100000) return CURRENCY_SYMBOL + (num / 100000).toFixed(2) + " L";
    } else {
        if (num >= 1000000000) return CURRENCY_SYMBOL + (num / 1000000000).toFixed(2) + " B";
        if (num >= 1000000) return CURRENCY_SYMBOL + (num / 1000000).toFixed(2) + " M";
    }
    return formatCurrency(num);
}

function updateMilestonesTable(data) {
    const tbody = document.getElementById('milestones-table-body');
    tbody.innerHTML = data.map(row => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-4 py-3 font-bold text-indigo-600">${row.label}</td>
            <td class="px-4 py-3 font-medium text-slate-900">${row.age}</td>
            <td class="px-4 py-3 text-right text-slate-600">${formatBigCurrency(row.invested)}</td>
            <td class="px-4 py-3 text-right font-bold text-emerald-600">${formatBigCurrency(row.value)}</td>
        </tr>
    `).join('');
}

// --- Logic: Charts ---
function updateCharts(labels, invested, value, inflationAdjusted, profit, sipData, fundStates, annualBreakdown, fundRaceData) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

    // 1. Growth Chart
    const ctx = document.getElementById('wealth-projection-chart').getContext('2d');
    if (wealthProjectionChart) wealthProjectionChart.destroy();

    let datasets = [];

    // Add Inflation Adjusted Line (Top Layer)
    datasets.push({
        label: `Real Value (Inflation Adj.)`,
        data: inflationAdjusted,
        borderColor: '#0f172a',
        borderWidth: 2,
        pointRadius: 0,
        type: 'line',
        borderDash: [5, 5],
        order: 0,
        tension: 0.4
    });

    if (annualBreakdown && annualBreakdown.length > 0) {
        const numFunds = annualBreakdown[0].length;
        for (let i = 0; i < numFunds; i++) {
            datasets.push({
                label: `Invested: ${annualBreakdown[0][i].name}`,
                data: annualBreakdown.map(yearData => yearData[i].invested),
                backgroundColor: colors[i % colors.length] + '80', // Transparent version
                stack: 'Invested',
                barPercentage: 0.8,
                categoryPercentage: 0.9,
                order: 2
            });
        }
        for (let i = 0; i < numFunds; i++) {
            datasets.push({
                label: `Value: ${annualBreakdown[0][i].name}`,
                data: annualBreakdown.map(yearData => yearData[i].value),
                backgroundColor: colors[i % colors.length], // Solid version
                stack: 'Value',
                barPercentage: 0.8,
                categoryPercentage: 0.9,
                order: 1
            });
        }
    }

    wealthProjectionChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: labels, datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'nearest', intersect: true },
            scales: {
                x: { stacked: true, grid: { display: false }, title: { display: true, text: 'Your Age', color: '#94a3b8' } },
                y: {
                    stacked: true,
                    grid: { color: '#f1f5f9' },
                    ticks: { callback: v => formatBigCurrency(v), color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 10 } }, // Show legend for the line
                tooltip: {
                    callbacks: {
                        title: context => 'Age: ' + context[0].label,
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += formatBigCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            }
        }
    });

    // 2. Net Gains (Hockey Stick) Chart
    const profitCtx = document.getElementById('net-gains-chart').getContext('2d');
    if (netGainsChart) netGainsChart.destroy();

    // Create gradient
    const gradientProfit = profitCtx.createLinearGradient(0, 0, 0, 400);
    gradientProfit.addColorStop(0, 'rgba(16, 185, 129, 0.5)'); // Emerald 500
    gradientProfit.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    netGainsChart = new Chart(profitCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Net Profit',
                data: profit,
                borderColor: '#10b981', // Emerald 500
                backgroundColor: gradientProfit,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: { grid: { display: false }, title: { display: true, text: 'Your Age', color: '#94a3b8' } },
                y: { grid: { color: '#f1f5f9' }, ticks: { callback: v => formatBigCurrency(v), color: '#94a3b8' } }
            },
            plugins: { legend: { display: false } }
        }
    });

    // 3. Fund Performance Race Chart
    const raceCtx = document.getElementById('fund-performance-chart').getContext('2d');
    if (fundPerformanceChart) fundPerformanceChart.destroy();

    const raceDatasets = funds.map((fund, i) => ({
        label: fund.name,
        data: fundRaceData[i],
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length],
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
    }));

    fundPerformanceChart = new Chart(raceCtx, {
        type: 'line',
        data: { labels: labels, datasets: raceDatasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: { grid: { display: false }, title: { display: true, text: 'Your Age', color: '#94a3b8' } },
                y: { grid: { color: '#f1f5f9' }, ticks: { callback: v => formatBigCurrency(v), color: '#94a3b8' } }
            },
            plugins: {
                legend: { position: 'top', align: 'end', labels: { boxWidth: 10, usePointStyle: true } }
            }
        }
    });

    // 4. SIP Chart (Existing)
    if (sipData) {
        const sipCtx = document.getElementById('sip-step-up-chart').getContext('2d');
        if (sipStepUpChart) sipStepUpChart.destroy();
        sipStepUpChart = new Chart(sipCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ label: 'Monthly SIP', data: sipData, backgroundColor: '#8b5cf6', borderRadius: 4 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false }, title: { display: true, text: 'Your Age', color: '#94a3b8' } },
                    y: { grid: { color: '#f1f5f9' }, ticks: { callback: v => formatCurrency(v), color: '#94a3b8' } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // 5. Allocation Charts (Existing)
    const donutCtx = document.getElementById('sip-allocation-chart').getContext('2d');
    if (sipAllocationChart) sipAllocationChart.destroy();
    sipAllocationChart = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
            labels: funds.map(f => f.name),
            datasets: [{ data: funds.map(f => f.amount), backgroundColor: colors.slice(0, funds.length), borderWidth: 0 }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, usePointStyle: true } },
                cutout: '70%',
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
                            return `${context.label}: ${formatCurrency(context.parsed)} (${percentage})`;
                        }
                    }
                }
            }
        }
    });

    if (fundStates) {
        const corpusCtx = document.getElementById('wealth-allocation-chart').getContext('2d');
        if (wealthAllocationChart) wealthAllocationChart.destroy();
        wealthAllocationChart = new Chart(corpusCtx, {
            type: 'pie',
            data: {
                labels: fundStates.map(f => f.name),
                datasets: [{ data: fundStates.map(f => f.currentCorpus), backgroundColor: colors.slice(0, fundStates.length), borderWidth: 0 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12, usePointStyle: true } },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
                                return `${context.label}: ${formatBigCurrency(context.parsed)} (${percentage})`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    if (window.innerWidth >= 1024) {
        if (sidebar.classList.contains('w-0')) {
            sidebar.classList.remove('w-0', 'border-0');
            sidebar.classList.add('lg:w-96', 'border-r');
            sidebarContent.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            sidebar.classList.remove('lg:w-96', 'border-r');
            sidebar.classList.add('w-0', 'border-0');
            sidebarContent.classList.add('opacity-0', 'pointer-events-none');
        }
    } else {
        sidebar.classList.toggle('hidden');
    }
    setTimeout(() => {
        [wealthProjectionChart, sipAllocationChart, sipStepUpChart, wealthAllocationChart, netGainsChart, fundPerformanceChart].forEach(c => c && c.resize());
    }, 350);
}

document.addEventListener("DOMContentLoaded", init);