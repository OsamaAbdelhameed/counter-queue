import { Counter } from "./Counter";
import { Customer } from "./Customer";

export async function handleTicket(
	add: Boolean,
	customers: Customer[],
	setCustomers: (customers: Customer[]) => void,
	clerkNum?: number,
	counters?: Counter[],
	setCounters?: (counters: Counter[]) => void
) {
	try {
		let body = {};
		let counterBody = {};
		let num = clerkNum ? clerkNum - 1 : 0;

		if (add) {
			let n = customers[0].lastIssued + 1;
			console.log(typeof customers[0].queue);
			console.log(typeof customers[0].inProgress);
			customers[0].queue.push(n);

			body = {
				lastIssued: n,
				queue: [...customers[0].queue],
			};
		} else {
			console.log(customers[0].queue);
			let n = customers[0].queue.shift() || 0;
			console.log(customers[0].queue);
			customers[0].inProgress[num] = n;

			body = {
				queue: customers[0].queue,
				inProgress: customers[0].inProgress,
			};

			if (counters && setCounters) {
				counters[num].history.push(counters[num].current);
				counterBody = {
					current: n,
					status: true,
					history: counters[num].history,
				};
				console.log(counters[num]);
			}
		}
		customers[0] = { ...customers[0], ...body };
		setCustomers([...customers]);

		const response = await fetch("http://localhost:9090/customer/update/1", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((data) => {
			if (!add && counters) {
				updateCounter(clerkNum || 0, counterBody);
			}
			return data;
		});

		console.log(response);
	} catch (err) {
		console.log(err);
	}
}

export async function updateCounter(clerkNum: number, counterBody: {}) {
	try {
		const response = await fetch(
			"http://localhost:9090/counter/update/" + clerkNum,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(counterBody),
			}
		).then((data) => {
			console.log(data);
		});
	} catch (err) {
		console.log(err);
	}
}
