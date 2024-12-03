
function FilterRecords({data, searchTerm}){
	// console.log("Data", data)
	if (!data) {
		console.log("Shit Went Down")
		return []
	}
	const filteredRecord = data.filter(record => {
		const recordId = record.recordId.toString();
		const recordName = record.recordName.toLowerCase();
		const accessType = record.recordPermissions[0].userAccess.accessType.toLowerCase();
		const search = searchTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});
    return filteredData;
}

export default FilterRecords