export const uuid = function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export function timeToString(time = Date.now()) {
	const date = new Date(time);
	const todayUTC = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	return todayUTC.toISOString().split("T")[0];
}

function formatElapsedDays(days) {
	if (days === 0) {
		return "today";
	}
	if (days < 7) {
		return days.toString() + " ago";
	}
	if (days >= 7 && days < 14) {
		return "1w";
	}

	if (days >= 14 && days < 21) {
		return "2w";
	}

	if (days >= 21 && days < 28) {
		return "3w";
	}

	if (days >= 28 && days < 35) {
		return "4w";
	}

	if (days >= 35 && days < 42) {
		return "5w";
	}

	return "a while ago";
}

// input past date: "2020-07-23"
export function elapsedDays(past) {
	const pastDate = Date.parse(past);
	const millis = Date.now() - pastDate;

	const days = Math.floor(millis / (1000 * 60 * 60 * 24));

	return formatElapsedDays(days);
}
