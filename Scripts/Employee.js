var contentType = "application/json;charset=utf-8";
var dataType = "json";
var borderColor = "border-color";
var lightGreyColor = "#d3d3d3";
var redColor = "#ff0000";
var root = "/Home/";
var getType = "GET";
var postType = "POST";
var ui = {};
ui.EmployeeID = $("#EmployeeID");
ui.Name = $("#Name");
ui.Age = $("#Age");
ui.State = $("#State");
ui.Country = $("#Country");
ui.myModal = $("#myModal");
ui.btnUpdate = $("#btnUpdate");
ui.btnAdd = $("#btnAdd");

//Load Data in Table when documents is ready
$(document).ready(function () {
	loadData();
});

//Load Data function
function loadData() {
	$.ajax({
		url: root.concat("GetAll"),
		type: getType,
		contentType: contentType,
		dataType: dataType,
		success: function (result) {
			var htmlControl = "";
			$.each(result, function (key, item) {
				htmlControl += "<tr>";
				htmlControl += "<td>" + item.EmployeeID + "</td>";
				htmlControl += "<td>" + item.Name + "</td>";
				htmlControl += "<td>" + item.Age + "</td>";
				htmlControl += "<td>" + item.State + "</td>";
				htmlControl += "<td>" + item.Country + "</td>";
				htmlControl += "<td><a href=\"#\" onclick=\"return getEmployeeById(" + item.EmployeeID + ")\">Edit</a> | <a href=\"#\" onclick=\"deleleEmployee(" + item.EmployeeID + ")\">Delele</a></td>";
				htmlControl += "</tr>";
			});

			$(".tbody").html(htmlControl);
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});

}

//Add Data Function
function addEmployee() {
	var res = validate();

	if (res === false) {
		return false;
	}

	var empObj = {
		EmployeeID: ui.EmployeeID.val(),
		Name: ui.Name.val(),
		Age: ui.Age.val(),
		State: ui.State.val(),
		Country: ui.Country.val()
	};

	$.ajax({
		url: root.concat("Add"),
		data: JSON.stringify(empObj),
		type: postType,
		contentType: contentType,
		dataType: dataType,
		success: function () {
			loadData();
			ui.myModal.modal("hide");
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});

	return false;
}

//Function for getting the Data Based upon Employee ID
function getEmployeeById(empId) {
	ui.Name.css(borderColor, lightGreyColor);
	ui.Age.css(borderColor, lightGreyColor);
	ui.State.css(borderColor, lightGreyColor);
	ui.Country.css(borderColor, lightGreyColor);

	$.ajax({
		url: root.concat("GetById/").concat(empId),
		type: getType,
		contentType: contentType,
		dataType: dataType,
		success: function (result) {
			ui.EmployeeID.val(result.EmployeeID);
			ui.Name.val(result.Name);
			ui.Age.val(result.Age);
			ui.State.val(result.State);
			ui.Country.val(result.Country);
			ui.myModal.modal("show");
			ui.btnUpdate.show();
			ui.btnAdd.hide();
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});
	return false;
}

//function for updating employee's record
function updateEmployee() {
	var res = validate();
	if (res === false) {
		return false;
	}

	var empObj = {
		EmployeeID: ui.EmployeeID.val(),
		Name: ui.Name.val(),
		Age: ui.Age.val(),
		State: ui.State.val(),
		Country: ui.Country.val()
	};

	$.ajax({
		url: root.concat("Update"),
		data: JSON.stringify(empObj),
		type: postType,
		contentType: contentType,
		dataType: dataType,
		success: function () {
			loadData();
			ui.myModal.modal("hide");
			ui.EmployeeID.val("");
			ui.Name.val("");
			ui.Age.val("");
			ui.State.val("");
			ui.Country.val("");
		},

		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});

	return false;
}

//function for deleting employee's record
function deleleEmployee(id) {
	var ans = confirm("Are you sure you want to delete this Record?");

	if (ans) {
		$.ajax({
			url: root.concat("Delete/").concat(id),
			type: postType,
			contentType: contentType,
			dataType: dataType,
			success: function () {
				loadData();
			},
			error: function (errormessage) {
				alert(errormessage.responseText);
			}
		});
	}
}

//Function for clearing the textboxes
function clearTextBox() {
	ui.EmployeeID.val("");
	ui.Name.val("");
	ui.Age.val("");
	ui.State.val("");
	ui.Country.val("");
	ui.btnUpdate.hide();
	ui.btnAdd.show();
	ui.Name.css(borderColor, lightGreyColor);
	ui.Age.css(borderColor, lightGreyColor);
	ui.State.css(borderColor, lightGreyColor);
	ui.Country.css(borderColor, lightGreyColor);
}

//Valdidation using jquery
function validate() {
	var isValid = true;

	if (ui.Name.val().trim() === "") {
		ui.Name.css(borderColor, redColor);
		isValid = false;
	} else {
		ui.Name.css(borderColor, lightGreyColor);
	}

	if (ui.Age.val().trim() === "") {
		ui.Age.css(borderColor, redColor);
		isValid = false;
	} else {
		ui.Age.css(borderColor, lightGreyColor);
	}

	if (ui.State.val().trim() === "") {
		ui.State.css(borderColor, redColor);
		isValid = false;
	} else {
		ui.State.css(borderColor, lightGreyColor);
	}

	if (ui.Country.val().trim() === "") {
		ui.Country.css(borderColor, redColor);
		isValid = false;
	} else {
		ui.Country.css(borderColor, lightGreyColor);
	}

	return isValid;
}