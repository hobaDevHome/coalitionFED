// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from API
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);
  let jessicaObject;
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
      jessicaObject = data.find((e) => e.name === "Jessica Taylor");
      displayProfile(jessicaObject);

      namesList = data.map((e) => {
        return {
          name: e.name,
          gender: e.gender,
          age: e.age,
          pic: e.profile_picture,
        };
      });
      console.log("jessicaObject", jessicaObject);
      displayDiagnosisList(jessicaObject.diagnostic_list);
      displayPatientsList(namesList);
      displayLabResultsList(jessicaObject.lab_results);
    })
    .catch(function (error) {
      console.warn(error);
    });

  function displayProfile(profile) {
    const patientName = document.getElementById("patientName");
    const patientImage = document.getElementById("patientImage");
    const dobData = document.getElementById("dobData");
    const genderIcon = document.getElementById("genderIcon");
    const gender = document.getElementById("gender");
    const contact = document.getElementById("contact");
    const emergency = document.getElementById("emergency");
    const insurance = document.getElementById("insurance");

    if (patientName) patientName.textContent = profile.name;
    if (patientImage) patientImage.src = profile.profile_picture;
    if (dobData) dobData.textContent = profile.date_of_birth;
    if (gender) gender.textContent = profile.gender;
    if (contact) contact.textContent = profile.phone_number;
    if (emergency) emergency.textContent = profile.emergency_contact;
    if (insurance) insurance.textContent = profile.insurance_type;
    if (genderIcon) {
      if (profile.gender == "Female") {
        genderIcon.src = "images/FemaleIcon.svg";
      } else {
        genderIcon.src = "images/MaleIcon.svg";
      }
    }
  }

  function displayPatientsList(list) {
    const patientListElement = document.getElementById("patlist");

    if (patientListElement) {
      list.forEach((patient) => {
        const patientItem = document.createElement("div");
        patientItem.className = `list-item ${
          patient.name == "Jessica Taylor" ? "list-item-active" : ""
        }`;

        patientItem.innerHTML = `
        <div class="patientListItemData">
        <div>
          <img
            src=${patient.pic}  alt="patient picture"
          />
        </div>
        <div>
          <div class="patientName">${patient.name}</div>
          <div class="patientAge">${patient.gender}, ${patient.age}</div>
        </div>
      </div>
      <div>
        <img
          src="images/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
          alt="tech care logo"
        />
      </div>
            `;

        patientListElement.appendChild(patientItem);
      });
    } else {
      console.error("The user list element is missing from the HTML.");
    }
  }
  function displayDiagnosisList(list) {
    const diagnosisListElement = document.getElementById("diagnosisList");

    if (diagnosisListElement) {
      list.forEach((diagnosis) => {
        const diagnosisItem = document.createElement("div");

        diagnosisItem.innerHTML = `
        <div class="row diaRow">
                <div class="col-4">${diagnosis.name}</div>
                <div class="col-6">${diagnosis.description}</div>
                <div class="col-2">${diagnosis.status}</div>
              </div>
            `;

        diagnosisListElement.appendChild(diagnosisItem);
      });
    } else {
      console.error("The diagnosis list element is missing from the HTML.");
    }
  }
  function displayLabResultsList(list) {
    const labResultsListElement = document.getElementById("labResList");

    if (labResultsListElement) {
      list.forEach((labItem) => {
        const labResItem = document.createElement("div");

        labResItem.innerHTML = `
        <div class="labresItem">
                  <div>${labItem}</div>
                  <img
                    src="images/download_FILL0_wght300_GRAD0_opsz24 (1).svg"
                    alt="download lab results"
                  />
                </div>
            `;

        labResultsListElement.appendChild(labResItem);
      });
    } else {
      console.error("The lab results list element is missing from the HTML.");
    }
  }
});
