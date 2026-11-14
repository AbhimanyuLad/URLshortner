
    // Get actual click records from backend
    const analyticsElement = document.getElementById("analyticsData");

    const clicks = JSON.parse(
        analyticsElement.dataset.clicks
    );

    console.log(clicks);

    // Function to count values
    function getStatistics(key) {

        const stats = {};

        clicks.forEach(click => {

            const value = click[key] || "Unknown";

            stats[value] = (stats[value] || 0) + 1;

        });

        return stats;
    }


    // Function to create charts
    function createChart(id, type, title, stats) {

        new Chart(document.getElementById(id), {

            type: type,

            data: {
                labels: Object.keys(stats),

                datasets: [{
                    label: title,
                    data: Object.values(stats),

                    backgroundColor: [
                        '#3B82F6',
                        '#8B5CF6',
                        '#14B8A6',
                        '#F59E0B',
                        '#EF4444',
                        '#EC4899'
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: true
            }

        });

    }


    // Device chart
    createChart(
        'deviceChart',
        'doughnut',
        'Device Clicks',
        getStatistics('device')
    );


    // Browser chart
    createChart(
        'browserChart',
        'pie',
        'Browser Clicks',
        getStatistics('browser')
    );


    // Operating system chart
    createChart(
        'osChart',
        'bar',
        'OS Clicks',
        getStatistics('os')
    );


    // Country chart
    createChart(
        'countryChart',
        'bar',
        'Country Clicks',
        getStatistics('country')
    );


    // City chart
    createChart(
        'cityChart',
        'bar',
        'City Clicks',
        getStatistics('city')
    );


    // Daily click statistics
    const dailyStats = {};

    clicks.forEach(click => {

        const date = new Date(click.clickedAt)
            .toLocaleDateString('en-IN');

        dailyStats[date] = (dailyStats[date] || 0) + 1;

    });


    // Click activity chart
    createChart(
        'clickChart',
        'line',
        'Daily Clicks',
        dailyStats
    );

