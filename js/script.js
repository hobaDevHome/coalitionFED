// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from API
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);
  let jessicaObject;
  let namesList;

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
      // console.log("jessicaObject", data);
      displayDiagnosisList(jessicaObject.diagnostic_list);
      displayPatientsList(namesList);
      displayLabResultsList(jessicaObject.lab_results);
      displayHealthIndicatiors(jessicaObject.diagnosis_history[0]);
      displayBloodPressure(jessicaObject.diagnosis_history[0].blood_pressure);

      dispalyChart(jessicaObject.diagnosis_history);
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

    let formattedDate = formatDate(profile.date_of_birth);

    if (patientName) patientName.textContent = profile.name;
    if (patientImage) patientImage.src = profile.profile_picture;
    if (dobData) dobData.textContent = formattedDate;
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

  function displayHealthIndicatiors(history) {
    const respiratory_value = document.getElementById("respiratory_value");
    const respiratory_level = document.getElementById("respiratory_level");

    const temperature_value = document.getElementById("temperature_value");
    const temperature_level = document.getElementById("temperature_level");

    const heart_rate_value = document.getElementById("heart_rate_value");
    const heart_rate_icon = document.getElementById("heart_rate_icon");
    const heart_rate_level = document.getElementById("heart_rate_level");

    if (respiratory_value)
      respiratory_value.textContent = `${history.respiratory_rate.value} bpm`;
    if (respiratory_level)
      respiratory_level.textContent = history.respiratory_rate.levels;

    if (temperature_value)
      temperature_value.textContent = history.temperature.value + "\u00B0F";
    if (temperature_level)
      temperature_level.textContent = history.temperature.levels;

    if (heart_rate_value)
      heart_rate_value.textContent = `${history.heart_rate.value} bpm`;
    if (heart_rate_level)
      heart_rate_level.textContent = history.heart_rate.levels;

    if (heart_rate_icon) {
      if (history.heart_rate.levels == "Lower than Average") {
        heart_rate_icon.src = "images/ArrowDown.svg";
        heart_rate_icon.style.display = "block";
      } else if (history.heart_rate.levels == "Normal") {
        heart_rate_icon.style.display = "none";
      } else if (history.heart_rate.levels == "Higher than Average") {
        heart_rate_icon.src = "images/ArrowUp.svg";
        heart_rate_icon.style.display = "block";
      }
    }
  }
  function displayBloodPressure(bp) {
    const systolic_value = document.getElementById("systolic_value");
    const systolic_levels = document.getElementById("systolic_levels");
    const systolic_icon = document.getElementById("systolic_icon");

    const diastolic_value = document.getElementById("diastolic_value");
    const diastolic_levels = document.getElementById("diastolic_levels");
    const diastolic_icon = document.getElementById("diastolic_icon");

    if (systolic_value) systolic_value.textContent = bp.systolic.value;
    if (systolic_levels) systolic_levels.textContent = bp.systolic.levels;
    if (diastolic_value) diastolic_value.textContent = bp.diastolic.value;
    if (diastolic_levels) diastolic_levels.textContent = bp.diastolic.levels;

    if (systolic_icon) {
      if (bp.systolic.levels == "Lower than Average") {
        systolic_icon.src = "images/ArrowDown.svg";
        systolic_icon.style.display = "block";
      } else if (bp.systolic.levels == "Normal") {
        systolic_icon.style.display = "none";
      } else if (bp.systolic.levels == "Higher than Average") {
        systolic_icon.src = "images/ArrowUp.svg";
        systolic_icon.style.display = "block";
      }
    }

    if (diastolic_icon) {
      if (bp.diastolic.levels == "Lower than Average") {
        diastolic_icon.src = "images/ArrowDown.svg";
        diastolic_icon.style.display = "block";
      } else if (bp.systolic.levels == "Normal") {
        diastolic_icon.style.display = "none";
      } else if (bp.systolic.levels == "Higher than Average") {
        diastolic_icon.src = "images/ArrowUp.svg";
        diastolic_icon.style.display = "block";
      }
    }
  }
  function dispalyChart(patintHistory) {
    let historyArray;
    if (patintHistory.length > 6) {
      historyArray = patintHistory.slice(0, 6).reverse();
    } else {
      historyArray = patintHistory.reverse();
    }
    let xValues = historyArray.map((e) => {
      return `${e.month.slice(0, 3)}, ${e.year}`;
    });

    const sysData = historyArray.map((e) => {
      return e.blood_pressure.systolic.value;
    });
    const diasData = historyArray.map((e) => {
      return e.blood_pressure.diastolic.value;
    });

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            data: sysData,
            borderColor: "#C26EB4",
            fill: false,
            pointBackgroundColor: "#E66FD2",
          },
          {
            data: diasData,
            borderColor: "#7E6CAB",
            fill: false,
            pointBackgroundColor: "#8C6FE6",
          },
        ],
      },
      options: {
        legend: { display: false },
        elements: {
          point: {
            radius: 5,
          },
        },
        scales: {
          y: {
            top: 180,
            bottom: 60,
          },
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }
  function formatDate(date) {
    let dateElements = date.split("/");
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    console.log(dateElements);
    let monthNumber = dateElements[0];
    let day = dateElements[1];
    let year = dateElements[2];
    let monthName = months.find((e, index) => index === monthNumber - 1);

    let output = `${monthName} ${day}, ${year}`;

    return output;
  }
});
