const labels = [2010, 2011, 2012, 2018, 2019];
const dataByRegion = {
    "Asia": [7120, 8930, 8080, 6070, 6080],
    "Europe": [12300, 13000, 12500, 11800, 12000],
    "Africa": [5000, 5200, 5100, 4800, 4900],
    "Americas": [15000, 15500, 14800, 14500, 15000],
};

const colors = {
    "Asia": "rgb(255, 99, 132)",  
    "Europe": "rgb(54, 162, 235)",  
    "Africa": "rgb(75, 192, 192)",  
    "Americas": "rgb(255, 206, 86)"
};


function createDataset(region) {
    return {
        label: region,
        data: dataByRegion[region],
        borderColor: colors[region],
        backgroundColor: colors[region],
        fill: false,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7
    };
}

const ctx = document.getElementById('regionChart').getContext('2d');
const initialRegions = ["Asia", "Europe", "Africa", "Americas"];
const config = {
    type: 'line',
    data: {
        labels: labels,
        datasets: initialRegions.map(createDataset)
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Émissions de CO₂ par Région (en kilotonnes)'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const regionChart = new Chart(ctx, config);

const checkboxContainer = document.getElementById('checkboxContainer');
checkboxContainer.addEventListener('change', () => {
    const selectedRegions = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    regionChart.data.datasets = selectedRegions.map(createDataset);
    regionChart.update();
});
