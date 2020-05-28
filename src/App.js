import React, { useState, useEffect } from "react";
import "./style.scss";
import willy from "./willy";

const Menu = (props) => (
	<div id="greet">
		<h1>willytweet generator</h1>
		<span>
			{"</>"} with ❤ by{" "}
			<a href="http://github.com/dimasriat">dimasriat</a>
		</span>
		<br />
		<span>
			<a href="http://willy.dimskuy.xyz"> willy.dimskuy.xyz</a>
		</span>
	</div>
);

const OutputText = (props) => {
	let key = 0;
	return (
		<div>
			<div id="outputText">
				{props.text.split("\n").map((item) => (
					<span key={`${item}${++key}`}>
						{item}
						<br />
					</span>
				))}
			</div>
			<div id="note">
				<span>
					coba ktikkan ssuatu lalu akhiri dg tnda ttik / tnda baca / spasi
				</span>
				<span>
					{"</>"} with ❤ by{" "}
					<a href="http://github.com/dimasriat">dimasriat</a>
				</span>
			</div>
		</div>
	);
};

const App = (props) => {
	const [tweet, setTweet] = useState("");
	const [table, setTable] = useState([]);
	const [result, setResult] = useState("");
	//setting the result
	useEffect(() => {
		setResult("");
		table.forEach((row) => {
			setResult(
				(prevResult) => `${prevResult}${row.res}${row.space ? " " : ""}`
			);
		});
	}, [table]);
	//debugging
	useEffect(() => {
		console.clear();
		console.table(table);
	}, [result]);
	//render
	return (
		<div id="wrapper">
			<div id="output">
				{tweet ? <OutputText text={result} /> : <Menu />}
			</div>

			<div id="input">
				<textarea
					value={tweet}
					onChange={(e) => {
						setTweet(e.target.value);
						setTable(willy(e.target.value));
					}}
					placeholder="ktik di sini ya mniss..."
				/>
			</div>
		</div>
	);
};

export default App;
