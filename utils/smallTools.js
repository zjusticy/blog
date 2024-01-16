export function dateTrans(dateString) {
	const en_mon_arr = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Spt",
		"Oct",
		"Nov",
		"Dec",
	];

	const newString = dateString.split("-");

	const re = /(.*?)T/;

	const day = re.exec(newString[2]);

	return `${day[1]} ${en_mon_arr[parseInt(newString[1]) + 1]}, ${newString[0]}`;
}
