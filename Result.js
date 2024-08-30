document.addEventListener("DOMContentLoaded", () => {
  const previewContent = document.getElementById("previewContent");

  // Handle form submission to fetch marksheet data
  resultsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(resultsForm);
    const registrationNumber = formData.get("registration_number");
    const rollNumber = formData.get("rollNumber");

    try {
      const response = await fetch(
        `https://api.sjuniversity.in/api/v1/getMarksheetByStudent/${rollNumber}/${registrationNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        if (
          data.data.registration_number === registrationNumber &&
          data.data.roll_number === rollNumber
        ) {
          populatePreview(data.data);
          previewContent.dataset.data = JSON.stringify(data.data);
        } else {
          console.error("Registration number or Roll number does not match.");
        }
      } else {
        console.error("Failed to fetch marksheet data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Populate the preview section with fetched data
  function populatePreview(data) {
    let subjectsHTML = "";
    let totalMarksObtained = 0;
    let maxMarks = 0;

    data.subjects.forEach((subject) => {
      totalMarksObtained += subject.total_number;
      maxMarks += subject.max_number;
      subjectsHTML += `
        <tr>
            <td>${subject.code}</td>
            <td>${subject.subject_details}</td>
            <td>${subject.year}</td>
            <td>${subject.session}</td>
            <td>${subject.max_number}</td>
            <td>${subject.total_number}</td>
        </tr>
      `;
    });

    const percentage = ((totalMarksObtained / maxMarks) * 100).toFixed(2);
    const grade = calculateGrade(percentage);

    previewContent.innerHTML = `
      <div>
        <h2>${data.universityName}</h2>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Student Name:</strong> ${data.student_name}</p>
              <p><strong>Registration Number:</strong> ${data.registration_number}</p>        
               <p><strong>Programme:</strong> ${data.programme}</p>
              <p><strong>Passing Criteria:</strong> ${data.passing_criteria}</p>
                <p><strong>Marksheet Code:</strong> ${data.marksheet_code}</p>
            </div>
            <div class="col-md-6">
            <div class="Studentpic">
              <p><strong>Student Picture:</strong></p>
              <img src="${data.student_pic.picPath}${data.student_pic.picName}" alt="Student Picture" width="100">
              </div>
             <p><strong>Roll Number:</strong> ${data.roll_number}</p>
               <p><strong>Date of Issue:</strong> ${data.date_of_issue}</p>             
              <p><strong>Passing Description:</strong> ${data.passing_description}</p>
               <p><strong>Marksheet Description:</strong> ${data.marksheet_description}</p>
            
             
            </div>
          </div>
        </div>
        <h3>Subjects:</h3>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Details</th>
              <th>Year</th>
              <th>Session</th>
              <th>Max Number</th>
              <th>Total Number</th>
            </tr>
          </thead>
          <tbody>
            ${subjectsHTML}
          </tbody>
        </table>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Total Marks:</strong> ${totalMarksObtained}</p>
              <p><strong>Grade:</strong> ${grade}</p>             
            </div>
            <div class="col-md-6">
               <p><strong>Max Marks:</strong> ${maxMarks}</p>
              <p><strong>Percentage:</strong> ${percentage}%</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Calculate grade based on percentage
  function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  }

  // Handle PDF generation
  function generatePdf(data) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    let subjectsHTML = "";
    let totalMarksObtained = 0;
    let maxMarks = 0;

    data.subjects.forEach((subject) => {
      totalMarksObtained += subject.total_number;
      maxMarks += subject.max_number;
      subjectsHTML += `
        <tr>
            <td>${subject.code}</td>
            <td>${subject.subject_details}</td>
            <td>${subject.year}</td>
            <td>${subject.session}</td>
            <td>${subject.max_number}</td>
            <td>${subject.total_number}</td>
        </tr>
      `;
    });

    const percentage = ((totalMarksObtained / maxMarks) * 100).toFixed(2);
    const grade = calculateGrade(percentage);

    const content = `
      <div>
        <h2>${data.universityName}</h2>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Student Name:</strong> ${data.student_name}</p>
              <p><strong>Registration Number:</strong> ${data.registration_number}</p>        
               <p><strong>Programme:</strong> ${data.programme}</p>
              <p><strong>Passing Criteria:</strong> ${data.passing_criteria}</p>
                <p><strong>Marksheet Code:</strong> ${data.marksheet_code}</p>
            </div>
            <div class="col-md-6">
            <div class="Studentpic">
              <p><strong>Student Picture:</strong></p>
              <img src="${data.student_pic.picPath}${data.student_pic.picName}" alt="Student Picture" width="100">
              </div>
             <p><strong>Roll Number:</strong> ${data.roll_number}</p>
               <p><strong>Date of Issue:</strong> ${data.date_of_issue}</p>             
              <p><strong>Passing Description:</strong> ${data.passing_description}</p>
               <p><strong>Marksheet Description:</strong> ${data.marksheet_description}</p>
            
             
            </div>
          </div>
        </div>
        <h3>Subjects:</h3>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Details</th>
              <th>Year</th>
              <th>Session</th>
              <th>Max Mark</th>
              <th>Total Mark</th>
            </tr>
          </thead>
          <tbody>
            ${subjectsHTML}
          </tbody>
        </table>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Total Marks:</strong> ${totalMarksObtained}</p>
              <p><strong>Grade:</strong> ${grade}</p>             
            </div>
            <div class="col-md-6">
               <p><strong>Max Marks:</strong> ${maxMarks}</p>
              <p><strong>Percentage:</strong> ${percentage}%</p>
            </div>
          </div>
        </div>
      </div>
    `;

    pdf.html(content, {
      callback: function (pdf) {
        pdf.save("Marksheet.pdf");
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 2 },
    });
  }

  generatePdfBtn.addEventListener("click", () => {
    const data = JSON.parse(previewContent.dataset.data);
    generatePdf(data);
  });

  // Handle Print and create PDF on Print Button click
  printBtn.addEventListener("click", () => {
    const data = JSON.parse(previewContent.dataset.data);
    generatePdf(data); // Generate PDF and automatically trigger the download
  });
});
