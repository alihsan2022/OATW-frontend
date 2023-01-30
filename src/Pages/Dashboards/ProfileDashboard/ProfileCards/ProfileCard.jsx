import React, { useState } from "react";
import Divider from "../../../../Components/Divider";
import profilePlaceholder from "../../../../Assets/profile-placeholder.jpeg";
import { useSelector } from "react-redux";
import userAuth from "../../../../Redux/userAuth";
const ProfileCard = () => {
	const { billingAddress, fullName } = useSelector((state) => state.userAuth);
	const { userData } = useSelector((state) => state.userAuth);
	const [billingDetails, setBillingDetails] = useState({
		firstName: "",
		lastName: "",
		street_address: "",
		city: "",
		state: "",
		zip_code: "",
		googleMapLink: "",
	});

	const [personalDetails, setPersonalDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		displayName: "",
	});

	const handleChange = (event) => {
		setBillingDetails({ [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<div className="profile-card">
				<div className="profile-card__header">
					<h1>Profile</h1>
				</div>
				<Divider />
				<div className="profile-card__body">
					<div className="profile-card__body-profile">
						<img src={profilePlaceholder} />
						<span>Test test</span>
						<span
							style={{
								fontSize: "10px",
								fontWeight: "bold",
							}}
						>
							Sponsorer
						</span>
					</div>
					<div className="profile-card__body-details">
						<div className="body-billing">
							<div className="body-billing-header">
								<h5>Billing details:</h5>
								<Divider />
							</div>
							<div className="body-billing-form">
								<form className="billing-form">
									<div className="billing-form-content">
										<div className="billing-form__labelSection">
											<label>Full Name</label>
											<input
												name={"fullname"}
												onChange={handleChange}
												placeholder={
													fullName
														? fullName
														: "Full Name"
												}
											/>
										</div>
									</div>

									<div className="billing-form-content">
										<div className="billing-form__labelSection">
											<label>Email</label>
											<input
												disabled
												placeholder={userData?.email}
											/>
										</div>
									</div>
									<div className="billing-form-content">
										<div className="billing-form__labelSection">
											<label>Street Address</label>
											<input
												placeholder={
													billingAddress?.line1
												}
											/>
										</div>
									</div>
									<div className="billing-form-content">
										<div className="billing-form__labelSection">
											<label>City</label>
											<input
												placeholder={
													billingAddress?.city
												}
											/>
										</div>
									</div>
									<div className="billing-form-content">
										<div className="billing-form__labelSection">
											<label>State</label>
											<input
												placeholder={
													billingAddress?.state
												}
											/>
										</div>
									</div>
								</form>
							</div>
							<div className="profile-card__buttons">
								<button>Save</button>
							</div>
						</div>
						<div className="body-personal">
							<div>
								<div className="body-personal-header">
									<h5>Personal details:</h5>
									<Divider />
								</div>
								<div className="body-billing-form">
									<form className="billing-form">
										<div className="billing-form-content">
											<div className="billing-form__labelSection">
												<label>Full Name</label>
												<input
													name={"fullname"}
													onChange={handleChange}
													placeholder={
														fullName
															? fullName
															: "Full Name"
													}
												/>
											</div>
										</div>

										<div className="billing-form-content">
											<div className="billing-form__labelSection">
												<label>Email</label>
												<input
													disabled
													placeholder={
														userData?.email
													}
												/>
											</div>
										</div>
										<div className="billing-form-content">
											<div className="billing-form__labelSection">
												<label>Display Name</label>
												<input
													placeholder={
														userData.displayName !=
														null
															? userData.displayName
															: "Display Name"
													}
												/>
											</div>
										</div>
									</form>
								</div>
							</div>

							<div className="profile-card__buttons">
								<button>Save</button>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default ProfileCard;
