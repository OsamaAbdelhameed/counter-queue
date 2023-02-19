import React from "react";
import { Counter } from "./Counter";
import { Customer } from "./Customer";
import { handleTicket } from "./RequestFunctions";
import clerk1 from "./img/clerk1.jpg";
import clerk2 from "./img/clerk2.jpg";
import clerk3 from "./img/clerk3.jpg";
import clerk4 from "./img/clerk4.jpg";

export const clerk: string[] = [clerk1, clerk2, clerk3, clerk4];

interface Props {
	customers: Customer[];
	setCustomers: (customers: Customer[]) => void;
	counters: Counter[];
	setPage: (page: string) => void;
}

const CounterCard: React.FC<{ key: Number; counter: Counter }> = ({
	key,
	counter,
}) => {
	return (
		<div className={"card"}>
			<div className={counter.online ? "green-status" : "red-status"}></div>
			<h3 className={"card-content"}>Counter Number: {counter.num}</h3>
			<img className="card-image" src={clerk[counter.num - 1]} alt="" />
			<h3 className={"card-header"}>Clerk Name: {counter.name}</h3>
			<div className={counter.status ? "busy" : "available"}>
				{counter.status ? "Busy" : "Available"}
			</div>
			<h3 className={"card-header"}>
				Now Serving:{" "}
				{!counter.online
					? "Offline"
					: counter.status
					? counter.current
					: "ready to serve"}
			</h3>
			<div className="history">
				History:{" "}
				{counter.history.length === 0
					? "Didn't serve anyone yet."
					: counter.history.map((x, i) => <div key={i}>{x}</div>)}
			</div>
		</div>
	);
};

const CustomerView: React.FC<Props> = ({
	customers,
	setCustomers,
	counters,
	setPage,
}) => {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Customer Screen</h1>
				<div className="maincard">
					<h2>Last Number</h2>
					<div className="num">{customers[0].lastIssued}</div>
					<div className="history" style={{ display: "inline" }}>
						Next Clients in the queue:{" "}
						{customers[0].queue.length <= 0
							? "Didn't have customers yet."
							: customers[0].queue.map((x, i) =>
									i < 4 ? <div key={i}>{x}</div> : ""
							  )}
					</div>
					<button onClick={() => handleTicket(true, customers, setCustomers)}>
						Take a Ticket
					</button>
				</div>
				<div className="card-container">
					{counters.map((counter, index) => (
						<CounterCard key={index} counter={counter} />
					))}
				</div>
				<button onClick={() => setPage("")}>Home Page</button>
			</header>
		</div>
	);
};

export default CustomerView;
