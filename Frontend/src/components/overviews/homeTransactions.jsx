import styles from './overview.module.css'
import SubHeader from './subheader'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

defaults.responsive = true
defaults.maintainAspectRatio = true

function TransactionOverview() {
	const chartData = {
		label: "Yearly Expenses",
		data: [450, 520, 480, 600, 530, 600, 550, 580, 620, 590, 480], // Total for each month (January to December)
		backgroundColor: [
			"rgb(255, 99, 132)",  // January - Red-ish
			"rgb(54, 162, 235)",  // February - Blue
			"rgb(75, 192, 192)",  // March - Teal
			"rgb(255, 206, 86)",  // April - Yellow
			"rgb(153, 102, 255)", // May - Purple
			"rgb(255, 159, 64)",  // June - Orange
			"rgb(201, 203, 207)", // July - Gray
			"rgb(255, 99, 71)",   // August - Tomato Red
			"rgb(144, 238, 144)", // September - Light Green
			"rgb(100, 149, 237)", // October - Cornflower Blue
			"rgb(220, 20, 60)",   // November - Crimson
		],
		borderColor: [
			"rgb(220, 90, 120)",  // January - Slightly darker
			"rgb(50, 150, 220)",  // February - Slightly darker
			"rgb(70, 180, 180)",  // March - Slightly darker
			"rgb(240, 190, 70)",  // April - Slightly darker
			"rgb(140, 90, 240)",  // May - Slightly darker
			"rgb(240, 140, 50)",  // June - Slightly darker
			"rgb(180, 180, 180)", // July - Slightly darker
			"rgb(240, 90, 60)",   // August - Slightly darker
			"rgb(120, 220, 120)", // September - Slightly darker
			"rgb(90, 130, 220)",  // October - Slightly darker
			"rgb(200, 0, 50)",    // November - Slightly darkeraa
		],
		borderWidth: 2,
	};

	const newChartData = {
		label: "Yearly Purchases",
		data: [520, 480, 510, 530, 560, 610, 590, 640, 600, 620, 550], // Total for each month (January to December)
		backgroundColor: [
			"rgb(244, 67, 54)",    // January - Red
			"rgb(33, 150, 243)",   // February - Bright Blue
			"rgb(0, 188, 212)",    // March - Cyan
			"rgb(255, 193, 7)",    // April - Amber
			"rgb(156, 39, 176)",   // May - Deep Purple
			"rgb(76, 175, 80)",    // June - Green
			"rgb(121, 85, 72)",    // July - Brown
			"rgb(255, 87, 34)",    // August - Deep Orange
			"rgb(139, 195, 74)",   // September - Light Green
			"rgb(63, 81, 181)",    // October - Indigo
			"rgb(233, 30, 99)",    // November - Pink
		],
		borderColor: [
			"rgb(220, 60, 50)",    // January - Slightly darker
			"rgb(30, 140, 230)",   // February - Slightly darker
			"rgb(0, 170, 190)",    // March - Slightly darker
			"rgb(240, 180, 0)",    // April - Slightly darker
			"rgb(140, 30, 160)",   // May - Slightly darker
			"rgb(60, 160, 70)",    // June - Slightly darker
			"rgb(110, 75, 60)",    // July - Slightly darker
			"rgb(240, 75, 30)",    // August - Slightly darker
			"rgb(120, 180, 60)",   // September - Slightly darker
			"rgb(50, 70, 170)",    // October - Slightly darker
			"rgb(210, 20, 80)",    // November - Slightly darker
		],
		borderWidth: 2,
	};

	return (
		<section className={styles.transactionSection}>
			<div className={styles.subSection}>
				<SubHeader text="Total Expenses" subText="as of 2024" />
				<section className={styles.sectionChart}>

					
					<Line
						data={{
							labels: [
								"January", "February", "March", "April", "May", "June",
								"July", "August", "September", "October", "November"
							],
							datasets: [chartData]
						}}

					/>
				</section>
			</div>

			<div className={styles.subSection}>
				<SubHeader text="Total Purchases" subText="as of 2024" />

				<section className={styles.sectionChart}>
					<Line
						data={{
							labels: [
								"January", "February", "March", "April", "May", "June",
								"July", "August", "September", "October", "November"
							],
							datasets: [newChartData]
						}}

					/>
				</section>
			</div>

		</section>
	)


}

export default TransactionOverview;