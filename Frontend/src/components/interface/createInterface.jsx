import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import interfaceStyle from './CreateInterface.module.css'
import MiniHeader from "../subheader/miniheader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function CreateInterface({ mainText, subText, formInput, formValues, inputChange, onClose, onSubmit, customInput}) {
	return (
		<div className={interfaceStyle.blur}>
			<section className={interfaceStyle.section}>
				<MiniHeader text={mainText} subText={subText} />
				<form className={interfaceStyle.form } onSubmit={onSubmit}>
					<section className={interfaceStyle.formSection}>

					{formInput?.map((data, index) => (
						<div key={index} className={interfaceStyle.inputDiv}>
							<label htmlFor={data.id}>{data.label}</label>
							{data.type === "select" ? (
								<select id={data.id} name={data.name} value={formValues[[data.name]]} onChange={inputChange}>
								<option value="" disabled>
								  Select {data.label}
								</option>
								{data.options?.map((option, idx) => (
								  <option key={idx} value={option}>
									{option}
								  </option>
								))}
							  </select>
							) : data.type === "textarea" ? (
								<textarea
									id={data.id}
									name={data.name}
									placeholder={data.placeholder}
									onChange={inputChange}
								></textarea>
							) : (
								<input
									type={data.type}
									id={data.id}
									name={data.name}
									placeholder={data.placeholder}
									onChange={inputChange}
								/>
							)}
						</div>
					))}
					{customInput && (
						<section>
							
						</section>
					)}
					</section>
					<div className={interfaceStyle.submission}>
						<button type="button" onClick={onClose}><FontAwesomeIcon icon={faX}/></button>
						<input type="submit" value="Create" />
					</div>
				</form>



			</section>
		</div>
	)

}

export default CreateInterface
