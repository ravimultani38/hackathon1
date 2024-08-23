
        document.addEventListener("DOMContentLoaded", async () => {
            try {
                const response = await fetch("/person"); // Fetch all notifications
                const notifications = await response.json();
                console.log("notifications: ", notifications);
                const listingTableBody = document.querySelector("#listingTable tbody");

                notifications.forEach((notification) => {
                    // Create table row (tr) elements
                    const row = document.createElement("tr");
                    // alert(notification.tile);

                    // Create and append table cells (td) for each data field
                    const infoCell = document.createElement("td");
                    infoCell.textContent = notification.description;
                    row.appendChild(infoCell);

                    const typeCell = document.createElement("td");
                    typeCell.textContent = notification.categories.charAt(0).toUpperCase() + notification.categories.slice(1);
                    row.appendChild(typeCell);

                    const schoolCell = document.createElement("td");
                    const schoolIcon = document.createElement("img");
                    schoolIcon.src = `icons/${notification.school.toLowerCase()}.png`; // Assuming icons are named after school names
                    // console.log(notification.school.toLowerCase());
                    row.classList.add(notification.school.toLowerCase());
                    // console.log(row.classList);
                    schoolCell.appendChild(schoolIcon);
                    row.appendChild(schoolCell);

                    const dateCell = document.createElement("td");
                    dateCell.textContent = new Date(notification.time).toLocaleDateString();
                    row.appendChild(dateCell);
                    const timeCell = document.createElement("td");
                    timeCell.textContent = new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    row.appendChild(timeCell);

                    // Append the row to the table body
                    listingTableBody.appendChild(row);
                });
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        });
        

        document.addEventListener('DOMContentLoaded', function () {
            const searchButton = document.querySelector('.search-button');
            
            searchButton.addEventListener('click', async function () {
                // Get the selected values from the filters
                const categories = document.querySelector('select[name="type"]').value;
                const school = document.querySelector('select[name="school"]').value;
                const timeline = document.querySelector('select[name="timeline"]').value;
        
                // Build the query string
                const queryParams = new URLSearchParams({
                    categories: categories,
                    school: school,
                    
                });
        
                try {
                    // Make the API call to fetch notifications based on selected options
                    const response = await fetch(`/person?${queryParams.toString()}`);
                    console.log(response);
                    if (!response.ok) throw new Error('Network response was not ok');
        
                    const notifications = await response.json();
        
                    // Display the results in the table
                    const tbody = document.querySelector('#listingTable tbody');
                    tbody.innerHTML = ''; // Clear existing rows
        
                    if (notifications.length > 0) {
                        notifications.forEach(notification => {
                            const row = document.createElement('tr');
                            const schoolCell = document.createElement("td");
                            const schoolIcon = document.createElement("img");
                            schoolIcon.src = `icons/${notification.school.toLowerCase()}.png`; // Assuming icons are named after school names
                            row.classList.add(notification.school.toLowerCase());
                            schoolCell.appendChild(schoolIcon);
                            const stringSchool = `${schoolCell}`;
                            console.log(schoolCell);
                            row.innerHTML = `
                                <td>${notification.description}</td>
                                <td>${notification.categories.charAt(0).toUpperCase() + notification.categories.slice(1)}</td>
                                <td><img src="icons/${notification.school.toLowerCase()}.png" alt="${notification.school}"></td>
                                <td>${new Date(notification.time).toLocaleDateString()}</td>
                                <td>${new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            `;
                            tbody.appendChild(row);
                        });
                    } else {
                        // No notifications found
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="4">No notifications found</td>';
                        tbody.appendChild(row);
                    }
        
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            });
        });

        document.getElementById('cunyconnect').addEventListener('click', function() {
            window.location.href = '/';
        });  

        document.getElementById('home').addEventListener('click', function() {
            window.location.href = '/';
        });

        document.getElementById('about').addEventListener('click', function() {
            window.location.href = '/about.html';
        });
        
        document.getElementById('help').addEventListener('click', function() {
            window.location.href = '/help.html';
        });


        // WE GOT THIS      