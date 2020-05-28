import React, { useState, useEffect } from "react";
import "./style.scss";
import soal from "./Soal";

const loading = [
	"*ontol",
	"k*ntol",
	"ko*tol",
	"kon*ol",
	"kont*l",
	"konto*",
	"**ntol",
	"*o*tol",
	"*on*ol",
	"*ont*l",
	"*onto*",
	"k**tol",
	"k*n*ol",
	"k*nt*l",
	"k*nto*",
	"ko**ol",
	"ko*t*l",
	"ko*to*",
	"kon**l",
	"kon*o*",
	"kont**",
];

const App = (props) => {
	const [answer, setAnswer] = useState("");
	const [nomorSoal, setNomorSoal] = useState(0);
	const [correct, setCorrect] = useState(false);
	const showSoal = soal[nomorSoal];
	useEffect(() => {
		if (answer === showSoal.answer) {
			setCorrect(true);
			setAnswer("");
			setTimeout(() => {
				setNomorSoal((prevState) => prevState + 1);
				setCorrect(false);
			}, 3000);
		}
	}, [answer]);
	return (
		<div className={`wrapper ${nomorSoal >= soal.length ? "ending" : ""}`}>
			{nomorSoal >= soal.length ? (
				<div id="ending">
					<h1>YOU DID IT! GOODJOB.</h1>
					<p>
						made with 😍 by{" "}
						<a href="https://github.com/dimasriat">
							dimasriat
						</a>
					</p>
				</div>
			) : (
				<>
					<h1 className={correct ? "correct" : ""}>
						{correct
							? `${showSoal.answer}.`
							: `${showSoal.pattern}?`}
					</h1>
					<p>{showSoal.question}</p>
					<div className={`hideman ${correct ? "hide" : ""}`}>
						<input
							type="text"
							value={answer}
							onChange={(e) =>
								setAnswer(e.target.value.toLowerCase())
							}
							placeholder="tulis jawaban di sini..."
						/>
					</div>
					<nav>
						made with 😍 by{" "}
						<a href="https://github.com/dimasriat">
							dimasriat
						</a>
					</nav>
				</>
			)}
		</div>
	);
};
export default App;
