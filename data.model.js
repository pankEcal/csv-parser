const requestData = {
	applicationName: "Bike Intell",
	baseUrl: "https://evaai.enginecal.com/",
	apis: [
		{
			apiName: "User Login Check",
			apiLink: "core/v1/bike-intell/checklogin",
			requestMethod: "POST",
			requestParams: {
				u: "saurabh.singh@enginecal.com",
				p: "123456",
			},
		},
		{
			apiName: "forgot password",
			apiLink: "core/v1/bike-intell/forgetpass",
			requestMethod: "POST",
			requestParams: {
				email: "test@enginecal.com",
				password: "123@Ecal",
			},
		},
		{
			apiName: "New User Registration",
			apiLink: "core/v1/bike-intell/profile",
			requestMethod: "POST",
			requestParams: {
				user: {
					deviceid: "50000411",
					name: "Rahul",
					password: "1234ec",
					email: "somewhere@example.com",
					mobile: "+91 9876543210",
					emergency_no1: "+91 1234567890",
					emergency_no2: "+91 1234567890",
				},
			},
		},
		{
			apiName: "Check Activation Code Expiry (New Activation Code)",
			apiLink: "core/v1/bike-intell/valcode",
			requestMethod: "POST",
			requestParams: {
				acode: "Sa1234",
				mac: "56d788cdc641eeA",
				uby: "saurabh.singh@enginecal.com",
			},
		},
		{
			apiName: "Get User Statistics by Drive",
			apiLink: "core/v1/bike-intell/statistics",
			requestMethod: "POST",
			requestParams: {
				devID: "50000406",
				type: "drive",
				driveno: "6",
			},
		},
		{
			apiName: "Drive Score",
			apiLink: "core/v1/bike-intell/statistics",
			requestMethod: "POST",
			requestParams: {
				devID: "50000406",
				type: "drive",
				driveno: "6",
			},
		},
		{
			apiName: "Vehicle Model",
			apiLink: "core/v1/bike-intell/veh_model",
			requestMethod: "POST",
			requestParams: {
				mfd: "Aprilia_IND_B",
			},
		},
		{
			apiName: "Vehicle Variant and other Specs",
			apiLink: "core/v1/bike-intell/veh_spec",
			requestMethod: "POST",
			requestParams: {
				mfd: "Hyundai_IND_C",
				model: "Eon",
				fuel: "Diesel",
			},
		},
		{
			apiName: "New Vehicle Profile",
			apiLink: "core/v1/bike-intell/vehicle",
			requestMethod: "POST",
			requestParams: {
				veh_basic: {
					deviceid: "50000410",
					veh_registration: "KA 01 ZZ 99979",
					veh_manufacturer: "Aprilia_IND_B",
					veh_model: "SR125",
					veh_varient: "BS6",
					fuel_type: "Petrol",
					mfg_year: "2015",
					engine_capacity: "0.125",
					odo: "123",
				},
			},
		},
		{
			apiName: "Get Calibration Value",
			apiLink: "core/v1/bike-intell/getcalvalues",
			requestMethod: "POST",
			requestParams: {
				devID: "50000410",
			},
		},
		{
			apiName: "Monitor flag",
			apiLink: "core/v1/bike-intell/monitor_flag",
			requestMethod: "POST",
			requestParams: {
				devID: "50000410",
			},
		},
		{
			apiName: "User Logout",
			apiLink: "core/v1/bike-intell/logout",
			requestMethod: "POST",
			requestParams: {
				u: "saurabh.singh@enginecal.com",
			},
		},
	],
};

const getRequestData = () => {
	return requestData;
};

module.exports = { getRequestData };
