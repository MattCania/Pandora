import loading from '/src/assets/loading.svg'

function Loading(){

	const style = {
		display: "flex",
		position: "fixed",
		justifyContent: "center",
		alignItems: "center",
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		backdropFilter: "blur(10px)",
		zIndex: "1"
	}

	return (
		<section style={style}>
			<img src={loading} alt="" />
		</section>
	)

}

export default Loading