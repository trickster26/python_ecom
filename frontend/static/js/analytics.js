// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
    // User Growth Chart
    const userGrowthOptions = {
        chart: {
            type: 'area',
            height: 350
        },
        series: [{
            name: 'Users',
            data: [30, 40, 35, 50, 49, 60, 70]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        stroke: {
            curve: 'smooth'
        }
    };
    new ApexCharts(document.querySelector("#userGrowthChart"), userGrowthOptions).render();

    // Revenue Chart
    const revenueOptions = {
        chart: {
            type: 'bar',
            height: 350
        },
        series: [{
            name: 'Revenue',
            data: [44, 55, 57, 56, 61, 58, 63]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        }
    };
    new ApexCharts(document.querySelector("#revenueChart"), revenueOptions).render();

    // Activity Chart
    const activityOptions = {
        chart: {
            type: 'line',
            height: 350
        },
        series: [{
            name: 'Active Users',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        }
    };
    new ApexCharts(document.querySelector("#activityChart"), activityOptions).render();

    // Conversion Chart
    const conversionOptions = {
        chart: {
            type: 'line',
            height: 350
        },
        series: [{
            name: 'Conversion Rate',
            data: [2.3, 3.1, 4.0, 3.8, 5.1, 4.9, 6.5]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        }
    };
    new ApexCharts(document.querySelector("#conversionChart"), conversionOptions).render();
}); 