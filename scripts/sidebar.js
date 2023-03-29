window.addEventListener('load', async () => {
	const savedLinks = await chrome.storage.local.get(['teamworkLinks']);
	setTimeout(() => {
		const sidebarContent = document.querySelector('.v-navigation-drawer__content .v-list--nav');
	
		savedLinks.teamworkLinks.forEach(link => {
			let a = document.createElement('a')
			a.innerHTML = '<div class="v-list-item__prepend"><i class="mdi-view-dashboard-outline mdi v-icon notranslate v-theme--main" aria-hidden="true" style="font-size: 20px; height: 20px; width: 20px;"></i></div><div class="v-list-item__content" data-no-activator=""><div class="v-list-item-title">'+link.text+'</div></div>';
			a.setAttribute("href", link.url);
			a.classList.add("v-list-item");
			sidebarContent.appendChild(a);
		});
	}, 4000);
});
