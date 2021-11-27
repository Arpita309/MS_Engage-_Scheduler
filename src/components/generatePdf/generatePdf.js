import jsPDF from "jspdf";
import "jspdf-autotable";



const generatePDF = (students,sub) => {
  
  const doc = new jsPDF();
  const tableColumn = ["Name", "Email", "Mode"];
  const tableRows = [];

  students.forEach(student => {
    const studentData = [
      student.name,
      student.email,
      student.mode
      
    ];
    
    tableRows.push(studentData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 47 });
 
  const dateStr = sub.subject+'_'+sub.date + '_' + sub.time;
  doc.text(`Subject : ${sub.subject}`, 14, 15);
  doc.text(`Teacher : ${sub.name}`, 14, 23);
  doc.text(`Email : ${sub.email}`, 14, 31);
  doc.text(`Date  : ${sub.date}     Time: ${sub.time}`, 14, 39);
  doc.save(`Schedule_${dateStr}.pdf`);
};

export default generatePDF;