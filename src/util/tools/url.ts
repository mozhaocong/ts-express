export function getUrlPathSearch(): { path: string; pathSearch: string; search: string } {
	const path = location.pathname
	const search = location.search
	return { pathSearch: path + search, path, search }
}
