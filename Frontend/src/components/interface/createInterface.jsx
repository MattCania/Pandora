import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import interfaceStyle from './CreateInterface.module.css'
import MiniHeader from "../subheader/miniheader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function CreateInterface({ 
    mainText, 
    subText, 
    formInput, 
    formValues,  
    inputChange, 
    onClose, 
    onSubmit, 
    customInput, 
    buttonText, 
    errors // Add errors prop
}) {
	if (Object.keys(formValues).length === 0) return <h1>Loading...</h1>;

	return (
		<div className={interfaceStyle.blur}>
			<section className={interfaceStyle.section}>
				<MiniHeader text={mainText} subText={subText} />
				<form className={interfaceStyle.form} onSubmit={onSubmit}>
					<section className={interfaceStyle.formSection}>

					{formInput?.map((data, index) => (
						<div key={index} className={interfaceStyle.inputDiv}>
							<label htmlFor={data.id}>{data.label}</label>
							{data.type === "select" ? (
								<select
									id={data.id}
									name={data.name}
									value={formValues[data.name] || ""}
									onChange={inputChange}
									className={errors[data.name] ? `${interfaceStyle.errorInput} ${interfaceStyle.errorSelect}` : ""}
									>
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
									placeholder={errors[data.name] || data.placeholder} 
									onChange={inputChange}
									className={errors[data.name] ? interfaceStyle.errorInput : ""}
								></textarea>
							) : (
								<input
								type={data.type}
								id={data.id}
								name={data.name}
								value={formValues[data.name] || ""}
								placeholder={errors[data.name] || data.placeholder} 
								onChange={inputChange}
								className={`${errors[data.name] ? interfaceStyle.errorInput : ""} ${
									errors[data.name] ? interfaceStyle.errorPlaceholder : ""
								}`}
								/>
							)}
						</div>
					))}
					{customInput && (
						<section>
							{/* Render custom inputs here if provided */}
						</section>
					)}
					</section>
					<div className={interfaceStyle.submission}>
						<button type="button" onClick={onClose}>
							<FontAwesomeIcon icon={faX}/>
						</button>
						<input type="submit" value={buttonText || "Create"} />
					</div>
				</form>
			</section>
		</div>
	);
}




export default CreateInterface
