export { ChangeDateFormat }

function ChangeDateFormat(dateTimeUTC){

    const date = new Date(dateTimeUTC);

    // Funzione per aggiungere uno zero davanti ai numeri minori di 10
    const pad = (num) => num.toString().padStart(2,'0')
    const day = pad(date.getDate());
    const month = pad(date.getMonth()+1); // gli anni in js vanno da 0 a 11
    const year = date.getFullYear().toString();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}