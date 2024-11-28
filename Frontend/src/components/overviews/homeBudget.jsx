import SubHeader from "./subheader"
import styles from './overview.module.css'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

defaults.responsive = true
defaults.maintainAspectRatio = true 

function BudgetOverview() {
	return(
		<section className={styles.budgetSection}>
			<SubHeader text="Revenue" subText="as of 2024"/>
				<section className={styles.sectionChart}>

					<Doughnut
						data={{
							labels: ["Arson", "Guns", "Tax Fraudery", "Smugling"],
							datasets: [
								{
									label: "Expenses",
									data: [20, 15, 5, 25]
								},
							]
						}}

					/>
				</section>
		</section>
	)
}

export default BudgetOverview