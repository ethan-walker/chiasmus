const chiasList = [
	"01:10",
	"02:20",
	"03:30",
	"04:40",
	"05:50",
	"10:01",
	"12:21",
	"13:31",
	"14:41",
	"15:51",
	"20:02",
	"21:12",
	"23:32"
]
const timeUl = document.querySelector("ul");
const main = document.querySelector("main");

var totalMinutes = time => (time.getHours() * 3600) + (time.getMinutes() * 60) + time.getSeconds();
var stringTotalMinutes = str => parseInt(str.split(":")[0]) * 3600 + parseInt(str.split(":")[1]) * 60

function checkTime() {
	var now = new Date();
	
	var next = chiasList.reduce((prev, curr) => {
		if (stringTotalMinutes(prev) > totalMinutes(now)) {
			return prev;
		}
		else {
			return curr;
		}
	})
	var nextIndex = chiasList.indexOf(next);

	var previous = chiasList[nextIndex - 1];
	
	var minuteGap = stringTotalMinutes(next) - stringTotalMinutes(previous);
	var minutesSinceLast = totalMinutes(now) - stringTotalMinutes(previous);

	var progress = minutesSinceLast / minuteGap;
	
	timeUl.style.setProperty("--next-index", nextIndex);
	main.style.setProperty("--progress", progress);
	timeUl.children[nextIndex].classList.add("next");
	
	setTimeout(checkTime, 1000);
}
checkTime();