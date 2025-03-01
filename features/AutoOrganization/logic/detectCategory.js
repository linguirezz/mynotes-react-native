const detectCategory = (title, content) => {
    const projectMatch = title.match(/Proyek\s+(\w+)/i);
    if (projectMatch) return `Proyek ${projectMatch[1]}`;
  
    const workKeywords = ["meeting", "laporan", "deadline"];
    if (workKeywords.some(keyword => content.includes(keyword))) return "Work";
  
    return "Personal";
  };