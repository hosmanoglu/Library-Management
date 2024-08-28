module.exports = {
	development: {
		username: process.env.PG_USER ?? "postgres",
		password: process.env.PG_PASS ?? "postgres",
		database: process.env.PG_DATABASE ?? "postgres",
		host: process.env.PG_HOST ?? "localhost",
		port: process.env.PG_PORT ?? 5432,
		dialect: "postgres",
		protocol: "postgres",
		define: {
			underscored: true,
			timestamps: true,
		},
	},
};
