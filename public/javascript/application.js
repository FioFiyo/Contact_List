$(document).ready(function() {
	$('#newcontact').toggle();
	$('#edit_form').toggle();
	$('#contacts').toggle();
	 
	//for all contacts API
	$('#all_contacts').on('click',function(e){
		e.preventDefault();
		$("#contacts").slideToggle();
		$.ajax({
			method: "GET",
			url: "/contacts",
			dataType: "json",
			success: function(contacts){
				var tableRows = "<tr><th>First Name</th><th>Last Name</th><th>Phone</th><th>Email</th><th></th><th></th></tr>";
				var table = $('#list_contacts');
				for(var i=0; i<contacts.length; i++){
					tableRows += "<tr data-id=" + contacts[i].id + "><td>"+contacts[i].first_name+"</td><td>"+contacts[i].last_name+"</td><td>"+contacts[i].phone+"</td><td>"+contacts[i].email+"</td><td><a class='edit_link' href='#'>Edit</a></td><td><a href='#' class='delete_link'>Delete</a href='#'></td></tr>";
				}
				table.html(tableRows);

				//EDIT FORM
				$('#contacts').on("click",".edit_link", function(e){
					console.log('editing');
					var contactId = $(this).parent().parent().data('id');
					console.log('my id', contactId);
					$('#edit_form').show();
					$('#contacts').hide();
					$('#edit').data('id', contactId);


					});//end of edit

				//EDIT_BUTTON
				$("#edit").on("click","#edit_button", function(e){
					e.preventDefault();
					var form = $(this).closest("#edit")
					var contactId = $(this).closest('form').data('id');
					console.log('id on form', contactId);



					var first_name= form.find("#first_name").val();
					var last_name = form.find("#last_name").val();
					var phone = form.find("#phone").val();
					var email = form.find("#email").val();

					var data = {
						first_name: first_name,
						last_name: last_name,
						phone: phone,
						email: email
					}
					console.log(data);
					$.ajax({
						method: "PUT",
						url: "/contacts/"+ contactId + "/edit",
						dataType: 'json',
						data: data,
						success: function(response){
							console.log(response)
						}
						}); //end of ajax call
				});//end of edit button

				//DELETE BUTTON
				$('.delete_link').on("click", function(e){
					e.preventDefault();
					var row = $(this).parents('tr');
					var contactId = row.data('id');
					$.ajax({
						method: "DELETE",
						url: "/contacts/" + contactId,
						success: function(){
							row.remove();
						},
						error: function(response){
							console.log(response);
						}
					});//end of ajax call
				});//end of DELETE click	
			},
			error: function(response){
				alert("There was some error calling the API");
			}
		});//this is for end of ajax call
	}); //this is the end of all_contacts

	$("#new_contact").on("click", function(e){
		$('#newcontact').show();
		$('#edit_form').hide();
		$('#contacts').hide();
	}); //end of new_contact function

	$("#save_button").on("click", function(e){
		e.preventDefault();
		var vfirst_name = $("#first_name").val();
		var vlast_name = $("#last_name").val();
		var vphoneno = $("#phone").val();
		var vEmail = $("#email").val();
		var new_contact = {
			first_name: vfirst_name,
			last_name: vlast_name,
			phone: vphoneno,
			email: vEmail
		};
		$.ajax({
			method: "POST",
			url: "/contacts",
			data: new_contact,
			dataType: "json",
			success: function(contact){
				console.log(contact);
			},
			error: function(response){
				alert:("no contact was added, try again");
			}
		});//end of ajax call
		$('#newcontact').hide();
	});//end of save button function

});
