const reserved = new Map([
	//a
	["ada", "ad"],
	["adalah", "itu"],
	["aku", "ak"],
	["apa", "ap"],
	["aja", "aj"],
	["atau", "/"],
	//b
	["banget", "bget"],
	["bang", "bg"],
	//c
	["capek", "cpe"],
	["cantik", "cngtip"],
	//d
	["dah", "dh"],
	["dan", "n"],
	["deh", "dh"],
	["dengan", "dg"],
	//f
	["foto", "poto"],
	//g
	["ganteng", "gmntenk"],
	//h
	["halo", "hlo"],
	//i
	["ini", "ni"],
	["iya", "iy"],
	//j
	["jadi", "jd"],
	["jangan", "jgn"],
	//k
	["kamu", "km"],
	["kalau", "klo"],
	["kangen", "kgen"],
	//l
	["lagi", "lg"],
	//m
	["mbak", "mb"],
	//n
	["nggak", "nga"],
	//o
	["orang", "org"],
	//p
	["pagi", "pgii"],
	["polisi", "pulisi"],
	["pak", "p"],
	["padahal", "pdhl"],
	//s
	["siapa", "spa"],
	["sedang", "lg"],
	["selamat", "met"],
	["seperti", "spt"],
	["setuju", "s7"],
	//t
	["tapi", "tp"],
	["tidak", "tdk"],
	["tidur", "bbo"],
	//u
	["untuk", "utk"],
	//w
	["willy", "willy"],
	//y
	["ya", "y"],
	["yaudah", "ywdh"],
	["yang", "yg"],
]);

const penutup = [
	"[aww mlu bget]",
	"[mcium kning]",
	"[mnepuk pundak]",
	"[mrasa sedih]",
	"[mnagis]",
	"[mmukuli pgemis]",
	"dik",
	"hyung",
	"[mracik narkoba]",
	"[brungku brdiri]",
	"[mgelus pnggung]",
	"[kget]",
];

const vokal = (chr) => {
	return ["a", "i", "u", "e", "o"].includes(chr.toLowerCase());
};

const symbol = (chr) => {
	return [".", ",", "?", "!", "-", ";", "(", ")"].includes(chr);
};

const willy = (text) => {
	/* variabel yang akan dipakai */
	const elements = [];
	/* memisahkan kata dan tipenya*/
	let counting = false,
		cutStart = 0,
		wordCount = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] == " ") {
			/*ketemu karakter spasi*/
			if (counting == true) {
				counting = false;
				const el = {
					order: ++wordCount,
					ori: text.slice(cutStart, i).toLowerCase(),
					type: "",
					res: "",
				};
				el.type =
					el.ori.toUpperCase() !== el.ori.toLowerCase()
						? "word"
						: "number";
				elements.push(el);
			}
		} else if (text[i] == "\n") {
			/* ketemu karakter newline */
			counting = false;
			if (
				text[i - 1] != " " &&
				text[i - 1] != "\n" &&
				symbol(text[i - 1]) == false
			) {
				const el = {
					order: ++wordCount,
					ori: text.slice(cutStart, i).toLowerCase(),
					type: "",
					res: "",
				};
				el.type =
					el.ori.toUpperCase() !== el.ori.toLowerCase()
						? "word"
						: "number";
				elements.push(el);
			}
			const sy = {
				order: ++wordCount,
				ori: text[i],
				type: "newline",
				res: "",
			};
			elements.push(sy);
		} else if (symbol(text[i])) {
			/*ketemu karakter simbol*/
			if (text[i - 1] == " ") {
				const sy = {
					order: ++wordCount,
					ori: text[i],
					type: "symbol",
					res: "",
				};
				elements.push(sy);
			} else {
				if (counting == true) {
					counting = false;
					const el = {
						order: ++wordCount,
						ori: text.slice(cutStart, i).toLowerCase(),
						type: "",
						res: "",
					};
					el.type =
						el.ori.toUpperCase() !== el.ori.toLowerCase()
							? "word"
							: "number";
					const sy = {
						order: ++wordCount,
						ori: text[i],
						type: "symbol",
						res: "",
					};
					elements.push(el);
					elements.push(sy);
				}
			}
		} else {
			/*ketemu huruf / angka*/
			if (counting == false) {
				counting = true;
				cutStart = i;
			}
		}
	}
	/* memodifikasi kata */
	let syCount = 0;
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].type === "word") {
			/* kata adalah huruf */
			if (reserved.has(elements[i].ori)) {
				elements[i].res = reserved.get(elements[i].ori);
			} else {
				if (elements[i].ori.length > 4) {
					if (vokal(elements[i].ori[1])) {
						if (!vokal(elements[i].ori[2])) {
							elements[i].res =
								elements[i].ori.slice(0, 1) +
								elements[i].ori.slice(2);
						} else {
							elements[i].res = elements[i].ori;
						}
					} else {
						elements[i].res = elements[i].ori;
					}
				} else {
					elements[i].res = elements[i].ori;
				}
			}
		} else if (symbol(elements[i].ori)) {
			//jika simbol
			if (elements[i].ori === "(") {
				elements[i].res = "[";
			} else if (elements[i].ori === ")") {
				elements[i].res = "]";
			} else if (elements[i].ori === "?") {
				elements[i].res = "???";
			} else if (elements[i].ori === "-") {
				elements[i].res = "-";
			} else if (i === elements.length - 1 || ++syCount % 4 == 0) {
				elements[i].res = penutup[elements[i].order % penutup.length];
			} else {
				elements[i].res = ",,,";
			}
		} else if (elements[i].type === "newline") {
			elements[i].res = "\n";
		} else {
			elements[i].res = elements[i].ori;
		}
	}
	/* Memodifikasi Spasi */
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].type === "word") {
			elements[i].space = true;
		} else if (elements[i].type === "symbol") {
			if (
				elements[i].res === ",,," ||
				elements[i].ori === "-" ||
				elements[i].res === "newline"
			) {
				elements[i].space = false;
				elements[i - 1].space = false;
			} else if (elements[i].res === "[") {
				elements[i].space = false;
			} else if (elements[i].ori === "?" || elements[i].res === "]") {
				elements[i].space = true;
				elements[i - 1].space = false;
			} else {
				elements[i].space = true;
			}
		} else if (elements[i].type === "number") {
			elements[i].space = false;
		} else {
			elements[i].space = true;
		}
		/* memodifikasi repetisi */
		if (i > 1) {
			if (elements[i - 1].ori === "-") {
				if (
					elements[i].ori.slice(0, elements[i - 2].ori.length) ===
					elements[i - 2].ori
				) {
					elements[i - 2].res = elements[i - 2].ori;
					elements[i - 1].res = "2";
					elements[i].res = elements[i].ori.slice(
						elements[i - 2].ori.length,
						elements[i].ori.length
					);
				} else if (
					elements[i].ori.slice(0, elements[i - 2].ori.length - 2) ===
					elements[i - 2].ori.slice(2)
				) {
					elements[i - 2].res = elements[i - 2].res;
					elements[i - 1].res = "2";
					elements[i].res = elements[i].ori.slice(
						elements[i - 2].ori.length - 2,
						elements[i].ori.length
					);
				}
			}
		}
	}
	return elements;
};
export default willy;
