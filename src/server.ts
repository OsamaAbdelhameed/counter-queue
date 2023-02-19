import express from "express";
import http from "http";
import mongoose from "mongoose";
import WebSocket from "ws";

import { config } from "./config/config";
import Logging from "./library/Logging";
import counterRoutes from "./routes/Counter";
import customerRoutes from "./routes/Customer";

const router = express();
const server = new WebSocket.Server({ port: 8080 });

mongoose
	.connect(config.mongo.url, { retryWrites: true, w: "majority" })
	.then(() => {
		Logging.info("connected to MongoDB");
		StartServer();
	})
	.catch((err) => {
		Logging.err("Unable to connect");
		Logging.err(err);
	});

/** Only start the server if its connected to mongo **/
const StartServer = () => {
	router.use((req, res, next) => {
		/** Log the Request */
		Logging.info(
			`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
		);

		res.on("finish", () => {
			/** Log the Response */
			Logging.info(
				`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
			);
		});

		next();
	});

	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	/** Rules of our API */
	router.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);

		if (req.method == "OPTIONS") {
			res.header(
				"Access-Control-Allow-Methods",
				"PUT, POST, PATCH, DELETE, GET"
			);
			return res.status(200).json({});
		}

		next();
	});

	/** Routes */
	router.use("/counter", counterRoutes);
	router.use("/customer", customerRoutes);

	// Watch the 'counters and customers' collection for changes
	const countersCollection = mongoose.connection.collection("counters");
	const countersCursor = countersCollection.watch();

	const customersCollection = mongoose.connection.collection("customers");
	const customersCursor = customersCollection.watch();

	server.on("connection", (socket: WebSocket) => {
		console.log("Client connected");

		// Send a welcome message to the client
		// socket.send("Welcome to the WebSocket server!");

		// Handle changes to the 'counters' collection
		countersCursor.on("change", (change) => {
			console.log("Change:", change);

			// Notify all connected clients of the change
			server.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(change));
				}
			});
		});

		// Handle changes to the 'customers' collection
		customersCursor.on("change", (change) => {
			console.log("Change:", change);

			// Notify all connected clients of the change
			server.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(change));
				}
			});
		});

		// Handle client disconnection
		socket.on("close", () => {
			console.log("Client disconnected");
		});
	});

	/** Healthcheck */
	router.get("/ping", (req, res, next) =>
		res.status(200).json({ message: "pong" })
	);

	/** Error Handling */
	router.use((req, res, next) => {
		const error = new Error("not found");
		Logging.err(error);

		return res.status(404).json({ message: error.message });
	});

	http
		.createServer(router)
		.listen(config.server.port, () =>
			Logging.info(`Server is running on port ${config.server.port}`)
		);
};
