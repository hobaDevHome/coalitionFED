// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from API
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);
  let currentObject;
  let namesList;

  // Authenticate (dummy API)
  fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(function (data) {
      let currentObject = data.find((e) => e.name === "Jessica Taylor");
      displayProfile(currentObject);

      namesList = data.map((e) => {
        return {
          name: e.name,
          gender: e.gender,
          age: e.age,
        };
      });
      console.log("names", namesList);
      displayUserList(namesList);
    })
    .catch(function (error) {
      console.warn(error);
    });

  function displayProfile(profile) {
    const profileNameElement = document.getElementById("profileName");
    const phoneNumberElement = document.getElementById("phoneNumber");
    const profilePictureElement = document.getElementById("profilePicture");

    if (profileNameElement && phoneNumberElement && profilePictureElement) {
      profileNameElement.textContent = profile.name;
      phoneNumberElement.textContent = profile.phone_number;
      profilePictureElement.src = profile.profile_picture;
      profilePictureElement.alt = profile.name + "'s Profile Picture";
    } else {
      console.error("One or more elements are missing from the HTML.");
    }
  }

  function displayUserList(users) {
    const userListElement = document.getElementById("userList");

    if (userListElement) {
      users.forEach((user) => {
        // Create a new list item for each user
        const userItem = document.createElement("div");
        userItem.className = "list-group-item";

        // Add user details
        userItem.innerHTML = `
                <h5 class="mb-1">${user.name}</h5>
                <p class="mb-1">Gender: ${user.gender}</p>
                <small>Age: ${user.age}</small>
            `;

        // Append the list item to the user list
        userListElement.appendChild(userItem);
      });
    } else {
      console.error("The user list element is missing from the HTML.");
    }
  }
});
