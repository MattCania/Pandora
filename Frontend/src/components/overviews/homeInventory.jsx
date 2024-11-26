import SubHeader from "./subheader"
import styles from './overview.module.css'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

defaults.responsive = true
defaults.maintainAspectRatio = true 

function InventoryOverview(){
	return(
		<section className={styles.inventorySection}>
			<SubHeader text="Inventory Sales" subText="as of 2024"/>
			<section className={styles.sectionChart}>

					<Bar height={100}
						data={{
							labels: ["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10"],
							datasets: [
								{
									label: "Store 1",
									data: [10, 20, 15, 5, 25, 29, 50, 21, 5, 6],
									backgroundColor: "rgb(100, 150, 250)"
								},
								{
									label: "Store 2",
									data: [15, 10, 25, 61, 23, 9, 19, 31, 15, 26],
									backgroundColor: "rgb(250, 100, 100)"
								},
							]
						}}

					/>
				</section>
		</section>
	)

}

export default InventoryOverview