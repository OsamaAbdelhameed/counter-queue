import React, { useEffect, useState } from "react";
import CounterView from "./CounterView";
import CustomerView from "./CustomerView";
import { Counter } from "./Counter";
import { Customer } from "./Customer";
import "./App.css";

const App: React.FC = () => {
	const [page, setPage] = useState("");
	const [counters, setCounters] = useState<Counter[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);

	async function fetchData() {
		fetch("http://localhost:9090/counter/get")
			.then((response) => response.json())
			.then((data) => {
				setCounters(data.Counters);
			})
			.catch((error) => console.error(error));

		fetch("http://localhost:9090/customer/get")
			.then((response) => response.json())
			.then((data) => {
				setCustomers(data.customers);
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		fetchData();

		const socket = new WebSocket("ws://localhost:8080");
		socket.addEventListener("message", (event) => {
			let newData = JSON.parse(event.data);
			if (newData.ns.coll === "counters") {
				counters.forEach((x, i) => {
					if (x._id === newData.documentKey._id) {
						counters[i] = {
							...counters[i],
							...newData.updateDescription.updatedFields,
						};
						setCounters([...counters]);
					}
				});
			} else if (newData.ns.coll === "customers") {
				customers.forEach((x, i) => {
					if (x._id === newData.documentKey._id) {
						customers[i] = {
							...customers[i],
							...newData.updateDescription.updatedFields,
						};
						setCustomers([...customers]);
					}
				});
			}
		});

		return () => {
			socket.close();
		};
	}, []);

	if (page === "customer")
		return (
			<CustomerView
				customers={customers}
				setCustomers={setCustomers}
				counters={counters}
				setPage={setPage}
			/>
		);
	else if (parseInt(page, 10) >= 1)
		return (
			<CounterView
				num={parseInt(page, 10)}
				setPage={setPage}
				counters={counters}
				setCounters={setCounters}
				customers={customers}
				setCustomers={setCustomers}
			/>
		);
	else
		return (
			<div className="App">
				<header className="App-header">
					<div>
						<button onClick={() => setPage("1")}>Counter 1</button>
						<button onClick={() => setPage("2")}>Counter 2</button>
						<button onClick={() => setPage("3")}>Counter 3</button>
						<button onClick={() => setPage("4")}>Counter 4</button>
					</div>
					<button onClick={() => setPage("customer")}>Customer Screen</button>
				</header>
			</div>
		);
};

export default App;
