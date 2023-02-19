import React from "react";
import { Counter } from "./Counter";
import { Customer } from "./Customer";
import { clerk } from "./CustomerView";
import { handleTicket, updateCounter } from "./RequestFunctions";
interface Props {
	num: number;
	setPage: (page: string) => void;
	counters: Counter[];
	setCounters: (counters: Counter[]) => void;
	customers: Customer[];
	setCustomers: (customers: Customer[]) => void;
}

const CounterView: React.FC<Props> = ({
	num,
	setPage,
	counters,
	setCounters,
	customers,
	setCustomers,
}) => {
	return (
		<div className="App">
			<header className="App-header">
				<div className="card" style={{ width: "80%" }}>
					<h1>Counter {num}</h1>
					<img className="card-image" src={clerk[num - 1]} alt="" />
					<h2>Clerk's Name: {counters[num - 1].name}</h2>
					<h3 className={"card-header"}>
						Now Serving:{" "}
						{counters[num - 1].status
							? counters[num - 1].current
							: "ready to serve"}
					</h3>
					<button
						onClick={() =>
							updateCounter(num, {
								online: !counters[num - 1].online,
							})
						}
					>
						{counters[num - 1].online ? "Go Offline" : "Go Online"}
					</button>
					<button
						onClick={() =>
							updateCounter(num, {
								...counters[num - 1],
								status: false,
							})
						}
						disabled={!counters[num - 1].status || !counters[num - 1].online}
					>
						Complete Current
					</button>
					<button
						onClick={() =>
							handleTicket(
								false,
								customers,
								setCustomers,
								num,
								counters,
								setCounters
							)
						}
						disabled={counters[num - 1].status || !counters[num - 1].online}
					>
						Call Next
					</button>
					<div className="history">
						History:{" "}
						{counters[num - 1].history.length === 0
							? "Didn't serve anyone yet."
							: counters[num - 1].history.map((x, i) => <div key={i}>{x}</div>)}
					</div>
				</div>
				<button onClick={() => setPage("")}>Home Page</button>
			</header>
		</div>
	);
};

export default CounterView;
