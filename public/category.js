document.addEventListener("DOMContentLoaded", async () => {
    const category = window.location.pathname.split("/").pop().replace(".html", ""); // Get category from the URL
  
    try {
      const response = await fetch(`/person/${category}`); // Fetch notifications for the specific category
      const notifications = await response.json();
  
      const mainContent = document.querySelector(".main-content");
  
      notifications.forEach((notification) => {
        const card = document.createElement("section");
        card.classList.add("card");
  
        const cardIcon = document.createElement("div");
        cardIcon.classList.add("card-icon");
  
        const icon = document.createElement("span");
        icon.classList.add("material-icons");
  
        switch (category) {
          case "food":
            icon.textContent = "restaurant";
            break;
          case "library":
            icon.textContent = "local_library";
            break;
          case "gym":
            icon.textContent = "fitness_center";
            break;
          case "alerts":
            icon.textContent = "warning";
            break;
        }
  
        cardIcon.appendChild(icon);
  
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
  
        const cardTitle = document.createElement("h2");
        cardTitle.textContent = notification.tittle;
  
        const cardTime = document.createElement("p");
        cardTime.textContent = new Date(notification.time).toLocaleString();
  
        const cardDescription = document.createElement("p");
        cardDescription.textContent = notification.description;
  
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardTime);
        cardContent.appendChild(cardDescription);
  
        card.appendChild(cardIcon);
        card.appendChild(cardContent);
  
        mainContent.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  });
  