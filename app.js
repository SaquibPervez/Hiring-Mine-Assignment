// document.getElementById('toggle-button').addEventListener('change', function() {
//     document.body.classList.toggle('dark-mode');
// });

// const style = document.createElement('style');
// style.innerHTML = `
//     .dark-mode{
//         background-color: #333;
//         color: white;
//     }
//     .dark-mode .navbar {
//         background-color: #444;
//     }
//     .dark-mode .nav-links a {
//         color: white;
//     }
//     .dark-mode .post-job {
//         color: lightblue;
//     }
//     .dark-mode .subtitle {
//     color: white;
//     }
// `;
// document.head.appendChild(style);

// api -> https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false

fetch('https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        const container = document.getElementById('job-container');

        const jobs = data.data || [];

        if (Array.isArray(jobs) && jobs.length > 0) {
            jobs.forEach(job => {
                const card = document.createElement('div');
                const timePassed = timeAgo(job.createdAt)
                card.id = 'card';
                card.innerHTML = `
                    <div id="header">
                        <p id="company">${job.companyName || 'Unknown Company'}</p>
                        <img id="logo" src="${job.logo || 'logo.png'}" alt="Company Logo">
                    </div>
                    <h3 id="position"><b>${job.designation || 'Position Not Available'}</b></h3>
                    <p id="salary">${job.payRangeStart ? `Rs. ${job.payRangeStart} - ${job.payRangeEnd}` : 'No Salary Mentioned'}</p>
                    <div id="Body">
                        <p id="location">${job.city || 'Remote'}, ${job.country || 'Pakistan'}</p>
                        <p id="views">${job.views || '0'} views</p>
                    </div>
                    <div id="footer">
                        <p id="time">${timePassed}</p>
                        <p id="poster">posted by <span id="poster-name">${job.user?.firstName || 'Unknown'} ${job.user?.lastName || ''}</span></p>
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>No job ads found.</p>';
        }
    })
    .catch(error => console.error('Error fetching jobs:', error));

    function timeAgo(createdAt) {
        const now = new Date();
        const jobDate = new Date(createdAt);
        const diffInSeconds = Math.floor((now - jobDate) / 1000);
    
        if (diffInSeconds < 60) {
            return diffInSeconds === 1 ? '1 second ago' : `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (diffInSeconds < 2592000) {
            const weeks = Math.floor(diffInSeconds / 604800);
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return years === 1 ? '1 year ago' : `${years} years ago`;
        }
    }