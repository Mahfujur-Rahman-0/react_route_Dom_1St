import { useEffect } from "react";
import {
	Form,
	NavLink,
	Outlet,
	replace,
	useLoaderData,
	useNavigation,
	useSubmit,
} from "react-router-dom";

export default function Root() {
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	useEffect(() => {
		document.getElementById("q").value = q;
	}, [q]);
	const submit = useSubmit();
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");
	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							className={searching ? "loading" : ""}
							defaultValue={q}
							onChange={(e) => {
								const isfirstSearch = q == null;
								submit(e.currentTarget.form, { replace: !isfirstSearch });
							}}
						/>
						<div id="search-spinner" aria-hidden hidden={!searching} />
						<div id="search-spinner" aria-hidden hidden={true} />
						<div className="sr-only" aria-live="polite"></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? "active" : isPending ? "pending" : ""
										}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id="detail"
				className={navigation.state === "loading" ? "loading" : ""}
			>
				<Outlet />
			</div>
		</>
	);
}
