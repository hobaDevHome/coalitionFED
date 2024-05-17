// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from API
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);
  let currentObject;

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
      // console.log("data", data);
      let currentObject = data.find((e) => e.name === "Jessica Taylor");
      displayProfile(currentObject);
      // console.log("currentObjec2", currentObject2.name);
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
});
