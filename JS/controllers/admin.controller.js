function getAdminStatus(user) {
	return user.isActive ? "Aktiv" : "Deaktivert";
}

function getFilteredAdminUsers() {
	const searchEl = document.getElementById("search");
	const roleEl = document.getElementById("filterRole");
	const statusEl = document.getElementById("filterStatus");

	const query = (searchEl?.value ?? "").trim().toLowerCase();
	const selectedRole = roleEl?.value ?? "";
	const selectedStatus = statusEl?.value ?? "";

	return model.users.filter(user => {
		const matchesQuery = !query
			|| user.userName.toLowerCase().includes(query)
			|| user.emailAddress.toLowerCase().includes(query)
			|| user.id.toLowerCase().includes(query);

		const roleLabel = user.role === "Free" ? "Gratis" : user.role;
		const statusLabel = getAdminStatus(user);

		const matchesRole = !selectedRole || selectedRole === roleLabel;
		const matchesStatus = !selectedStatus || selectedStatus === statusLabel;

		return matchesQuery && matchesRole && matchesStatus;
	});
}

function renderAdminStats() {
	const totalUsersEl = document.getElementById("totalUsers");
	const activeUsersEl = document.getElementById("activeUsers");
	const premiumUsersEl = document.getElementById("premiumUsers");
	const totalListsEl = document.getElementById("totalLists");

	if (!totalUsersEl || !activeUsersEl || !premiumUsersEl || !totalListsEl) return;

	totalUsersEl.textContent = String(model.users.length);
	activeUsersEl.textContent = String(model.users.filter(user => user.isActive).length);
	premiumUsersEl.textContent = String(model.users.filter(user => user.role === "Premium").length);
	totalListsEl.textContent = String(model.lists.length);
}

function renderAdminUsersTable() {
	const tbody = document.querySelector("#usersTable tbody");
	if (!tbody) return;

	const users = getFilteredAdminUsers();
	tbody.innerHTML = users.map(user => {
		const roleLabel = user.role === "Free" ? "Gratis" : user.role;
		const statusLabel = getAdminStatus(user);
		const statusClass = user.isActive ? "status-pill status-pill--active" : "status-pill status-pill--inactive";
		const actionLabel = user.isActive ? "Deaktiver" : "Aktiver";
		const actionClass = user.isActive ? "admin-action-btn admin-action-btn--deactivate" : "admin-action-btn admin-action-btn--activate";
		const roleActionLabel = user.role === "Free" ? "Sett Premium" : "Sett Gratis";
		const roleActionClass = user.role === "Free"
			? "admin-action-btn admin-action-btn--promote"
			: "admin-action-btn admin-action-btn--demote";
		const canChangeRole = user.role !== "Admin";
		return `
			<tr>
				<td>${user.id}</td>
				<td>${user.userName}</td>
				<td>${user.emailAddress}</td>
				<td>${roleLabel}</td>
				<td>${user.lists}</td>
				<td><span class="${statusClass}">${statusLabel}</span></td>
				<td>
					<div class="admin-actions-group">
						<button type="button" class="${actionClass}" onclick="toggleUserStatus('${user.id}')">${actionLabel}</button>
						${canChangeRole
							? `<button type="button" class="${roleActionClass}" onclick="toggleUserPremium('${user.id}')">${roleActionLabel}</button>`
							: '<span class="admin-action-locked">Låst</span>'}
					</div>
				</td>
			</tr>
		`;
	}).join("");
}

function toggleUserStatus(userId) {
	const user = model.users.find(currentUser => currentUser.id === userId);
	if (!user) return;

	if (model.app.currentUser?.id === userId) {
		alert("Du kan ikke endre status på din egen bruker.");
		return;
	}

	user.isActive = !user.isActive;
	renderAdminStats();
	renderAdminUsersTable();
}

function toggleUserPremium(userId) {
	const user = model.users.find(currentUser => currentUser.id === userId);
	if (!user) return;

	if (user.role === "Admin") {
		alert("Admin-rolle kan ikke endres her.");
		return;
	}

	user.role = user.role === "Premium" ? "Free" : "Premium";
	renderAdminStats();
	renderAdminUsersTable();
}

function bindAdminEvents() {
	const searchEl = document.getElementById("search");
	const roleEl = document.getElementById("filterRole");
	const statusEl = document.getElementById("filterStatus");
	const logoutBtn = document.getElementById("logoutBtn");
	const modal = document.getElementById("modal");
	const cancelBtn = document.getElementById("cancel");
	const saveBtn = document.getElementById("save");

	const rerenderTable = () => renderAdminUsersTable();

	searchEl?.addEventListener("input", rerenderTable);
	roleEl?.addEventListener("change", rerenderTable);
	statusEl?.addEventListener("change", rerenderTable);

	logoutBtn?.addEventListener("click", () => {
		if (!modal) {
			logout();
			return;
		}
		modal.style.display = "block";
	});

	cancelBtn?.addEventListener("click", () => {
		if (modal) modal.style.display = "none";
	});

	saveBtn?.addEventListener("click", () => {
		if (modal) modal.style.display = "none";
		logout();
	});
}

function initAdminPage() {
	renderAdminStats();
	renderAdminUsersTable();
	bindAdminEvents();
}
