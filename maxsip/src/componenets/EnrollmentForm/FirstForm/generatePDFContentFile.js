const generatePDFContent = (lines, fullName) => {
    let pdfContent = "";
  
    // Add the form text to the PDF
    lines.forEach((line) => {
      pdfContent += line.text + "\n\n";
    });
  
    // Add the signature text to the PDF
    pdfContent += "Signature:\n" + fullName;
  
    return pdfContent;
  };
  
  export default generatePDFContent;
  