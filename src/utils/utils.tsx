export function sortBy<T extends {}>(array: T[], getter: (a: T) => any) {
	array.sort((a, b) => {
		const a1 = getter(a);
		const b1 = getter(b);
		if (a1 > b1) {
			return 1;
		}
		if (b1 > a1) {
			return -1;
		}
		return 0;
	});
	return array;
}