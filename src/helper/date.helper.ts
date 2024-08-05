export function formatDate(date: any = "1998-11-29") {
    const d = new Date(date)

    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
