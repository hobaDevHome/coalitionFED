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
          pic: e.profile_picture,
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
        const userItem = document.createElement("div");
        userItem.className = "list-item";

        userItem.innerHTML = `
        <div class="patientListItemData">
        <div>
          <img
            src=${user.pic}  alt="patient picture"
          />
        </div>
        <div>
          <div class="patientName">${user.name}</div>
          <div class="patientAge">${user.gender}, ${user.age}</div>
        </div>
      </div>
      <div>
        <img
          src="images/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
          alt="tech care logo"
        />
      </div>
            `;

        userListElement.appendChild(userItem);
      });
    } else {
      console.error("The user list element is missing from the HTML.");
    }
  }
});
