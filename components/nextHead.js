import React from "react";
import Head from "next/head";

const NextHead = ({ title, description }) => (
	<Head>
		<title>{title || ""}</title>
		<meta key="description" name="description" content={description || ""} />
	</Head>
);

export default NextHead;
